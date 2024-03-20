import { LabelWeight } from "../../types/commonTypes";

type infoType ='info' | 'error' | 'success';


export interface TextFieldProps{
    labelText? : string;
    type? : React.HTMLInputTypeAttribute;
    info? :string;
    infoType? : infoType;
    value? : string;
    onChange? : (value : string) => void;
    lblWeight? : LabelWeight;
};