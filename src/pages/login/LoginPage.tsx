import {FC, useEffect, useState} from 'react';
import { TextFiel, Button } from '../../components';
import { WidgetLayout } from '../../components/layouts';
import { useNavigate } from 'react-router-dom';
import { RoutesPath } from '../../constants/commonConstants';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxToolKitHooks';
import { signIn } from '../../services';
import './loginPageStyle.scss';

export const LoginPage: FC = () =>{
    const { accessToken, role } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const [login, setlogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate()

    useEffect(() => {
        if (accessToken && role) {
            if(role === 'user' || !role){
                navigate(`${RoutesPath.NoPermissions}`);
            } else{
                navigate(`${RoutesPath.Departments}`);
            }
        }
    }, [accessToken, role, navigate]);

    const loginChangedHandler = (value: string) =>{
        setlogin(value);
    };

    const passwordChangedHandler = (value: string) =>{
        setPassword(value);
    };

    const loginHandler = () => {
        dispatch(signIn({login, password}));
    };

    const toRegistrationHandler = () => {
        navigate(RoutesPath.Registration)
    };

return (
        <WidgetLayout>
            <div className='login-page_form'>
                <h3 className='login-page_title'>Вход</h3>

                <div className='login-page_fields'>
                        <TextFiel labelText="логин" value= {login} type = "text" onChange = {loginChangedHandler}/>
                        <TextFiel labelText="пароль" value= {password} type = "password" onChange = {passwordChangedHandler}/>
                </div>
                <div className='login-page_actions'>
                    <Button text='Войти' onClick={loginHandler} type="primary" />
                    <Button text='Зарегистрироваться' onClick={toRegistrationHandler} type="secondary"/>
                </div>
            </div>        
        </WidgetLayout>
    );
};