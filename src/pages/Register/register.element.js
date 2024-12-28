import styled from 'styled-components';

export const RLayout = styled.div`
    width: 100vw;
    overflow: auto;
    display: flex;
    flex-direction: column;
    margin: 0;

`

export const RHeader = styled.div`
    height: 200px;
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
    display: flex;
    flex-direction: column;
`

export const RContent = styled.div`
    display: flex;
    width: 100%;
    @media (max-width: 1024px) {
       flex-direction: column;
       align-items: center;
    }
    
`
export const RButton = styled.div`
    margin-top: 3rem;
    display: flex;
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
    width: 40%;
    padding: 20px;

    input {
        width: 100%;
        height: 30px;
        border: 1px solid gainsboro;
        border-radius: 5px;
    }

    @media (max-width: 1024px) {
       padding-bottom: 0px;
       width: 70%;
    }

    @media (max-width: 740px) {
       padding-bottom: 0px;
       width: 90%;
    }
`
export const RBodyLItem = styled.div`
    margin: 30px;
    font-size: 20px;
    //margin-left: 200px;


`
export const RBodyR = styled.div`
    width: 40%;
    padding: 20px;

    input, select {
        width: 100%;
        height: 30px;
        border: 1px solid gainsboro;
        border-radius: 5px;
    }

    @media (max-width: 1024px) {
       padding-top: 0px;
       width: 70%;
    }

    @media (max-width: 740px) {
       padding-top: 0px;
       width: 90%;
    }

`
export const RBodyRItem = styled.div`
    margin: 30px;
    font-size: 20px;

    @media (max-width: 1024px) {
       margin-top: 0px;
    }

`

