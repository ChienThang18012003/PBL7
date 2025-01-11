import styled from "styled-components";
import {Container} from "../../globalStyles";

export const SpecialitiesLayout = styled.div`
    overflow: visible;
    padding-bottom: 20px;
    margin-top: 0px;
`
export const SpecialitiesContainer = styled(Container)`
    display: flex;
    margin-bottom: 30px;
    flex-direction: column;
    gap: 50px;
    overflow: visible;
    margin-top: 0px;
    ${Container}
    
`

export const SpecialitiesImage = styled.p`
    font-size: 25px;
    color: #2197E3;
    text-align: center;
    width: 100%;
    padding: 0px;
    object-fit: contain;
    img{
       width: 100%;
       height: 400px;
       margin: 0px;
    }
`

export const SpecialitiesHeader = styled.p`
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
export const SearchBar = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    
    //::placeholder{
    //    text-indent: 35px;  // move placehoder
    //}

    input {
        height: 40px;
        width: 40%;
        color: black;
        border-radius: 50px;
        font-size: 15px;
        border: 2px solid #0B5E87;
        padding-left: 40px;
        box-sizing: border-box;
    }
    img {
        position: absolute;
        width: 20px;
        height: 20px;
        left: 31%;
        top:10px
    }
`

export const SpecialitiesContent = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 35px; 
    justify-content: center;
    cursor: pointer;
    overflow: visible;

    .card-spec{
        width: 255px;
        height: 220px;
        display: flex;
        justify-content: center;
        border-radius: 20px 20px 20px 20px;
        background: linear-gradient(to bottom, #0B5E87 , #00A6A9 );
        transition: all 0.5s ease;
       
    }
    
    .content{
        display: flex;
        flex-direction: column;
        align-items: center;
        align-content: center;
    }

    .card-spec:hover {
        transform: translateY(-10px);
        box-shadow: 0 0 20px #9e9e9e;
    }
    .speciality-img{
        width: 70px; 
        height: 70px; 
        object-fit: contain; 
        transition: all ease 0.8s;
        &:hover{
            transform: scale(1.2);
        }

    }
    .image-wrapper{
        margin-top: 20px;
        width: 120px; 
        height: 120px; 
        border-radius: 50%; 
        border: 5px solid #2197E3;
        background-color: #fff;
        display: flex;
        align-items: center;
        overflow: hidden;
        justify-content: center;
        transition: all ease 0.8s;
        &:hover{
            transform: scale(1.2);
        }
    }
    .name-style{
        text-transform: uppercase;
        font-size: 12px;
        font-weight: 700;
        text-align: center;
        margin-top: 20px;
        margin-left: 5px;
        margin-right: 5px;
        color: white;
        cursor: pointer;
    }

    @media (max-width: 740px) {
        justify-content: center;
    }
    
`

export const SpecialitiesCard = styled.div`
    
`
export const PaginationContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px; 
`;


export const PaginationButton = styled.button`
    padding: 0.25rem 0.5rem;
    border: 1px solid #0B5E87; 
    background-color: transparent;
    width: 90px;
    border-radius: 5px;
    text-transform: uppercase;


    &:disabled {
        opacity: 0.3;
    }
`;

export const PaginationInfo = styled.span`
    display: flex;
    align-items: center;
    gap: 0.25rem;
`;

export const PageInput = styled.input`
    border: 1px solid #D1D5DB;
    padding: 0.25rem;
    border-radius: 0.25rem;
    width: 4rem;
    background-color: transparent;
`;

export const PageSelect = styled.select`
    padding: 0.5rem;
    background-color: transparent;
`;

