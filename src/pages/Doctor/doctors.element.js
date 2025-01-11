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

    .image-background {
        border-top-left-radius: 0.75rem;
        border-top-right-radius: 0.75rem;
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
    }
`
export const DoctorsRight = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
    row-gap: 24px;

    @property --angle{
        syntax: "<angle>";
        initial-value: 0deg;
        inherits: false;
    }

    .card {
        border-radius: 0.75rem; 
        cursor: pointer;
        transition: all 0.5s ease; 
        position: relative;
        background-color: #fff;

        &:hover::before {
            display: block; 
        }

        &:hover::before {
            animation: 3s spin linear infinite;
        }
     
        &:hover::after {
            animation: 3s spin linear infinite;
        }
    }
    
    .card::after{
        content: '';
        position: absolute;
        height: 100%;
        width: 100%;
        background-image: conic-gradient(from var(--angle),  #0C507C, #00FBFF , #0C507C);
        top: 50%;
        left: 50%;
        translate: -50% -50%;
        z-index: -1;
        padding: 3px;
        border-radius: 0.75rem; 
    }

    .card::before{
        content: '';
        position: absolute;
        height: 100%;
        width: 100%;
        background-image: conic-gradient(from var(--angle),  #0C507C, #00FBFF , #0C507C);
        top: 50%;
        left: 50%;
        translate: -50% -50%;
        z-index: -1;
        padding: 3px;
        border-radius: 0.75rem; 
        display: none;
        filter: blur(1.5rem);
        opacity: 0.5;
    }

    @keyframes spin{
       from{
        --angle: 0deg;
       }
       to{
        --angle: 360deg;
       }
    }

    .content {
        padding: 16px;
    }

    .status {
        display: flex;
        align-items: center;
        font-size: 1.4rem;
        margin-bottom: 8px;
        margin-top: 8px;
        gap: 8px;
        text-align: center;
    }

    .speciality-icon{
        font-size: 1.4rem;
        color: #4B5563; 
    }
    
    .location-icon{
        font-size: 1.4rem;
        margin-left: 2px;
        margin-right: 2px;
        color: #4B5563; 
    }

    .dot {
        width: 0.5rem;
        height: 0.5rem;
        background-color: #48BB78;
        border-radius: 50%;
    }
    .name-style {
        color: #1F2937;         
        font-size: 1.8rem;    
        font-weight: 500;       
        line-height: 2rem;
        height: 2rem;
        overflow: hidden;
        display: block;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
    }
    .speciality-style {
        color: #4B5563;        
        font-size: 1.4rem;  
        line-height: 2rem;
        height: 2rem;
        overflow: hidden;
        text-align: left;
        display: block;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
    }





`
