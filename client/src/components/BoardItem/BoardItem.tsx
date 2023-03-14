import React, {FC} from 'react';
import './BoardItem.scss';
import {clickItem, itemType} from "../../redux/features/boardSlice";
import {useAppDispatch} from "../../hooks/redux";

const BoardItem: FC<itemType> = ({uniqueId, isActive, onAnimate}) => {
    const dispatch = useAppDispatch();
    const handleClick = () => {
        if (onAnimate) {
            onAnimate();
        }
        dispatch(clickItem(uniqueId));
    }
    return (
        <div className={`BoardItem ${isActive && "active"}`} onClick={handleClick}></div>
    )

}

export default BoardItem;
