import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import {RootState} from "../store";
import {UserType} from "../../types/types";

interface AuthState {
    user: UserType;
    token: string | null;
    loading: boolean;
    status: string | null;
}

const initialState = {
    user: {},
    token: null,
    loading: false,
    status: null,
} as AuthState

type AuthInfoType = {
    username: string;
    password: string;
}

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (info: AuthInfoType, thunkAPI) => {
        try {
            const {data} = await axios.post('/auth/register', info)
            if (data.token) {
                window.localStorage.setItem('token', data.token)
            }
            return data
        } catch (error) {
            console.log(error)
        }
    },
)

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (info: AuthInfoType) => {
        try {
            const {data} = await axios.post('/auth/login', info)
            if (data.token) {
                window.localStorage.setItem('token', data.token)
            }
            return data;
        } catch (error) {
            console.log(error)
        }
    },
)

export const getMe = createAsyncThunk(
    'auth/getMe',
    async () => {
        try {
            const {data} = await axios.get('/auth/me');
            return data
        } catch (error) {
            console.log(error)
        }
    },
)

export const updateUser = createAsyncThunk('user/updateUser', async (updatedUser: any, thunkAPI) => {
    try {
        const {data} = await axios.put("user/change", updatedUser);
        return data;
    } catch (e) {
        console.log(e);
    }
});

export const updateScore = createAsyncThunk('user/updateScore', async (newScore: number, thunkAPI) => {
    try {
        const {data} = await axios.put("user/score", {score: newScore});
        return data;
    } catch (e) {
        console.log(e);
    }
})


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = {username: "", score: 0, password: "", avatar: ""};
            state.token = null;
            state.loading = false;
            state.status = null;
        },
        clearStatus: (state) => {
            state.status = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true
            state.status = null
        })
        builder.addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false
            state.status = action.payload.message
            state.user = action.payload.newUser
            state.token = action.payload.token
        })
        builder.addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
            state.status = action.payload.message
            state.loading = false
        })

        // ______________________

        builder.addCase(loginUser.pending, (state) => {
            state.loading = true
            state.status = null
        })
        builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false
            state.status = action.payload.message
            state.user = action.payload.user
            state.token = action.payload.token
        })
        builder.addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
            state.status = action.payload.message
            state.loading = false
        })

        // ______________________

        builder.addCase(getMe.pending, (state) => {
            state.loading = true
            state.status = null
        })
        builder.addCase(getMe.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false
            state.status = null
            state.user = action.payload?.user
            state.token = action.payload?.token
        })
        builder.addCase(getMe.rejected, (state, action: PayloadAction<any>) => {
            state.status = action.payload.message
            state.loading = false
        })

        // ______________________

        builder.addCase(updateUser.pending, (state) => {
            state.loading = true
            state.status = null
        })
        builder.addCase(updateUser.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false
            state.status = action.payload.message
            if (action.payload.user) {
                state.user = action.payload?.user
            }
        })
        builder.addCase(updateUser.rejected, (state, action: PayloadAction<any>) => {
            state.status = action.payload.message
            state.loading = false
        })

        // ______________________

        builder.addCase(updateScore.pending, (state) => {
            state.loading = true
            state.status = null
        })
        builder.addCase(updateScore.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false
            state.user = action.payload.user
        })
        builder.addCase(updateScore.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false
        })
    },
});

export const {logout, clearStatus} = authSlice.actions
export const checkIsAuth = (state: RootState) => Boolean(state.auth.token)

export default authSlice.reducer;