import styled from 'styled-components';

export default styled.div`
    position: relative;
    top: 0;
    display: -webkit-box;
    left: ${props => props.left}px;
    width: 100%;
    max-width: 100vw;
    transition: left 0.2s ease-out 0s;
`