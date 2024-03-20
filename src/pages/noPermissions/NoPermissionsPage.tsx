import {FC} from 'react'
import { Layout } from '../../components/layouts'

export const NoPermissionsPage: FC = () => {
    return (
        <Layout title='База сотрудников'>
            <h3>У вас недостаточно прав для работы с системой</h3>
            <h4>Пожалуйста, ожидайте, пока администратор рассмотрит вашу заявку на работу с системой</h4>
        </Layout>
    )
}