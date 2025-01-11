import styled from "styled-components";

export const RelatedContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 1rem; 
    margin-bottom: 4rem;
    color: #1a1a1a; 
    
    @media (min-width: 768px) {
        margin-left: 2.5rem; 
        margin-right: 2.5rem;
    }
`

export const RelateDisplay = styled.div`
    width: 100%;
    //display: grid;
    //grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    
    display: flex;
    justify-content: space-around;
    gap: 1rem;
    padding: 20px 0 0 0;
    
    @media (min-width: 640px) {

        padding-left: 0;
        padding-right: 0;

    }


`
export const RelatedCard = styled.div` 
    border-radius: 10px; 
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    height: auto;
    width: 250px;
    position: relative;

    @property --angle{
        syntax: "<angle>";
        initial-value: 0deg;
        inherits: false;
    }

    &:hover::before {
            display: block; 
        }

        &:hover::before {
            animation: 3s spin linear infinite;
        }
     
        &:hover::after {
            animation: 3s spin linear infinite;
        }
    
    &::after{
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

    &::before{
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
  
    .info-custom{
        padding: 16px;
        background-color: #fff;
        border-bottom-left-radius: 0.75rem;
        border-bottom-right-radius: 0.75rem;
    }

    .name-doc {
        color: #111827; 
        font-size: 1.8rem; /* Small text size */
    }
        
    .speciality-doc {
        color: #4b5563;
        font-size: 1.6rem; /* Small text size */
    }
    
`

export const ImageContainer = styled.div`
    width: 100%;
    height: 340px;


    .img-custom {
        background-color: #f0f9ff;
        width: 100%;
        object-fit: cover;
        height: 340px;
        border-top-left-radius: 0.75rem;
        border-top-right-radius: 0.75rem;
    }
        
`
