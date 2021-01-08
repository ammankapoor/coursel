import styled from 'styled-components';

export default styled.div`
    border-radius: 16px;
    width: 360px;
    height: 640px;
    position: relative;
    background: #fff;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);

    @media (max-width: 600px) {
        min-width: 100vw;
        min-height: 100vh;
        border-radius: 0;
    }
`