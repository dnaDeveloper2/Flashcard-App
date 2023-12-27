import { Link, useLocation } from 'react-router-dom'

const BreadCrumbs = () => {
    const location = useLocation();
    const {pathName} = location;
    const segments = pathName.split('/');

    let url = '';
    const breadCrumbLink = segments.map((segment, i) => {
        url += `/${segment}`;
        return (
            <Link key={i} to = {`${url}`}> 
                {segment == '' ? 'Home' : segment}
            </Link>
        );
    });
    return breadCrumbLink;
}

export default Breadcrumbs;