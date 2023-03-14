import React, {FC} from 'react';
import './Leaderboard.scss';
import trophyLogo from "../../assets/trophy.svg";
import LBItem from "../../components/LBItem/LBItem";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {API_LINK} from "../../data";
import grayImg from "../../assets/gray.jpeg";
import {getLeaderboard} from "../../redux/features/boardSlice";
import {UserType} from "../../types/types";
import uuid from "react-uuid";
import Loader from "../../components/Loader/Loader";

interface LeaderboardProps {
}

const Leaderboard: FC<LeaderboardProps> = () => {
    const {top, loading} = useAppSelector((state) => state.board);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(getLeaderboard());
    }, [])

    return (
        <div className="Leaderboard page">
            <div className="Leaderboard__glow-first"></div>
            <div className="Leaderboard__container">
                <h1 className="Leaderboard__container__title" data-aos="fade-left">
                    Leaderboard
                    <img src={trophyLogo} alt="trophy"/>
                </h1>
                <p className="Leaderboard__container__subtitle" data-aos="fade-up">top-10 users of all time</p>

                <div className="Leaderboard__container__list">
                    {loading ? (
                        <Loader isLoading={true}/>
                    ) : (
                        top?.map((user: UserType, i) => {
                            const userAvatar = user.avatar ? `${API_LINK}/${user.avatar}` : grayImg;
                            const uniqueId = uuid();
                            return <LBItem username={user.username} score={user.score} place={i + 1} avatar={userAvatar}
                                           key={uniqueId}/>
                        })
                    )}

                    {(!loading && top.length === 0) &&
                        <p className="Leaderboard__container__hint">there is no users yet :(</p>}
                </div>
            </div>
        </div>
    )
};

export default Leaderboard;
