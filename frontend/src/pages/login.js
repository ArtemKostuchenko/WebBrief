import { useForm } from 'react-hook-form';
import Input from '../components/Input';
import { AppContext } from '../contexts/app';
import { useContext, useState } from 'react';
import { authUser } from '../utils/functions';
import { useAuth } from '../hooks/auth';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from '../store/slices/userSlice';



const Login = () => {
    const { register, handleSubmit } = useForm();
    const { isAuth } = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { showAlertMessage } = useContext(AppContext);

    const onSubmit = async (data) => {
        const user = await authUser(data);

        if (user) {
            dispatch(setUser({
                username: user.username,
                isAdmin: user.isAdmin,
            }));
            navigate('/panel');
            showAlertMessage('Ви успішно ввійшли');
        } else {
            dispatch(clearUser());
            showAlertMessage('Помилка входу', 'error');
        }
    }

    if (isAuth) {
        navigate('/');
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4 text-light p-5 border rounded">
                    <div className="d-flex justify-content-center pb-3">
                        <h3 className="h3">Вхід</h3>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <div className="mb-3">
                                <Input register={register} options={{
                                    required: true,
                                    maxLength: 50,
                                }} name="username" placeholder="Логін" />
                            </div>
                            <div className="mb-3">
                                <Input type="password" register={register} options={{
                                    required: true,
                                    maxLength: 14,
                                }} name="password" autoComplete="true" placeholder="Пароль" />
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-info">Увійти</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;