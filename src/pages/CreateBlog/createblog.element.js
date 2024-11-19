import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f0f2f1;
    margin-top: 110px;
    padding-bottom: 50px;
`;

export const BlogFormContainer = styled.div`
    width: 80%;
    height: 800px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const BlogForm = styled.div`
    width: 780px;
    height: 100%;
    background-color: #fff;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`;

export const ImageContainer = styled.div`
    width: 740px;
    height: 40%;
    background-color: #2197e3;
    border-radius: 20px;
    overflow: hidden; /* To ensure child images fit well */
`;

export const BlogImage = styled.img`
    width: 740px;
    height: 100%;
    border-radius: 20px;
    object-fit: cover; /* Ensures the image covers the container */
`;

export const InputFileContainer = styled.div`
    width: 740px;
    height: 6%;
    border: 1px solid;
    border-radius: 10px;
    display: flex;
    align-items: center;
`;

export const ImagePicker = styled.input`
    margin-left: 20px;
`;

export const BlogTitle = styled.input`
    width: 740px;
    height: 6%;
    border-radius: 10px;
    border: 1px solid;
    font-size: 1.4rem;
    padding: 5px; /* Add padding for better text visibility */
`;

export const BlogDescription = styled.textarea`
    width: 740px;
    height: 12%;
    border-radius: 10px;
    border: 1px solid;
    font-size: 1.4rem;
    padding: 5px; /* Add padding for better text visibility */
`;

export const BlogContent = styled.textarea`
    width: 740px;
    height: 12%;
    border-radius: 10px;
    border: 1px solid;
    font-size: 1.4rem;
    padding: 5px; /* Add padding for better text visibility */
`;
