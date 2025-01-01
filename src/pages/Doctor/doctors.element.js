import styled from "styled-components";
import {Container} from "../../globalStyles";

export const DoctorsLayout = styled(Container)`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    @media (min-width: 640px) {
        flex-direction: row;
    }
`
export const DoctorsLeft = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    font-size: 1.4rem; 
    padding-left: 12px;
    color: #4B5563;

    ${({showFilter}) => (showFilter ? 'display: flex;' : 'display: none;')};

    .speciality-button {
        width: 200px;
        padding: 0.375rem 4rem 0.375rem 0.75rem;
        border: 1px solid #D1D5DB;
        border-radius: 0.375rem;
        transition: all 0.2s ease;
        cursor: pointer;
        color: inherit;
    }

    .speciality-button.selected {
        background-color: #E0E7FF;
        color: black;
    }

    @media (min-width: 640px) {
        display: flex;
    }
`
export const ImageContainer = styled.div` 
    width: 100%;
    height: 300px;
`
export const DoctorsRight = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
    row-gap: 24px;

    .card {
        border: 1px solid #BFDBFE;
        border-radius: 0.75rem; 
        overflow: hidden;
        cursor: pointer;
        transition: all 0.5s ease; 
    }

    .card:hover {
        transform: translateY(-10px); 
    }

    .image-background {
        background-color: #EFF6FF;
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
    }

    .content {
        padding: 16px;
    }

    .status {
        display: flex;
        align-items: center;
        font-size: 1.4rem;
        margin-bottom: 8px;
        gap: 8px;
        color: #48BB78;
    }

    .dot {
        width: 0.5rem;
        height: 0.5rem;
        background-color: #48BB78;
        border-radius: 50%;
    }
    .name-style {
        color: #1F2937;         
        font-size: 1.4rem;    
        font-weight: 500;       
    }
    .speciality-style {
        color: #4B5563;        
        font-size: 1.2rem;   
        margin-top: 8px;
    }





`
