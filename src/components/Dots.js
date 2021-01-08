import styled from 'styled-components';

export default styled.span`
    display: inline-block;
    opacity: ${props => props.active ? '1' : '0.3'};
    height: 8px;
    width: 8px;
    border-radius: 4px;
    background-color: #ff9933;
    margin: 7px 5px;
`