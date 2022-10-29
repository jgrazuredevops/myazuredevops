import NavItem from "../NavItem/NavItem"
import styles from './NavSection.module.css';
import { FaBeer } from 'react-icons/fa';
import { FaAmazonPay } from "react-icons/fa";

const NavSection = (props) => {

    let navlist = null;
    let navcss = [];
    let title = props.title;
    if (props.open){
        navcss.push(styles.active); 
        title = <strong>{title}</strong>
        navlist = props.children.map((item, pos) => {
            return <li className={pos===0?styles.itemactive:null}>{item}</li>;
        });
        navlist = <ul className={styles.navlist}>{navlist}</ul>;
    }
    if (props.shortsidebar){
        navcss.push(styles.spacebtw);
    }
    console.log(navcss);
    return (
        <div className={navcss.join(' ')}>
            <div className={props.shortsidebar?styles.headermini:styles.header} onClick={() => props.actived(props.title)}>
            {props.icon} {props.shortsidebar?null:<span className={styles.title}>{title}</span>}
            </div>
            {props.shortsidebar?null:navlist}
        </div>
    );
}

export default NavSection;