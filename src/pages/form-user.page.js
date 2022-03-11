import BreadCrumb from "../components/utils/breadCrumb";
import FormUserEdit from '../components/form-user.component';

function FormUser(props) {

    // console.log(props.location.search)
    // console.log(props.location);

    const acao = props.location.state?.acao;
    const codigo = props.location.state?.codigo;
    const page = props.location.state?.page;
    const stateSort = props.location.state?.stateSort;
    const stateSearch = props.location.state?.stateSearch;

    const routes = [
        {
            path: 'home',
            breadcrumbName: 'Home',
        },
        {
            path: 'user',
            breadcrumbName: 'User',
        },
        {
            path: 'user/form',
            breadcrumbName: 'User Form',
        }
    ];

    // console.log('acao: ', acao);
    // console.log('codigo: ', codigo);
    // console.log('stateSearch: ', stateSearch);

    return (
        <>
            <BreadCrumb breadcrumb={routes} />
            <FormUserEdit acao={acao} codigo={codigo || null} page={page} stateSort={stateSort} stateSearch={stateSearch} />
        </>
    );
}

export default FormUser;