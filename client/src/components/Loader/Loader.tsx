import React, {FC} from 'react';
import './Loader.scss';
import loadingLogo from "../../assets/loading.svg";

interface LoaderProps {
    isLoading: boolean
}

const Loader: FC<LoaderProps> = ({isLoading}) => (
    <img src={loadingLogo} className={`Loader ${isLoading ? "active" : ""}`} alt="loader"/>
);

export default Loader;
