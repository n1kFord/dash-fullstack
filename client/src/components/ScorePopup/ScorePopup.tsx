import React, {FC} from 'react';
import './ScorePopup.scss';

interface ScorePopupProps {
    isOpen: boolean;
    score: number;
    onClose: () => void;
    onRestart: () => void;
}

const ScorePopup: FC<ScorePopupProps> = ({isOpen, score = 0, onClose, onRestart}) => (
    <div className={`ScorePopup ${isOpen && "active"}`}>
        <div className="ScorePopup__container">
            <h3 className="ScorePopup__container__title">Game over</h3>
            <p className="ScorePopup__container__score">your score is {score}</p>
            <div className="ScorePopup__container__buttons">
                <button type="button" onClick={onClose}>close</button>
                <button type="button" onClick={onRestart}>try again</button>
            </div>
        </div>
    </div>
);

export default ScorePopup;
