import React, {FC} from 'react';
import './LBItem.scss';

interface LbItemProps {
    place: number;
    username: string;
    score: number;
    avatar: string;
}

const LbItem: FC<LbItemProps> = ({place, username, score, avatar}) => (
    <div className="LBItem">
        <div className="LBItem__info">
            <span className="LBItem__info__place">{place}</span>
            <img src={avatar} alt="avatar" className="LBItem__info__avatar"/>
            <p className="LBItem__info__username">{username}</p>
        </div>
        <div className="LBItem__score">
            <p className="LBItem__score__title">Score:</p>
            <span className="LBItem__score__value">{score}</span>
        </div>
    </div>
);

export default LbItem;
