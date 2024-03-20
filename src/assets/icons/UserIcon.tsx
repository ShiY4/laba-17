import {FC} from 'react';
import { IconProps } from '../../types/commonTypes';

export const UserIcon: FC<IconProps> = props => {
    const {
        className,
        color = '#ffffff',
        height = 24,
        width = 24,
        onClick
    } = props;

    return (
        
        <svg width={width} height={height} className={className} onClick={onClick}
            viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 12H17M8 8.5C8 8.5 9 9 10 9C11.5 9 12.5 8 14 8C15 8 16 8.5 16 8.5M8 15.5C8 15.5 9 16 10 16C11.5 16 12.5 15 14 15C15 15 16 15.5 16 15.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
    );

}



