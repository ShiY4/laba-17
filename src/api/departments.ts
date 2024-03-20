import { AccessTokenKey } from "../constants/commonConstants";
import { AxiosInstance } from "./axiosInstance";
import { Department } from "../types/models";
import {AddDepartmentResponsetDto, EditDepartmentResponseDto} from '../types/apiTypes';



const {axiosDelete, axoisGet, axiosPut, axiosPost} = AxiosInstance(sessionStorage.getItem(AccessTokenKey) ?? '');

const getDepartments = async() =>
    await axoisGet('/Departments') as Array<Department>;

const addDepartment = async(addDepartmentData: AddDepartmentResponsetDto) =>
    await axiosPost('/Departments/department', addDepartmentData) as number;

const editDepartment = async(editDepartmentData: EditDepartmentResponseDto) =>
    await axiosPut('/Departments/department', editDepartmentData) as void;

const deleteDepartment = async(id:string | number) =>
    await axiosDelete(`/Departments/department?id=${id}`) as void;

export const DepartmentsApi = {
    addDepartment,
    editDepartment,
    deleteDepartment,
    getDepartments
}