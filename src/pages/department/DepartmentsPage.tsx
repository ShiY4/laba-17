import {FC, useEffect, useState} from "react";
import {Layout} from "../../components/layouts";
import { Button, Dialog, DropDown, EmplyeesList, TextFiel, FilesList, EducationList, WorkExperienceList } from "../../components";
import { Department, Emplyee } from "../../types/models";
import { DropDownItem } from "../../components/dropDown/DropDownProps";
import { PencilIcon, PlusIcon, TrashIcon, UploadIcon } from "../../assets/icons";
import './departmentsPageStyles.scss';
import { DepartmentsApi } from "../../api";
import { format } from "date-fns";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxToolKitHooks";
import { useNavigate } from "react-router-dom";
import { RoutesPath } from "../../constants/commonConstants";

export const DepartmentsPage: FC = () => {
    const { accessToken, role } = useAppSelector((state) => state.user);
    //const dispatch = useAppDispatch();
    
    const {getDepartments, deleteDepartment} = DepartmentsApi;

    const [departmentsData, setDepartmentsData] = useState<Array<Department>>([]);
    const [employeesData, setEmployeesData] = useState<Array<Emplyee>>([]);
    const [selectedDeparmentId, setSelectedDepartmentId] = useState<number>();
    const [selectedEmployee, setSelectedEmployee] = useState<Emplyee>();
    const [showEmployeeDialog, setShowEmployeeDialog] = useState(false);
    const [userActionMode, setUserActionMode] = useState<'create'| 'edit'>('create');
    const [userToEdit, setUserToEdit] = useState(0);

    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');

    const [birthDate, setBirthDate] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (accessToken && role) {
            if(role === 'user' || !role){
                navigate(`${RoutesPath.NoPermissions}`);
            } 
        } else {
            navigate(`${RoutesPath.Login}`);
        }
    }, [accessToken, role, navigate]);

    useEffect(() => {
        getDepartments()
        .then(respData => {
            setDepartmentsData(respData);
            if(respData.length){
                setSelectedDepartmentId(respData[0].id)
            }
        }).catch(err => {
            setDepartmentsData([]);
            console.log(err);
        });
    }, [getDepartments]);

    useEffect(() => {
        const selectedDepartment = departmentsData.find(d => d.id === selectedDeparmentId);
        setEmployeesData(selectedDepartment ? selectedDepartment.employees : []);
        setSelectedEmployee(undefined);
    }, [departmentsData, selectedDeparmentId]);

    useEffect(() => {
        if(userActionMode === 'edit'){
            const employee = userActionMode === 'edit'
                ? employeesData.find(e => e.id === userToEdit)
                : undefined;

            setLastName(employee?.lastName ?? '');
            setFirstName(employee?.firstName ?? '');
            setMiddleName(employee?.middleName ?? '');

            setBirthDate(employee?.birthDate ?? '');
            setEmail(employee?.email ?? '');
            setPhoneNumber(employee?.phoneNumber ?? '');
        }
    }, [employeesData, userActionMode, userToEdit])

    const clearEmployeeDialogFields = () => {
        setUserActionMode('create');
        setUserToEdit(0);
        setLastName('');
        setFirstName('');
        setMiddleName('');
        setBirthDate('');
        setEmail('');
        setPhoneNumber('');
    }

    const createEmployeeHandler = () => {
        setUserActionMode('create');
        setShowEmployeeDialog(true);
    }

    const editEmployeeHandler = (id: number) => {
        setUserActionMode('edit');
        setUserToEdit(id);
        setShowEmployeeDialog(true);
    }

    const userDialogContentRenderer = () => {
        return (
            <>
                <TextFiel labelText="Фамилия" value = {lastName} onChange={(val) => setLastName(val)}/>
                <TextFiel labelText="Имя" value = {firstName} onChange={(val) => setFirstName(val)}/>
                <TextFiel labelText="Отчество" value = {middleName} onChange={(val) => setMiddleName(val)}/>
                
                <TextFiel labelText="Дата рождения" value = {birthDate} onChange={(val) => setBirthDate(val)}/>
                <TextFiel labelText="Email" value = {email} onChange={(val) => setEmail(val)}/>
                <TextFiel labelText="Телефон" value = {phoneNumber} onChange={(val) => setPhoneNumber(val)}/>
            </>
        )
    }

    const closeEmployyeDialogHandler = () =>{
        setShowEmployeeDialog(false);
        clearEmployeeDialogFields();
    }

    const departmentChangedHandler = (id?: string) => {
        const _id: number | undefined = !id ? undefined: +id;
        setSelectedDepartmentId(_id);
    }

    const onEmployeeSelectedHandler = (id: number) => {
        const employee = employeesData.find(e => e.id === id);
        setSelectedEmployee(employee);
    }

    const getFIO = () => {
        if(!selectedEmployee){
            return '';
        }
        return `${selectedEmployee?.lastName} ${selectedEmployee.firstName} ${selectedEmployee.middleName ?? ''}`.trim();
    }

    const uploadFileHandler = () => {

    }
    const downloadFileHandler = (id: number) => {

    }
    const deleteFileHandler = (id: number) => {
        alert(id);
    }

    return (
        <Layout>
            <Dialog title={userActionMode !== 'edit' ? 'Добавить сотрудника' : 'Изменить сотрудника'}
                open = {showEmployeeDialog}
                onSave={() => {}}
                onCancel={closeEmployyeDialogHandler}>
                {userDialogContentRenderer()}
            </Dialog>
            <div className="dep-page">
                <div className="dep-page__users-list-container">
                    <div className="dep-page__departments-list">
                        <DropDown 
                            items={departmentsData.map(dd => {
                                    return {
                                        text: dd.name,
                                        value: dd.id.toString(),
                                    } as DropDownItem;
                                })
                            } 
                            label='Отделы:'
                            selectedChanged={(val) => departmentChangedHandler(val)}
                        />
                        {role === 'admin' && (<>
                            <PlusIcon width={16} height={16} className="dep-page__add-btn" />
                            <PencilIcon/>
                            {/* <TrashIcon onClick={deleteDepartmentHandler}/> */}
                            </>
                        )}
                    </div>
                    <EmplyeesList employeesList={employeesData}
                        onItemClick={(id) => onEmployeeSelectedHandler(id)}
                        onItemDelete={(id) => console.log('delete', id)}
                        onItemEdit={editEmployeeHandler}
                    />
                    <Button text="Добавить сотрудника" className="dep-page__add-user-btn" onClick={createEmployeeHandler}/>
                </div>
                <div className="dep-page__user-info-container">    
                    <div className="dep-page__user-info-header">
                        <div className="dep-page__user-info-user">
                            <div className="dep-page__user-info-fullname">
                                {getFIO()}
                            </div>
                            <div className="dep-page__user-info-pers-data">
                                <div>
                                    <strong>Дата рождения: </strong>
                                    <span>{
                                        selectedEmployee?.birthDate 
                                            ? format(new Date(selectedEmployee.birthDate), 'dd.MM.yyyy')
                                            : '-'
                                        }
                                    </span>
                                </div>
                                <div>
                                    <strong>Email: </strong>
                                    <span>{selectedEmployee?.email ?? '-'}</span>
                                </div>
                                <div>
                                    <strong>Телефон: </strong>
                                    <span>{selectedEmployee?.phoneNumber ?? '-'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="dep-page__user-info-actions">
                            <UploadIcon onClick={uploadFileHandler}/>
                        </div>
                    </div>
                    <div className="dep-page__user-add-info">
                        <div className="dep-page__user-add-info-files">
                            <span className="dep-page__label">
                                Прикрепленные файлы:
                            </span>
                            <FilesList 
                                onFileDownload={downloadFileHandler}
                                onFileDelete={deleteFileHandler}
                                filesList={[{
                                    id: 1,
                                    displayName: 'myFile.txt',
                                    systemName: 'asdasd'
                                },
                                {
                                    id: 2,
                                    displayName: 'myFile 2.txt',
                                    systemName: 'asdasd'
                                }]}
                            />
                        </div>
                        <div className="dep-page__user-add-info-data">
                            <div className="dep-page__user-add-info-data__cell">
                                <div className="dep-page__list-title">
                                    <span className="dep-page__label">
                                        Данные об образовании:
                                    </span>
                                    <PlusIcon width={16} height={16}/>
                                </div>
                                <EducationList educationList={selectedEmployee?.educations ?? []}/>
                            </div>
                            <div className="dep-page__user-add-info-data__cell">
                                <div className="dep-page__list-title">
                                    <span className="dep-page__label">
                                        Данные о работе:
                                    </span>
                                    <PlusIcon width={16} height={16}/>
                                </div>  
                                <WorkExperienceList workExperienceList={selectedEmployee?.workExperience ?? []}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}