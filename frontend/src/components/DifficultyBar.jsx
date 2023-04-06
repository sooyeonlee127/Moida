import { useEffect } from "react";
import { useState } from "react"
import styled from "styled-components";

const DifficultyBar = (props) => {
    const [difficulty, setDifficulty] = useState(0);
    useEffect(()=> {
        setDifficulty(props.difficulty)
    }, [props])
    return (
        <WrapGuage size={props.size}>
            <Gauge num={parseInt(difficulty+0.25)}/>
            <Gauge num={parseInt(difficulty-0.25)}/>
            <Gauge num={parseInt(difficulty-0.75)}/>
            <Gauge num={parseInt(difficulty-1.25)}/>
            <Gauge num={parseInt(difficulty-1.75)}/>
            <Gauge num={parseInt(difficulty-2.25)}/>
            <Gauge num={parseInt(difficulty-2.75)}/>
            <Gauge num={parseInt(difficulty-3.25)}/>
            <Gauge num={parseInt(difficulty-3.75)}/>
            <Gauge num={parseInt(difficulty-4.25)}/>
        </WrapGuage>
    )
}
const WrapGuage = styled.div`
    height: ${(props)=> props.size || "18px"};
    width: 100px;
    display: inline-box;
`
const Gauge = styled.div`
    display: inline-box;
    width: 4px;
    height: 100%;
    margin: 0 1.5px;
    border-radius: 3px;
    background-color: ${(props)=>props.num >= 1? "#A0C846" : "#D9D9D9"};
`
export default DifficultyBar