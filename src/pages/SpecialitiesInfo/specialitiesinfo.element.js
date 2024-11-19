import styled from "styled-components";
import {Container} from "../../globalStyles";

export const SILayout = styled.div`
    width: 100%;
    background: #F0F2F1;
    height: 100vh;
`
export const SIBiggerContainer = styled.div`
    display: flex;
    //background-color: black;
    height: 100%;
    flex-direction: column;
`

export const SITop = styled.div`
    flex: 1;
`

export const SIMiddle = styled.div`
    flex: 9;
    display: flex;
    flex-direction: column;
    position: relative;
`

export const SIMiddleTop = styled.div`
    //flex: 2;
    width: 100%;
    height: 100%;
    background-color: white;
`

export const SIInfoRightTop = styled.div`
    width: 70%;
    left: 10%;
    margin-left: 30%;
    margin-top: 7%;
    .header-top{
        color: #005A5C;
    }
    .content-top{
        margin-top: 10px;
    }
`
export const SIMiddleBottom = styled.div`
    width: 100%;
    height: 100%;
    background-color: #00D3D6;

    .header-top{
        color: #005A5C;
    }
    .content-top{
        margin-top: 10px;
    }
`

export const SIInfoRightBottom = styled.div`
    margin-top: 7px;
    margin-left: 30%;

    .header-bottom {
        color: #005A5C;
        margin-top: 30px;
    }

    .content-top {
        margin-top: 10px;
    }


`
export const SIBottom = styled.div`
    flex: 4;
    width: 100%;

`
export const SIHeader = styled.p`
    font-size: 25px;
    color: #2197E3;
    text-align: center;
    margin: 0 auto;
    padding-top: 20px;
`
export const HeaderUnderline = styled.div`
    border-top: 4px solid #5D5D5D;
    width: 100%;
    margin-top: 5px;
`
export const SIInfo = styled(Container)`
    display: flex;
    position: absolute;
    justify-content: center;
    margin-bottom: 30px;
    margin-top: 100px;
    gap: 20px;
    ${Container}
`

export const SIInfoLeft = styled.div`
    flex: 1;
    width: 300px;
    height: 370px;
    padding-left: 120px;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
        border: 1px solid;
    }
`

export const SIInfoRight = styled.div`
    flex: 3;
    width: 100%;
    height: 100%;
    background-color: white;
    

`
