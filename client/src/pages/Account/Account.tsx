import React, {FC} from 'react';
import './Account.scss';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import Loader from "../../components/Loader/Loader";
import Moment from "react-moment";
import {clearStatus, updateUser} from "../../redux/features/authSlice";
import {API_LINK} from "../../data";
import {checkIsError} from "../../utils/checkIsError";
import {toast} from "react-toastify";
import grayImg from "../../assets/gray.jpeg";

interface AccountProps {
}

const Account: FC<AccountProps> = () => {

    const {user, status, loading} = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const [isEdit, setIsEdit] = React.useState<boolean>(false);

    const [localUsername, setLocalUsername] = React.useState<string>("");
    const [localImage, setLocalImage] = React.useState<any>(null);

    const userAvatar = user?.avatar ? `${API_LINK}/${user?.avatar}` : grayImg;

    React.useEffect(() => {
        if (status) {
            const toastType = checkIsError(status) ? "error" : "default";
            toast(status, {autoClose: 2500, type: toastType})
            clearLocalChanges();

            dispatch(clearStatus())
        }
    }, [status]);

    const editHandler = (): void => {
        if (!isEdit) {
            setLocalUsername(user?.username);
            setIsEdit(true);
        } else {
            clearLocalChanges();
        }
    }

    const saveHandler = (): void => {
        if (checkLocalChanges()) {
            const updatedUser = new FormData();
            updatedUser.append('username', localUsername);
            updatedUser.append('image', localImage);
            dispatch(updateUser(updatedUser));
        }
    }

    const checkLocalChanges = (): boolean => {
        return isEdit ? (localImage !== null || (localUsername.length > 0 && localUsername !== user.username)) : false;
    }

    const clearLocalChanges = (): void => {
        setLocalUsername("");
        setLocalImage(null);
        setIsEdit(false);
    }

    return (
        <div className="Account page">
            {user ? (
                <>
                    <div className="Account__glow-first"></div>
                    <div className="Account__container">
                        <div className="Account__preview">
                            <label
                                className='Account__preview__img-pick'>
                                <img
                                    src={localImage ? URL.createObjectURL(localImage) : userAvatar}
                                    alt="user-avatar"
                                    className={`${isEdit && 'edit'}`}/>
                                {isEdit && <input type="file" onChange={(e) => {
                                    if (e.target.files) {
                                        setLocalImage(e.target.files[0])
                                    }
                                }}/>}

                            </label>

                            <span className="Account__preview__date">
                                <Moment date={user.createdAt} format="D MMM YYYY"/>
                            </span>
                        </div>

                        <div className="Account__info">
                            {isEdit ? (
                                    <input type="text" value={localUsername} className="Account__info__name-edit"
                                           onChange={(e) => setLocalUsername(e.target.value)}/>
                                ) :
                                (
                                    <h3 className="Account__info__name">{user.username}</h3>
                                )
                            }
                            <p className="Account__info__item">highest score: <b>{user.score}</b></p>
                        </div>
                    </div>
                    <div className="Account__buttons">
                        <button className={`Account__buttons__item ${!isEdit ? '' : 'cancel'}`} type="button"
                                onClick={editHandler}
                        >
                            {!isEdit ? "edit" : "cancel"}
                        </button>
                        <button className={`Account__buttons__item ${checkLocalChanges() ? '' : 'disabled'}`}
                                type="button"
                                onClick={saveHandler}
                        >
                            save
                        </button>
                    </div>
                    <Loader isLoading={loading}/>
                </>
            ) : (
                <Loader isLoading={true}/>
            )}
        </div>
    )

};

export default Account;
