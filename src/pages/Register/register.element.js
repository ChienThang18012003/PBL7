import styled from 'styled-components';

export const RLayout = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    margin: 0;

`

export const RHeader = styled.div`
    flex: 1;
    position: relative;
`
export const Deco = styled.div`
    position: absolute;
    top: -200px;
    width: 100%;
    height: 400px;
    background-color: #3BA5A9;
    border-radius: 50%;

    h1 {
        color: white;
        text-transform: uppercase;
        text-align: center;
        margin-top: 300px;

    }

`
export const RSpace = styled.div`
    flex: 1;
    display: flex;
`
export const RBody = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
    margin-top: 6rem;
`

export const RContent = styled.div`
    display: flex;
    flex: 3;
`
export const RButton = styled.div`
    margin-top: 3rem;
    display: flex;
    flex: 3;
    justify-content: center;
    button{
        background-color: #00D3D6;
        color: white;
        font-size: 22px;
        width: 30%;
        height: 40px;
        border-radius: 5px;
        border: none;
        cursor: pointer;
        
    }
`

export const RBodyL = styled.div`
    flex: 3;
    padding: 20px;

    input {
        width: 100%;
        height: 30px;
        border: 1px solid gainsboro;
        border-radius: 5px;
    }
`
export const RBodyLItem = styled.div`
    margin: 30px 50px 0 100px;
    font-size: 20px;
    //margin-left: 200px;


`
export const RBodyR = styled.div`
    flex: 3;
    padding: 20px;

    input, select {
        width: 100%;
        height: 30px;
        border: 1px solid gainsboro;
        border-radius: 5px;
    }

`
export const RBodyRItem = styled.div`
    margin: 30px 100px 0 50px;
    font-size: 20px;

`

