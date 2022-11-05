import styles from './SideBar.module.css';
import NavItem from '../NavItem/NavItem';
import NavSection from '../NavSection/NavSection';
import { useState } from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaConnectdevelop, FaChalkboardTeacher, FaGitAlt, FaBong, FaCube, FaDatabase, FaDice, FaEdit, FaList } from "react-icons/fa";
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
const iconConfig = <FaList color="white" size="1.25em" style={{ verticalAlign: 'middle', fontWeight: '100' }}/>;


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
        <div className={`${styles.sidebar} ${widthclasssidebar}`}>

            <div className={styles.sidebartop}>
                
                <div className={styles.sidebarheader}>
                    {iconOverview}
                    {bigSidebar && <span style={{margin: '0 .5rem'}}>My Project</span>}
                </div>

                <SimpleBar style={{ maxHeight: '67vh' }}>
                    <nav className={styles.nav} style={bigSidebar?{'overflow-y':'hidden'}:null}>

                        <NavSection shortsidebar={!bigSidebar} icon={iconOverview} title="Overview" open={openSection==='Overview'?true:false} actived={activeSection}>
                            <NavItem icon={iconSummary} to="/notdev">Summary</NavItem>
                            <NavItem icon={iconDice} to="/notdev">Dashboards</NavItem>
                            <NavItem icon={iconCube} to="/notdev">Wiki</NavItem>
                        </NavSection>

                        <NavSection shortsidebar={!bigSidebar} icon={iconBoards} title="Boards" open={openSection==='Boards'?true:false} actived={activeSection}>
                            <NavItem icon={iconSummary} to="/">Work items</NavItem>
                            <NavItem icon={iconCube} to="/notdev">Boards</NavItem>
                            <NavItem icon={iconEdit} to="/notdev">Backlogs</NavItem>
                            <NavItem icon={iconSummary} to="/sprints">Sprints</NavItem>
                            <NavItem icon={iconCube} to="/notdev">Queries</NavItem>
                            <NavItem icon={iconDice} to="/notdev">Estimate</NavItem>
                        </NavSection>

                        <NavSection shortsidebar={!bigSidebar} icon={iconRepos} title="Repos" open={openSection==='Repos'?true:false} actived={activeSection}>
                            <NavItem icon={iconDice} to="/notdev">Files</NavItem>
                            <NavItem icon={iconEdit} to="/notdev">Commits</NavItem>
                            <NavItem icon={iconCube} to="/notdev">Pushes</NavItem>
                            <NavItem icon={iconEdit} to="/notdev">Branches</NavItem>
                            <NavItem icon={iconDice} to="/notdev">Tags</NavItem>
                            <NavItem icon={iconCube} to="/notdev">Pull requests</NavItem>
                        </NavSection>

                        <NavSection shortsidebar={!bigSidebar} icon={iconPipelines} title="Pipelines" open={openSection==='Pipelines'?true:false} actived={activeSection}>
                            <NavItem icon={iconSummary} to="/notdev">Pipelines</NavItem>
                            <NavItem icon={iconDice} to="/notdev">Environments</NavItem>
                            <NavItem icon={iconCube} to="/notdev">Releases</NavItem>
                            <NavItem icon={iconEdit} to="/notdev">Library</NavItem>
                            <NavItem icon={iconDice} to="/notdev">Task groups</NavItem>
                            <NavItem icon={iconCube} to="/notdev">Deployment groups</NavItem>
                        </NavSection>
                    </nav>
                </SimpleBar>
            </div>

            <div class={styles.containerSettings} style={{justifyContent: bigSidebar?'space-between':'center'}}>
                { bigSidebar?<NavItem icon={iconConfig} to="/backlog">Project settings</NavItem>:null } 
                <div className={styles.btn} onClick={props.toggleMenu}>{iconSizeBar}</div>
            </div>
        </div>
    );
}

export default SideBar;