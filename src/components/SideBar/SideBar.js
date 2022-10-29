import styles from './SideBar.module.css';
import NavItem from '../NavItem/NavItem';
import NavSection from '../NavSection/NavSection';
import { useState } from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaConnectdevelop, FaChalkboardTeacher, FaGitAlt, FaBong, FaCube, FaDatabase, FaDice, FaEdit } from "react-icons/fa";
import displayIcon from '../displayIcon';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

const iconOverview = <FaConnectdevelop color="blue" size="2em" style={{ verticalAlign: 'middle' }}/>;
const iconBoards = <FaChalkboardTeacher color="green" size="2em" style={{ verticalAlign: 'middle' }}/>;
const iconRepos = <FaGitAlt color="orange" size="2em" style={{ verticalAlign: 'middle' }}/>;
const iconPipelines = <FaBong color="violet" size="2em" style={{ verticalAlign: 'middle' }}/>;
const iconSummary = <FaCube color="white" size="1.25em" style={{ verticalAlign: 'middle' }}/>;
const iconCube = <FaDatabase color="white" size="1.25em" style={{ verticalAlign: 'middle' }}/>;
const iconDice = <FaDice color="white" size="1.25em" style={{ verticalAlign: 'middle' }}/>;
const iconEdit = <FaEdit color="white" size="1.25em" style={{ verticalAlign: 'middle', fontWeight: '100' }}/>;

const SideBar = (props) => {

    const {bigSidebar} = props;
    const [openSection, setOpenSection] = useState('Overview');
    
    const activeSection = title => setOpenSection(title);
    
    let iconSizeBar = <FaAngleDoubleLeft color="violet" size="2em" style={{ verticalAlign: 'middle' }}/>;
    let widthclasssidebar = null;
    if (!bigSidebar){
        iconSizeBar = <FaAngleDoubleRight color="violet" size="2em" style={{ verticalAlign: 'middle' }}/>;
        widthclasssidebar = styles.short;
    }
    return (
        <SimpleBar style={{ maxHeight: 600 }} className={`${styles.sidebar} ${widthclasssidebar}`}>
            <div className={styles.sidebarheader}>
                {iconOverview}
                {bigSidebar && <span style={{margin: '0 .5rem'}}>Magistere</span>}
            </div>
            <nav className={styles.nav} style={bigSidebar?{'overflow-y':'hidden'}:null}>

                <NavSection shortsidebar={!bigSidebar} icon={iconOverview} title="Overview" open={openSection==='Overview'?true:false} actived={activeSection}>
                    <NavItem icon={iconSummary} to="/">Summary</NavItem>
                    <NavItem icon={iconDice} to="/">Dashboards</NavItem>
                    <NavItem icon={iconCube} to="/backlog">Wiki</NavItem>
                </NavSection>

                <NavSection shortsidebar={!bigSidebar} icon={iconBoards} title="Boards" open={openSection==='Boards'?true:false} actived={activeSection}>
                    <NavItem icon={iconSummary} to="/">Work items</NavItem>
                    <NavItem icon={iconCube} to="/">Boards</NavItem>
                    <NavItem icon={iconEdit} to="/backlog">Backlogs</NavItem>
                    <NavItem icon={iconSummary} to="/sprints">Sprints</NavItem>
                    <NavItem icon={iconCube} to="/">Queries</NavItem>
                    <NavItem icon={iconDice} to="/">Estimate</NavItem>
                </NavSection>

                <NavSection shortsidebar={!bigSidebar} icon={iconRepos} title="Repos" open={openSection==='Repos'?true:false} actived={activeSection}>
                    <NavItem icon={iconDice} to="/">Files</NavItem>
                    <NavItem icon={iconEdit} to="/">Commits</NavItem>
                    <NavItem icon={iconCube} to="/backlog">Pushes</NavItem>
                    <NavItem icon={iconEdit} to="/sprints">Branches</NavItem>
                    <NavItem icon={iconDice} to="/">Tags</NavItem>
                    <NavItem icon={iconCube} to="/">Pull requests</NavItem>
                </NavSection>

                <NavSection shortsidebar={!bigSidebar} icon={iconPipelines} title="Pipelines" open={openSection==='Pipelines'?true:false} actived={activeSection}>
                    <NavItem icon={iconSummary} to="/">Pipelines</NavItem>
                    <NavItem icon={iconDice} to="/">Environments</NavItem>
                    <NavItem icon={iconCube} to="/backlog">Releases</NavItem>
                    <NavItem icon={iconEdit} to="/sprints">Library</NavItem>
                    <NavItem icon={iconDice} to="/">Task groups</NavItem>
                    <NavItem icon={iconCube} to="/">Deployment groups</NavItem>
                </NavSection>
            </nav>
            <div className={styles.btn} onClick={props.toggleMenu}>{iconSizeBar}</div>
            <div style={{width: '100px', height: '120px', backgroundColor: 'cyan'}}></div>
        </SimpleBar>
    );
}

export default SideBar;