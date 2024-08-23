import { Outlet } from 'react-router-dom'
import {
    Header,
    Left,
    Right
} from '../../components/index'

import style from './default.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(style)

const DefaultLayout = () => {
    return (
        <>
            <Header />
            <div className={cx("container")}>
                <Left className={cx("left")} />
                <div className={cx("mid")}>
                    <Outlet />
                </div>
                <Right className={cx("right")} />
            </div>
        </>
    )
}

export default DefaultLayout;