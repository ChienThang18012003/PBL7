import styled from "styled-components";
import {Container} from "../../globalStyles";


export const ALayout = styled.div`
    display: flex;
    flex-direction: row;
    //width: 70%;
    //height: 1024px;

`
export const AContainer = styled(Container)`
    display: flex;
    flex: 7;
    width: 90%;
    height: 1000px;
    flex-direction: column;
    align-items: center;
    background-color: #F0F2F1;
    ${Container}

`
export const ASpace = styled.div`
    display: flex;
    flex: 1;
`
export const AHeader = styled.div`
    p {
        color: #2197E3;
        font-size: 30px;
        padding: 10px 10px 0 10px;

    }
`

export const AUnderline = styled.div`
    border-top: 2px solid #666666;
    width: 100%;
    margin-top: 5px;
`

export const ALeftSide = styled.div`
    background-color: #00D3D6;
    width: 300px;
    height: 800px;
    position: relative;
    padding: 10px;
    right: 0;
    margin: 50px 400px 0 0;
    border-radius: 8px 0 0 8px;
    color: white;

    p{
        margin: 20px 0 20px 0;
        max-width: 300px;
        text-align: justify;
    }
`


export const ARightSide = styled.div`
    background-color: #FFFFFF;
    width: 450px;
    height: 800px;
    top: 20px;
    position: absolute;
    left: 218px;
    border-radius: 0 8px 8px 0;
`
export const ARSItem = styled.div`
    margin-left: 10px;
    width: 100%;
    
    p{
        font-weight: bold;
        color: black;
        margin-bottom: 10px;
        display: inline-block;
    }
    input, select{
        width: 90%;
        height: 35px;
        border: 1px solid #000000;
        border-radius: 6px;
        display: inline-block;
        margin-top: -10px;
        font-size: 15px;
        padding-left: 10px; 

    }
    textarea{
        width: 90%;
        border: 1px solid #000000;
        border-radius: 6px;
        margin-top: -10px;
    }
    button{
        background-color: #80ACAD;
        width: 90%;
        height: 35px;
        border-radius: 6px;
        border: none;
        color: white;
        font-size: 18px;
        margin-top: 10px;

    }
    
    
`
