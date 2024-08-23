import right from './right.scss'
import classNames from 'classnames/bind'

import SearchIcon from '@mui/icons-material/Search'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

const rightCx = classNames.bind(right)

const RightBar = () => {
    return (
        <div className={rightCx("wrapperRight")}>
            <div className={rightCx("containerRight")}>
                <div className={rightCx("itemRight")}>
                    <div className={rightCx("titleRight")}>
                        <span>Contacts</span>
                        <div className={rightCx("iconRight")}>
                            <SearchIcon />
                            <MoreHorizIcon />
                        </div>
                    </div>
                    <div className={rightCx("user")}>
                        <div className={rightCx("userInfo")}>
                            <img
                                src="https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/434185904_1607445900005565_2096330530224373146_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGo7sFxLHlBT3Pe3lN4r137DTruw4HYkIgNOu7DgdiQiM9PE5EHj8EaJyU5WnJEzRu6siZMNQtWZPZlMfiQw6eo&_nc_ohc=wBA8qA9LybAQ7kNvgE27O9S&_nc_ht=scontent.fhan14-3.fna&oh=00_AYAlg0Ryu4vXapvuQ1KFtONXV8trztLGAejDeChzs0CD-Q&oe=669A8983"
                                alt=""
                            />
                            <div className={rightCx("online")} />
                            <span>Cobham</span>
                        </div>
                    </div>
                    <div className={rightCx("user")}>
                        <div className={rightCx("userInfo")}>
                            <img
                                src="https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/434185904_1607445900005565_2096330530224373146_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGo7sFxLHlBT3Pe3lN4r137DTruw4HYkIgNOu7DgdiQiM9PE5EHj8EaJyU5WnJEzRu6siZMNQtWZPZlMfiQw6eo&_nc_ohc=wBA8qA9LybAQ7kNvgE27O9S&_nc_ht=scontent.fhan14-3.fna&oh=00_AYAlg0Ryu4vXapvuQ1KFtONXV8trztLGAejDeChzs0CD-Q&oe=669A8983"
                                alt=""
                            />
                            <div className={rightCx("online")} />
                            <span>Cobham</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RightBar;