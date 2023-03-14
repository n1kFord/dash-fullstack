import {FC} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import {useAppSelector} from "../../hooks/redux";
import {checkIsAuth} from "../../redux/features/authSlice";

interface PropType {
    component: React.FC;
    isAuth: boolean;
}

const PrivateRoute: FC<PropType> = ({component: Component, isAuth}) => {
    if (isAuth) return <Component/>;
    return <Navigate to='/auth/login'/>;
};

export default PrivateRoute;