import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import uuid from "react-uuid";
import axios from "../../utils/axios";

export type itemType = {
    isActive: boolean;
    uniqueId: string;
    onAnimate?: () => void;
}

interface boardState {
    loading: boolean;
    isStarted: boolean;
    isEnded: boolean;
    isPopupOpen: boolean;
    score: number;
    initialArray: itemType[];
    activeItem: string | null;
    top: [];
}

const initialState = {
    loading: false,
    isStarted: false,
    isEnded: true,
    isPopupOpen: false,
    score: 0,
    initialArray: [],
    activeItem: null,
    top: []
} as boardState

export const getLeaderboard = createAsyncThunk('board/getLeaderboard', async (thunkAPI) => {
    try {
        const {data} = await axios.get("leaderboard");
        return data;
    } catch (e) {
        console.log(e);
    }
})

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        startGame: (state) => {
            state.initialArray = [...Array(64)].map(e => {
                return {uniqueId: uuid(), isActive: false}
            });
            state.isPopupOpen = false;
            state.score = 0;
            state.isStarted = true;
            state.isEnded = false;
            const arr = state.initialArray;
            const random = arr[Math.floor((Math.random() * arr.length))];
            random.isActive = true;
            state.activeItem = random.uniqueId;
            state.score = state.score + 1;
        },
        endGame: (state, action) => {
            state.isStarted = false;
            state.isEnded = true;
            state.initialArray = [];
            if (!action.payload.isSilent) {
                state.isPopupOpen = true;
            }
        },
        clickItem: (state, action) => {
            const activeList = state.initialArray.filter(el => el.isActive);
            const possibleItem = activeList.find(el => el.uniqueId === action.payload);
            if (possibleItem && possibleItem.uniqueId === state.activeItem && activeList.length !== 63) {
                const arr = state.initialArray.filter(el => !el.isActive);
                const random = arr[Math.floor((Math.random() * arr.length))];
                random.isActive = true;
                state.activeItem = random.uniqueId;
                state.score = state.score + 1;
            } else {
                state.isPopupOpen = true;
                state.isStarted = false;
                state.initialArray = [];
                state.isEnded = true;
            }
        },
        closePopup: (state) => {
            state.isPopupOpen = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getLeaderboard.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getLeaderboard.fulfilled, (state, action: PayloadAction<any>) => {
            state.top = action.payload.users;
            state.loading = false;
        })
        builder.addCase(getLeaderboard.rejected, (state) => {
            state.top = [];
            state.loading = false;
        })
    },
});

export const {startGame, endGame, clickItem, closePopup} = boardSlice.actions
export default boardSlice.reducer;