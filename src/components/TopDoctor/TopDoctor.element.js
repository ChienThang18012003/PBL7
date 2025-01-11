import styled from "styled-components";

export const RelatedContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #1a1a1a; 

    
`

export const RelateDisplay = styled.div`
    width: 100%;
    //display: grid;
    //grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    margin: 0;
    display: flex;
    justify-content: space-around;
    gap: 1rem;
    
    @media (min-width: 640px) {

        padding-left: 0;
        padding-right: 0;

    }


`
export const RelatedCard = styled.div`
    margin-top : 40px;
    margin-bottom: 40px;
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
        padding: 10px;
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
        padding: 10px;
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

    .name-doc {
        color: #111827; 
        font-size: 1.8rem; /* Small text size */
    }
        
    .speciality-doc {
        color: rgb(5, 85, 139);
        font-size: 1.6rem; /* Small text size */
        margin-left:  16px;
        font-weight: 500;
    }

    .total-app {
        color: rgb(243, 191, 36);
        font-size: 1.6rem; /* Small text size */
        margin-left:  8px;
        font-weight: 700;
    }

    .total-app-wrapper {
        height: 50px;
        width: 100%;
        background-color: rgb(194, 226, 248);
        display: flex;
        align-items: center;
    }

    .button-wrapper {
        height: 60px;
        width: 100%;
        padding-bottom: 30px;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom-left-radius: 0.75rem;
        border-bottom-right-radius: 0.75rem;
    }

    .book-button{
        background-color: #00D3D6;
        color: white;
        font-weight: 500;
        font-size: 2rem;
        padding: 10px 16px;
        border-radius: 10px;
        border: none;
        cursor: pointer;
        transition: all ease 0.8s;

        &:hover{
        background-color: #fff;
        border: 2px solid #00D3D6;
        color: #00D3D6;
        transform: scale(1.1);
        }
    }
        
`

export const ImageContainer = styled.div`
    width: 100%;
    height: 200px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-left-radius: 0.75rem;
    border-top-right-radius: 0.75rem;

    .circle-container{
        border-radius: 50%;
        background-color:rgb(194, 226, 248);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px;
    }

    .img-custom {
        border-radius: 50%;
        background-color:#fff;
        object-fit: cover;
        height: 150px;
        width: 150px;
    }
`
