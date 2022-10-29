import styles from './Button.module.css';
import {BsChevronDown} from 'react-icons/bs';
import { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/workItems';

const Button = (props) => {

    //const [isOpen,setIsOpen] = useState(false);

    let sousbloc = null;
    let labelButton = null;
    if (props.isButtonOpened.includes(props.name)){
        sousbloc = <div className={styles.children}>{props.children}</div>;
    }
    if (props.label){
        labelButton = [
            <span>{props.label}{props.isButtonOpened.includes(props.name)}</span>,
            props.children?<BsChevronDown color="grey" size="1.25em" style={{ verticalAlign: 'middle' }}/>:null,
            sousbloc
        ];
    }
    return (
        <div className={props.type==='small'?styles.smallbutton:styles.button} 
            onClick={props.onClickEvent?()=>props.onClickEvent(op=>!op):() => props.onButtonOpened(props.name)}>
            {props.icon?props.icon:null}
            {labelButton}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        isButtonOpened: state.workItem.buttonsopened
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onButtonOpened: (name) => dispatch(actions.openButton(name))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Button);