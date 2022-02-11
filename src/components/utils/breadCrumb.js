import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

function itemRender(route, params, routes, paths) {
    const first = routes.indexOf(route) === 0;
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
        <span>{route.breadcrumbName}</span>
    ) : (
        first ? (
            <>
                <HomeOutlined style={{ color: '#e26565', float: 'left', marginTop: '2px' }}/>
                <Link to={paths.join('/')} > {route.breadcrumbName}</Link >
            </>
        ) : (
            <Link to={paths.join('/')} > {route.breadcrumbName}</Link >
        )
    )
}

function BreadCrumb(props) {

    const routes = props.breadcrumb;

    return <Breadcrumb separator=">" itemRender={itemRender} routes={routes} />

}

export default BreadCrumb;