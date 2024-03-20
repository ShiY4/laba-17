import {FC, useState} from 'react';
import { TextFiel } from '../../components';
import { Button } from '../../components';
import { WidgetLayout } from '../../components/layouts';
import './registrationPageStyle.scss';
import { useNavigate } from 'react-router-dom';
import { RoutesPath } from '../../constants/commonConstants';
import { AuthApi } from '../../api';
import { AxiosError } from 'axios';

type FormFieldsNames = 'login'|'password'|'repeatePassword'|'lastName'|'firstName'|'midName'
interface RegistrationForm{
    login: string
    password: string
    repeatePassword: string
    // lastName: string
    // firstName: string
    // midName?: string
}

export const RegistrationPage: FC = () => {
    const [formFields, setFormFields] = useState<RegistrationForm>();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string>();
    const {signUp, signIn} = AuthApi;
    
    const changeFieldValue = (value:string|undefined, fieldName: FormFieldsNames)=>{
        setFormFields(prev =>{
            return{
                ...prev,
                [fieldName]:value
            } as RegistrationForm;
        })
    };

    const registrationHandler = () => {
        if(!formFields?.login || !formFields?.password){
            setErrorMessage('Не задан логин или праоль');
            return;
        }

        if(formFields?.password !== formFields?.repeatePassword){
            setErrorMessage('Пароль и повторенный пароль не свопадают');
            return;
        }

        const data = {login: formFields.login, 
            password: formFields.password}

        signUp(data).then(() => {
            signIn(data).then(respData =>{
                if(respData.role === 'user'){
                    navigate(`/${RoutesPath.NoPermissions}`);
                }
                else{
                    navigate(`/${RoutesPath.Departments}`);
                }
            }).catch(err =>
                setErrorMessage((err as AxiosError)?.message)
            );
        }).catch((err) => {
            setErrorMessage((err as AxiosError)?.message)
        });
    } 

    const goToLogin = () => {
        navigate(RoutesPath.Login);
    }

    return (
        <WidgetLayout>
        <div className='reg-page_form'>
            <h3 className='reg-page_title'>Регистрация</h3>
            <div className='reg-page_fields'>
                    <TextFiel labelText="логин" value= {formFields?.login} type = "text" onChange = {(value) => changeFieldValue(value,'login')}/>
                    <TextFiel labelText="пароль" value= {formFields?.password} type = "password" onChange = {(value) => changeFieldValue(value,'password')}/>
                    <TextFiel labelText="повторите пароль" value= {formFields?.repeatePassword} type = "password" onChange = {(value) => changeFieldValue(value,'repeatePassword')}/>
                    {/* <TextFiel labelText="фамилия" value= {formFields?.lastName} type = "text" onChange = {(value) => changeFieldValue(value,'lastName')}/>
                    <TextFiel labelText="имя" value= {formFields?.firstName} type = "text" onChange = {(value) => changeFieldValue(value,'firstName')}/>
                    <TextFiel labelText="отчество" value= {formFields?.midName} type = "text" onChange = {(value) => changeFieldValue(value,'midName')}/> */}
                    {errorMessage && (<span style={{color: 'red'}}></span>)}
            </div>
            <div className='reg-page_actions'>
                <Button text='Зарегистрироваться' onClick={registrationHandler} type="primary"/>
                <Button text='Войти' onClick={goToLogin} type="secondary" />
            </div>
        </div>        
    </WidgetLayout>)
}