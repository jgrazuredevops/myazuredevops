const FilterBar = (props) => {


    return (
        <div style={{display: 'flex', width: '100%', height: '40px', backgroundColor: '#3b3a39', borderRadius: '5px', margin: '.75rem .5rem'}}>
            {props.children}
        </div>
    );
}

export default FilterBar;