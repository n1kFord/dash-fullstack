import React, {FC} from 'react';
import './Main.scss';
import Timer from "../../components/Timer/Timer";
import BoardItem from "../../components/BoardItem/BoardItem";
import uuid from "react-uuid";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {endGame, startGame} from "../../redux/features/boardSlice";
import ScorePopup from "../../components/ScorePopup/ScorePopup";
import {updateScore} from "../../redux/features/authSlice";

interface MainProps {
}


const Main: FC<MainProps> = () => {
    const {score, initialArray, isStarted, isEnded} = useAppSelector((state) => state.board);
    const dispatch = useAppDispatch();

    const [isHidden, setIsHidden] = React.useState<boolean>(false);

    React.useEffect(() => {
        return () => {
            dispatch(endGame({isSilent: true}));
        }
    }, [])

    React.useEffect(() => {
        if (isEnded) {
            dispatch(updateScore(score))
        }
    }, [isEnded]);

    const handleStart = () => {
        if (!isStarted) {
            dispatch(startGame());
        }
    }

    const animateBoard = () => {
        setIsHidden(true);
        setTimeout(() => setIsHidden(false), 1000);
    }

    return (
        <div className="Main page">
            <div className="Main__container">
                <Timer duration={59000} isGoing={isStarted}
                       onStop={() => dispatch(endGame({isSilent: false}))}/>
                <div className="Main__board" data-aos="fade-up">
                    {initialArray.length > 0 && initialArray.map(({uniqueId, isActive}) => {
                        return <BoardItem key={uniqueId} uniqueId={uniqueId} isActive={isActive}
                                          onAnimate={animateBoard}/>
                    })}
                    {isHidden && <div className="Main__board__block"></div>}
                </div>
                <button type="button" disabled={isStarted}
                        className={`Main__container__button ${isStarted && "disabled"}`} onClick={handleStart}>start
                </button>
            </div>
        </div>
    )

};

export default Main;
