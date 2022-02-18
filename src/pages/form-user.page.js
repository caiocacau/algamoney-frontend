import { useParams } from 'react-router-dom';
import FormUserEdit from '../components/form-user.component';

function FormUser() {

    const params = useParams();

    return (
        <FormUserEdit codigo={params.codigo || null}/>
    );
}

export default FormUser;