import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginResponseDto, RegistrationRequestDto, loginRequestDto } from '../types/apiTypes';
import { AsyncThunkOptions } from '../types/toolKitTypes';
import { AuthApi } from '../api';

const NAMESPACE = 'user';

export const signIn = createAsyncThunk<LoginResponseDto, loginRequestDto, AsyncThunkOptions>(
    `${NAMESPACE}/signIn`,
    async(loginData, { rejectWithValue }) => {
        try{
            return await AuthApi.signIn(loginData);
        } catch(error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const signUp = createAsyncThunk<LoginResponseDto, RegistrationRequestDto, AsyncThunkOptions>(
    `${NAMESPACE}/signUp`,
    async(registrationData, { rejectWithValue }) => {
        try{
            await AuthApi.signUp(registrationData);
            return await AuthApi.signIn({
                login: registrationData.login,
                password: registrationData.password
            });
        } catch(error) {
            return rejectWithValue((error as Error).message);
        }
    }
);