export interface Emplyee {
    id: number;
    firstName: string;
    lastName: string;
    middleName: string;
    email: string;
    phoneNumber: string;
    birthDate: string;
    educations: Array<Education>;
    workExperience: Array<WorkExperience>;
}

export interface Education {
    id: number;
    title: string;
    description: string;
}

export interface WorkExperience {
    id: number;
    workedYears: number;
    description?: string;
}

export interface Emplyee {
    id: number;
    firstName: string;
    lastName: string;
    midleName?: string;
    email: string;
    phoneNumber: string;
    birthDate: string;
    educations: Array<Education>;
    workExperience: Array<WorkExperience>;
}

export interface Department {
    id: number;
    name: string;
    description?: string;
    employees: Array<Emplyee>;
}

export interface UserFile{
    id: number;
    systemName: string;
    displayName: string;
}

export interface User{
    id:number;
    password: string;
    login: string;
    role: 'admin' | 'manager' | 'user';
}