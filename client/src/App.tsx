import React from "react";
import './App.scss'
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import {Route, Routes} from "react-router-dom";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import {ToastContainer, Zoom} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {checkIsAuth, getMe} from "./redux/features/authSlice";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Main from "./pages/Main/Main";
import Account from "./pages/Account/Account";
import ScorePopup from "./components/ScorePopup/ScorePopup";
import {closePopup, startGame} from "./redux/features/boardSlice";

import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {

    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(checkIsAuth);

    const {isPopupOpen, score} = useAppSelector((state) => state.board);

    React.useEffect(() => {
        AOS.init({
            once: false,
            duration: 600
        });
    }, [])

    React.useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    return (
        <div className="App">
            <Navbar/>
            <ScorePopup isOpen={isPopupOpen} score={score} onClose={() => dispatch(closePopup())}
                        onRestart={() => dispatch(startGame())}/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/leaderboard" element={<Leaderboard/>}/>
                <Route path="/auth/login" element={<Login/>}/>
                <Route path="/auth/register" element={<Register/>}/>
                <Route path='/play' element={<PrivateRoute component={Main} isAuth={isAuth}/>}/>
                <Route path='/account' element={<PrivateRoute component={Account} isAuth={isAuth}/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
            <ToastContainer position='bottom-center' pauseOnHover theme="dark" transition={Zoom}/>
        </div>
    )
}

export default App
