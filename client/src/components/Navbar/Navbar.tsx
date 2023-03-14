import React, {FC} from 'react';
import './Navbar.scss';
import {Link, NavLink, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {checkIsAuth, logout} from "../../redux/features/authSlice";
import {toast} from "react-toastify";
import accountLogo from "../../assets/account.svg";

interface NavbarProps {
}

const Navbar: FC<NavbarProps> = () => {

    const isAuth = useAppSelector(checkIsAuth);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const logoutHandler = (): void => {
        dispatch(logout())
        window.localStorage.removeItem("token")
        navigate("/auth/login")
        toast("You have successfully logged out", {autoClose: 1200})
    }

    return (
        <div className="Navbar">
            <Link className="Navbar__logo" to="/">dash</Link>
            <div className="Navbar__container">
                {!isAuth && (
                    <NavLink
                        to="/"
                        className={({isActive}) =>
                            isActive ? "Navbar__container__link active" : "Navbar__container__link"
                        }
                    >
                        home
                    </NavLink>
                )}
                <NavLink
                    to="/play"
                    className={({isActive}) =>
                        (isActive && isAuth) ? "Navbar__container__link active" : isAuth ? "Navbar__container__link" : "Navbar__container__link disabled"
                    }
                >
                    play
                </NavLink>
                <NavLink
                    to="/leaderboard"
                    className={({isActive}) =>
                        isActive ? "Navbar__container__link active" : "Navbar__container__link"
                    }
                >
                    leaderboard
                </NavLink>
            </div>
            <div className="Navbar__auth">
                {isAuth ? (
                    <>
                        <div className="Navbar__auth__container">
                            <Link to="/account" className="Navbar__auth__account"><img src={accountLogo} alt="account"/></Link>
                        </div>
                        <button type="button" className="Navbar__auth__logout"
                                onClick={logoutHandler}>logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link className="Navbar__auth__link" to="/auth/login">log in</Link>
                        <Link className="Navbar__auth__link" to="/auth/register">register</Link>
                    </>
                )}
            </div>
        </div>
    )

};

export default Navbar;
