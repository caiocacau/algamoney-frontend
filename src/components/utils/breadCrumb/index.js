import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

function itemRender(route, params, routes, paths) {
    // console.log("params: " + params);
    // console.log("route: " + route);
    // console.log("routes: " + routes);
    // console.log("paths: " + paths);

    const first = routes.indexOf(route) === 0;
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
        <span>{route.breadcrumbName}</span>
    ) : (
        first ? (
            <>
                <HomeOutlined style={{ color: '#e26565', float: 'left', marginTop: '2px' }} />
                {/* <Link to={paths.join('/')} > {route.breadcrumbName}</Link > */}
                <Link to={`/${route.path}`} > {route.breadcrumbName}</Link >
            </>
        ) : (
            // <Link to={paths.push(`/`)} > {route.breadcrumbName}</Link >
            // <Link to={`/${route.path}`} > {route.breadcrumbName}</Link >
            <Link to={{
                pathname: `/${route.path}`,
                state: {
                    pageSize: route.pageSize,
                    page: route.page,
                    stateSort: route.stateSort,
                    stateSearch: route.stateSearch
                }
            }} > {route.breadcrumbName}</Link >
        )
    )
}

function BreadCrumb(props) {

    const classname = props.className;
    const routes = props.breadcrumb;

    return <Breadcrumb className={classname} separator=">" itemRender={itemRender} routes={routes} />

}

export default BreadCrumb;