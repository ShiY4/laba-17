import { Emplyee } from "../../types/models";

export interface EmplyeesListProps{
    employeesList: Array<Emplyee>;
    onItemClick?: (id: number) => void;
    onItemEdit?: (id: number) => void;
    onItemDelete?: (id: number) => void;
}