import BreadCrumb from "../components/utils/breadCrumb/index";
import FormUserEdit from '../components/form-user.component';

function FormUser(props) {

    // console.log(props.location.search)
    // console.log(props.location);

    const acao = props.location.state?.acao;
    const codigo = props.location.state?.codigo;
    const activePageSize = props.location.state?.activePageSize;
    const activePage = props.location.state?.activePage;
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
            activePageSize,
            activePage,
            stateSort,
            stateSearch
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
            <BreadCrumb className="ant-breadcrumb-form" breadcrumb={routes} />
            <FormUserEdit acao={acao} codigo={codigo || null} activePageSize={activePageSize} activePage={activePage} stateSort={stateSort} stateSearch={stateSearch} />
        </>
    );
}

export default FormUser;