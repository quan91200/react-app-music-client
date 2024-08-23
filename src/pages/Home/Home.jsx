import { Posts, Share, Story } from '../../components/index'
import home from './home.scss'
import classNames from 'classnames/bind'

const cxHome = classNames.bind(home)

const Home = () => {
    return (
        <div className={cxHome("wrapperHome")}>
            <div className={cxHome("containerHome")}>
                <Story />
                <Share />
                <Posts />
            </div>
        </div>
    );
}

export default Home;