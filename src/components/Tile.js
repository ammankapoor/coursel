import styled from 'styled-components';

const getBackgroundColor=(props)=>{
    if(props.price) {
        return '#cc3300';
    } else {
        if(props.selected) {
        return '#00cc00'
        } else {
            return 'black';
        }
    }
}

export default styled.div`
    background: ${props => getBackgroundColor(props)};
    margin-right: ${props => props.price ? '30px' : 0};
    padding: 4px;
    color: white;
    border-radius: 5px;
    width: fit-content;
    margin: 5px;
    cursor: ${props => props.category ? 'pointer' : 'unset'};
`