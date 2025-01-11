import styled from "styled-components";
import {Container} from "../../globalStyles";

export const DocInfoLayout = styled(Container)`
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 20px;
    margin-top: 40px;

    ${Container}
    
`

export const DocInfoHeader = styled.p`
    font-size: 25px;
    color: #2197E3;
    text-align: center;
    margin: 50px auto;


`

export const DocInfoLeft = styled.div`

    width: 250px;
    .image-background {
        width: 250px;
        height: 300px;
        border-radius: 0.5rem;
    }

`
export const DocInfoRight = styled.div`
    flex: 1;
    height: 300px;
    border: 1px solid #cbd5e1;
    justify-content: space-between;
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    padding: 2rem 2rem; 
    margin: -80px 0.5rem 0;
    @media (min-width: 0px) {
        margin-left: 0;
        margin-right: 0;
        margin-top: 0;
    }

`

export const DocName = styled.p`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 2.4rem;
    font-weight: 500;
    color: #111827;
`

export const DocSD = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 1.8rem; 
    margin-top: 0.25rem; 
    color: #4B5563;
    .doc-experience {
        padding: 0.125rem 0.5rem; 
        border: 1px solid #000; 
        font-size: 0.875rem; 
        border-radius: 9999px; 
    }

`
export const DocBookButton = styled.button`
    background-color: #00D3D6;
    color: white;
    font-weight: 500;
    font-size: 2rem;
    padding: 10px 16px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    margin-top: auto; // day the p len gan voi docname
    align-self: flex-start;
    transition: all ease 0.8s;

    &:hover{
       background-color: #fff;
       border: 2px solid #00D3D6;
       color: #00D3D6;
       transform: scale(1.1);
    }

`

export const DoctorInformation = styled.div`
    display: flex;
    margin-bottom: 10px;
    width: 80%;
    margin-left: 10%;
    gap: 16px;

    justify-content: space-around;
    flex-direction: column;

    @media (max-width: 740px) {
       flex-direction: column;
    }
    
`
export const DoctorInformationItem = styled.div`
    padding: 20px 20px 50px;
    margin-top: 16px;
    //flex-basis: 30%;
    flex: 1;
    background-color: #00D3D6;
    border-radius: 10px;
    p{
        color: white;
        margin-top: 10px;
        font-size: 1.8rem;
    }
`
export const DocHeader = styled.p`
    font-size: 2rem;
    color: white;
`
export const Underline = styled.div`
    border-top: 2px solid white;
    width: 100%;
    margin-top: 5px;
`

export const DoctorRelate = styled(Container)`
    display: flex;
    margin-bottom: 10px;
    flex-direction: column;
    gap: 16px;
    justify-content: center;
    ${Container}
`
export const HeaderUnderline = styled.div`
    border-top: 4px solid #5D5D5D;
    width: 100%;
    margin-top: 5px;
`
export const RelatedDoctorItem = styled.div`
    flex: 1;
`
