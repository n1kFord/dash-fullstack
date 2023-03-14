import React, {FC} from 'react';
import './Home.scss';
import cursorGif from "../../assets/cursor-gif.gif";
import {Link, useNavigate} from "react-router-dom";
import {useAppSelector} from "../../hooks/redux";
import {checkIsAuth} from "../../redux/features/authSlice";

interface HomeProps {
}

const Home: FC<HomeProps> = () => {
    const navigate = useNavigate();
    const isAuth = useAppSelector(checkIsAuth);

    React.useEffect(() => {
        if (isAuth) {
            navigate("/play");
        }
    }, [isAuth])

    return (
        <div className="Home page">
            <div className="Home__container">
                <div className="Home__glow-first"></div>
                <div className="Home__info">
                    <h1 className="Home__info__title">Dash</h1>
                    <p className="Home__info__subtitle">is an online game where you have to score points by guessing the
                        correct field which becomes more invisible every time.</p>
                </div>
                <img src={cursorGif} alt="cursor gif" className="Home__gif"/>
            </div>

            <div className="Home__tips">
                <div className="Home__glow-second"></div>
                <div className="Home__glow-third"></div>
                <div className="Home__tips__container">
                    <h3 className="Home__tips__title">Check your <span className="pink">skills</span></h3>
                    <a href="/auth/register" className="Home__tips__button">create an account</a>
                    <span className="Home__tips__hint">Already have an account? <a href="/auth/login"
                                                                                   className="link">Log in</a></span>
                </div>
                <div className="Home__tips__container">
                    <h3 className="Home__tips__title">Set a <span className="blue">new record</span></h3>
                    <p className="Home__tips__subtitle">use your own mindfulness to reach your goal.</p>
                    <a href="/leaderboard" className="Home__tips__button">view leaderboard</a>
                </div>
            </div>
        </div>
    )

};

export default Home;
