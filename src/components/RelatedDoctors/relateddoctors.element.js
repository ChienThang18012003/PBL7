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

    border: 2px solid #00A6A9; 
    border-radius: 10px; 
    overflow: hidden;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    height: auto;
    width: 250px;
    position: relative;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: inherit; 
        //background: linear-gradient(to right, #00FBFF 0%, #0C507C 100%);
        z-index: -1; 
        opacity: 0; 
        transition: opacity 0.3s ease;
   
    }

   &:hover::before {
        opacity: 1; 
    }
    
    &:hover {
        transform: translateY(-10px);
    }
  
    .info-custom{
        padding: 16px;
      
           
        
    }

    .name-doc {
        color: #111827; /
        font-size: 3rem; 
    }
        
    .speciality-doc {
        color: #4b5563;
        font-size: 1.6rem; /* Small text size */
    }
    
`

export const ImageContainer = styled.div`
    width: 100%;


    .img-custom {
        background-color: #f0f9ff;
        object-fit: cover;
        width: 100%;
        height: auto;
    }
`
