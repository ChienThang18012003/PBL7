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
    background-color: #00a6a9;
    border-radius: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
        color: #fff;
        font-size: 30px;
        font-weight: 500;
        text-transform: uppercase;
    }

    img {
        width: 120px;
        height: 120px;
        margin-top: 200px;
        cursor: pointer;
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
    margin-bottom: 1rem;
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
        border-radius: 50px;
        &:hover{
           background-color: #50ACE9;
        }
    }
`

export const RLink = styled.div`
    margin-bottom: 4rem;
    display: flex;
    justify-content: center;
    font-size: 2rem;

    p{
        color: #000;
        text-align: center;
        font-size: 2rem;
        margin-right: 10px;
        &:hover{
            text-decoration: none;
        }
    }

    h5 {
        color: #50ACE9;
        text-align: center;
        font-size: 2rem;
        font-weight: 500;
        &:hover{
            text-decoration: underline;
            cursor: pointer;
        }
    }
`

export const RBodyL = styled.div`
    width: 40%;
    padding: 10px;

    input {
        width: 100%;
        height: 40px;
        border: 1px solid gainsboro;
        border-radius: 50px;
        margin-top: 10px;
        padding-left: 10px;
        padding-right: 10px;
        &:focus {
            border: 1px solid gainsboro; /* Đổi border khi focus vào input */
            outline: none; /* Loại bỏ outline mặc định */
        }
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
    margin: 30px 30px 0px 30px;
    font-size: 20px;
    color: #00D3D6;
    //margin-left: 200px;


`

export const RBodyLItem2 = styled.div`
    display: flex;
    width: calc(100%-20px);
    align-items: center;
    background-color: #fff;
    border-radius: 50px;
    border: 1px solid gainsboro;
    margin: 10px 30px 30px 30px;
    position: relative;
    input{
        display: block;
        width: 100%; 
        margin: 0px;
        padding: 10px; 
        padding-right: 40px;
        border-radius: 50px;
        border: none;
        &:focus{
           outline:none;
        }
    }
    input[type="password"]::-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset !important;
    -webkit-text-fill-color: black !important;
    }
    .eye-icon{
        position: absolute;
        top: 12px;
        right: 10px;
        font-size: 1.6rem;
        cursor: pointer;
        &:hover{
           color:rgb(151, 152, 153);
        }
    }


`

export const RBodyR = styled.div`
    width: 40%;
    padding: 10px;

    input, select {
        width: 100%;
        height: 40px;
        border: 1px solid gainsboro;
        border-radius: 50px;
        margin-top: 10px;
        padding-left: 10px;
        padding-right: 10px;
        &:focus{
           outline:none;
        }
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
    color: #00D3D6;

    @media (max-width: 1024px) {
       margin-top: 0px;
    }

`

