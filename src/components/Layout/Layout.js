import styles from './Layout.module.css';
import SideBar from '../SideBar/SideBar';
import Header from '../Header/Header';
import { useState } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

const Layout = (props) => {

    const [bigSidebar, setBigSidebar] = useState(true);
    const toggleSideBar = e => setBigSidebar(prevState => !prevState);

    return [
        
        <Header bigSidebar={bigSidebar}></Header>,

        <div className={styles.page} style={{border: '0px solid orangered', flexGrow: 1, overflow: 'hidden'}} >
            <SideBar bigSidebar={bigSidebar} toggleMenu={toggleSideBar}/>
            <main className={styles.main}>
                <SimpleBar style={{ maxHeight: 500 }}>
                    {props.children}
                </SimpleBar>
            </main>
        </div>,

        <div style={{backgroundColor:  'red', height: '40px'}}><h2>Ceci est le footer de test </h2></div>
    ];
}

export default Layout;