import React from 'react';
import styled from 'styled-components';
import Tile from './Tile';

const Container = styled.div`
    display: flex;
    min-width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const Image = styled.img`
    max- width: 150px;
    height: 200px;
`

const Title = styled.h4`
    text-decoration: underline; 
`

const ItemCard = (props) => {
    const { data:{imgUrl, itemName, itemPrice, itemCategory} } = props;
    return (
        <Container>
            <Title>{itemName}</Title>
            <Image src={imgUrl} />
            <div style={{display:'flex', marginTop: '30px'}}>
                <Tile price>{itemPrice}</Tile>
                <Tile>{itemCategory}</Tile>
            </div>
        </Container>
    )
}

export default ItemCard;