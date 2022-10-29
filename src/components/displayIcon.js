import Auxi from '../hoc/Auxi/Auxi';

const displayIcon = (WrapComponent) => {

    return (props) => {

        return (
            <Auxi>
                <WrapComponent {...props} />
            </Auxi>
        );
    };
}

export default displayIcon;