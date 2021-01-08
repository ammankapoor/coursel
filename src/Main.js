import React, { useState, useEffect, useRef } from 'react';
import mockData from './mockData';
import styled from 'styled-components';

//components
import Container from './components/Container';
import SliderContainer from './components/SliderContainer';
import { LeftButton, RightButton } from './components/ArrowButton';
import ItemCard from './components/ItemCard';
import Wrapper from './components/Wrapper';
import InnerWrapper from './components/InnerWrapper';
import FilterPanel from './components/FilterPanel';
import Tile from './components/Tile';
import DotsWrapper from './components/DotsWrapper';
import Dots from './components/Dots';
import Loader from './images/loader.gif';

const Main = () => {
    const [frames, setFrames] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [active, setActive] = useState(0);
    const wrapperRef = useRef(null);
    const innerRef = useRef(null);
    const [animate, setAnimate] = useState(true);
    let posX1 = 0;
    let posX2 = 0;
    let posInitial = 0;
    let threshold = 100;
    const catagoryList = getCatagoryList();

    const Frame = styled.div`
    width: 100%;
    height: 100%;
    justify-content: center;
    position: relative;
    `;

    const TagsContainer = styled.div`
    display: flex;
    margin-top: 8px;
    justify-content: center;
    `;

    useEffect(() => {
        var list;
        if(selectedFilter === 'All') {
             list= mockData;
        } else {
            var filteredList = mockData.filter(function (val){
                return val.itemCategory === selectedFilter;
            });
            list= filteredList;
        }
        list = [list[list.length-1], ...list, list[0]];
        setActive(0);
        setFrames(list.map((item, key) => <ItemCard index={key} data={item} />));
    }, [selectedFilter])

    useEffect(()=> {
        innerRef.current.style.transition = "unset";
        innerRef.current.style.left = '-360px';
    },[frames])

    function moveSlides(dir, action) {
        innerRef.current.style.transition = `left 500ms ease-out 0s`;
        if (!action) { posInitial = innerRef.current.offsetLeft; }
        if (animate) {
            if (dir == 1) {
                innerRef.current.style.left = (posInitial - wrapperRef.current.clientWidth) + "px";
                setActive(active + 1);
            }
            else if (dir == -1) {
                innerRef.current.style.left = (posInitial + wrapperRef.current.clientWidth) + "px";
                setActive(active - 1);
            }
        }
        setAnimate(false);
    }

    function checkIndex() {
        innerRef.current.style.transition = "unset";
        var listLength = selectedFilter === 'All' ? mockData.length : frames.length -2;
        if (active == -1) {
            innerRef.current.style.left = -(listLength * wrapperRef.current.clientWidth) + "px";
            setActive(listLength - 1);
        }

        if (active == listLength) {
            innerRef.current.style.left = -(1 * wrapperRef.current.clientWidth) + "px";
            setActive(0);
        }
        setAnimate(true);
    }

    function dragStart(e) {
        if (frames.length < 2)
            return;

        e = e || window.event;
        e.preventDefault();
        posInitial = innerRef.current.offsetLeft;
        if (e.type == 'touchstart') {
            posX1 = e.touches[0].clientX;
        } else {
            posX1 = e.clientX;
            document.onmouseup = dragEnd;
            document.onmousemove = dragAction;
        }
    }

    function dragEnd() {
        let posFinal = innerRef.current.offsetLeft;
        if (posFinal - posInitial < -threshold) {
            moveSlides(1, 'drag');
        } else if (posFinal - posInitial > threshold) {
            moveSlides(-1, 'drag');
        } else {
            innerRef.current.style.left = (posInitial) + "px";
        }
        document.onmouseup = null;
        document.onmousemove = null;
    }

    function getSectionsWidth() {
        var wrapperWidth = wrapperRef.current && wrapperRef.current.offsetWidth;
        if(wrapperWidth) {
                return wrapperWidth;
            }
    }

    function dragAction(e) {
        e = e || window.event;
        if (e.type == 'touchmove') {
            posX2 = posX1 - e.touches[0].clientX;
            posX1 = e.touches[0].clientX;
        } else {
            posX2 = posX1 - e.clientX;
            posX1 = e.clientX;
        }
        console.log(innerRef.current.offsetLeft);
        if((active== frames.length -1 && posX2>0) || (active== 0 && posX2<0))
            return;
        
        if((innerRef.current.offsetLeft == 0 && posX2<0) || (Math.floor(getSectionsWidth()*(frames.length-1)) <= Math.abs(innerRef.current.offsetLeft) && posX2>0))
            return;

        innerRef.current.style.left = (innerRef.current.offsetLeft - posX2) + "px";
    }

    function getCatagoryList() {
        var temp = { All: 1 };
        for (var a = 0; a < mockData.length; a++) {
            if (!temp[mockData[a].itemCategory]) {
                temp[mockData[a].itemCategory] = 1;
            }
        }
        return Object.keys(temp);
    }

    return (
        <Container>
            <LeftButton onClick={() => moveSlides(-1)} />
            <SliderContainer>
                <FilterPanel>Filter By Catagory
                    <TagsContainer>
                        {catagoryList.map((item, index) => <Tile key={index} onClick={(item) => setSelectedFilter(catagoryList[index])} category selected={selectedFilter === item}>{item}</Tile>)}
                    </TagsContainer>
                </FilterPanel>
                <Wrapper ref={wrapperRef}>
                    <InnerWrapper ref={innerRef} left={wrapperRef.current && -wrapperRef.current.offsetWidth} onTransitionEnd={checkIndex}   onTouchStart={dragStart} onTouchEnd={dragEnd} onTouchMove={dragAction}>
                        {frames ?
                            frames.map((frame, i) => {
                                return <Frame>{frame}</Frame>
                            }) : <img src={Loader} alt="loader" style={{width: '360px'}}/>
                        } 
                    </InnerWrapper>
                </Wrapper>
                {frames && frames.length > 2 && <DotsWrapper>
                {
                    Array.apply(null, Array(frames.length - 2)).map((x, i) => {
                        return <Dots key={i} active={active == i} />
                    })
                }
            </DotsWrapper>}
            </SliderContainer>
            <RightButton onClick={() => moveSlides(1)} />
        </Container>
    )
}

export default Main;