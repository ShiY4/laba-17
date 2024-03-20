import { AxiosInstance } from "./axiosInstance";
import { AccessTokenKey } from '../constants/commonConstants';

const {axiosPost} = AxiosInstance();

interface loginRequestDto {
    login: string,
    password: string;
}

interface LoginResponseDto{
    access_token: string,
    usename: string,
    role: string;
}

interface RegistrationRequestDto {
    login: string,
    password: string;
}

const signUp = async(registrationData: RegistrationRequestDto) =>
    await axiosPost('/register', registrationData) as void;

const signIn = async(loginData: loginRequestDto) => {
    const data = await axiosPost('/login', loginData) as LoginResponseDto;
    sessionStorage.setItem(AccessTokenKey, data.access_token);
    return data;
}

export const AuthApi = {
    signIn,
    signUp
}