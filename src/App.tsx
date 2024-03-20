import React from 'react';
import {Route, Routes} from 'react-router-dom';
import { LoginPage } from './pages';
import { RegistrationPage } from './pages/registration';
import { RoutesPath } from './constants/commonConstants';
import { DepartmentsPage } from './pages/department';
import { AdministrationPage } from './pages/administration/AdministrationPage';
import './styles/globalStyles.scss'
import { NoPermissionsPage } from './pages/noPermissions/NoPermissionsPage';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path = {RoutesPath.Login} element= {<LoginPage/>}/>
      <Route path={RoutesPath.Registration} element = {<RegistrationPage/>}/>
      <Route path={RoutesPath.Departments} element = {<DepartmentsPage/>}/>
      <Route path={RoutesPath.Administration} element = {<AdministrationPage/>}/>
      <Route path={RoutesPath.NoPermissions} element = {<NoPermissionsPage/>}/>
      <Route path={'*'} element = {<LoginPage/>}/>
    </Routes>
  );
};