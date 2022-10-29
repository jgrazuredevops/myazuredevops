import styles from './Header.module.css';
import {FaCube} from "react-icons/fa";

const Header = (props) => {

    let logocss = styles.logomin;
    if (props.bigSidebar) {
        logocss = styles.logo
    }

    const iconSummary = <FaCube color="white" size="1.25em" style={{ verticalAlign: 'middle' }}/>;

    return (
        <header className={styles.header}>
            <h3 className={logocss}>{props.bigSidebar?'Azure Devops':iconSummary}</h3>
            <ul className={styles.breadcrumb}>
                <li><a href="#">reseau-canope</a></li> 
                <li>/</li>
                <li><a href="#">Magistere</a></li>
                <li>/</li>
                <li><a href="#">Boards</a></li>
                <li>/</li> 
                <li><a href="#">Work items</a></li>
            </ul>
        </header>
    )
}

export default Header;