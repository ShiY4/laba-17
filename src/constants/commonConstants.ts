import { DepartmentsPage } from "../pages/department";
export enum RoutesPath{
    Login = '/',
    Registration = 'registration',
    Departments = 'departments',
    Administration = 'administration',
    NoPermissions = 'nopermissions'
}

export const AccessTokenKey = 'AccessToken';
export const RoleKey = 'Role';
export const UserNameKey = 'UserName';