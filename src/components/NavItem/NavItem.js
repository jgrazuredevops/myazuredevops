import {NavLink} from "react-router-dom";
import styles from './NavItem.module.css';

const NavItem = props => {

    
    return (
        <NavLink className={styles.link} to={props.to}>{props.icon} <span className={styles.title}>{props.children}</span></NavLink>
    );
}

export default NavItem;