import {FC} from 'react';
import { TrashIcon } from '../../assets/icons';
import { WorkExperienceListProps } from './WorkExperienceListProps';
import './workExperienceListStyle.scss';

export const WorkExperienceList: FC<WorkExperienceListProps> = props => {
    const {
        workExperienceList,
        onDelete
    } = props;

    const deleteHandler = (id: number) => {
        onDelete && onDelete(id);
    }

    return (
        <div className='work-exp-list'>
            {workExperienceList.map(workExperience => {
                return (
                    <div key = {workExperience.id} className='work-exp-list__item'>
                        <div className='work-exp-list__item-descr'>
                            <span>
                                {workExperience.description}
                            </span>
                            <span className='work-exp-list__item-descr-years'>
                                Лет:{workExperience.workedYears}
                            </span>
                        </div>
                        <div className='work-exp-list__item-actions'>
                            <TrashIcon width={24} height={24} onClick={()=> {deleteHandler(workExperience.id)}}/>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}