import React, {FC} from 'react';
import './Register.scss';
import {useAppSelector, useAppDispatch} from "../../hooks/redux";
import {checkIsAuth, clearStatus, registerUser} from "../../redux/features/authSlice";
import {checkIsError} from "../../utils/checkIsError";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import Loader from "../../components/Loader/Loader";

interface RegisterProps {
}

const Register: FC<RegisterProps> = () => {
    const [username, setUsername] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");

    const {status, loading} = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(checkIsAuth);

    const navigate = useNavigate();

    React.useEffect(() => {
        if (status) {
            const toastType = checkIsError(status) ? "error" : "default";
            toast(status, {autoClose: 2500, type: toastType})
        }
        dispatch(clearStatus());
        if (isAuth) navigate("/");
    }, [status, isAuth])

    const onSubmit = () => {
        try {
            dispatch(registerUser({username, password}))
            setUsername('');
            setPassword('')
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="Register page">
            <div className="auth__item-first"></div>
            <div className="auth__item-second disabled"></div>
            <div className="auth">
                <h1 className="auth__title">Register</h1>
                <p className="auth__subtitle">create a new account</p>

                <form className="auth__form" onSubmit={(e) => e.preventDefault()}>
                    <fieldset className="auth__form__fieldset">
                        <label className="auth__form__label">username</label>
                        <input type="text" className="auth__form__input" value={username}
                               onChange={(e) => setUsername(e.target.value)}/>
                        <label className="auth__form__label">password</label>
                        <input type="password" className="auth__form__input" value={password}
                               onChange={(e) => setPassword(e.target.value)}/>

                        <button className="auth__form__button" onClick={onSubmit}>confirm</button>

                        <span className="auth__form__hint">Already have an account? <Link
                            to="/auth/login" className="link">Log in</Link></span>
                    </fieldset>
                </form>
                <Loader isLoading={loading}/>
            </div>
        </div>
    )
};

export default Register;
