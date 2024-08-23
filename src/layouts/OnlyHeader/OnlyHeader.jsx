import { Outlet } from 'react-router-dom';
import Header from '../../components/header/Header'
import onlyHeader from './onlyHeader.scss'
import classNames from 'classnames/bind'

const cxO = classNames.bind(onlyHeader)

const OnlyHeader = () => {
    return (
        <div className={cxO("onlyHeader")}>
            <Header />
            <div className={cxO("wrapperOL")}>
                <aside></aside>
                <Outlet />
                <aside></aside>
            </div>
        </div>
    );
}

export default OnlyHeader;