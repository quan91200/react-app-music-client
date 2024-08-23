import group from './group.scss'
import classNames from 'classnames/bind'

const cxGroup = classNames.bind(group)

const Group = () => {
    return (
        <div className={cxGroup("wrapperGroup")}>
            Group
        </div>
    );
}

export default Group;