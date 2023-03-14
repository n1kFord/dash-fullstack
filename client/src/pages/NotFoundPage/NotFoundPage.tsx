import React, {FC} from 'react';
import './NotFoundPage.scss';
import {useNavigate} from "react-router-dom";

interface NotFoundPageProps {
}

const NotFoundPage: FC<NotFoundPageProps> = () => {
    const navigate = useNavigate();

    return (
        <div className="NotFoundPage page">
            <div className="NotFoundPage__container">
            <span className="NotFoundPage__overlay">
                <h1 className="NotFoundPage__title">404 Not Found</h1>
            </span>
            </div>
            <button type="button" className="NotFoundPage__button" onClick={() => navigate(-1)}>go back</button>
        </div>
    )
};

export default NotFoundPage;
