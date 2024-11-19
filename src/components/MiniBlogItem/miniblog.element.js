import styled from 'styled-components';

export const BlogWrapper = styled.div`
    height: 120px;
    width: 100%;
    background-color: #fff;
    margin-top: 20px;
    display: flex;
    cursor: pointer;
    justify-content: space-between;
`;

export const BlogContent = styled.div`
    width: 290px;
    height: 100%;
`;

export const BlogImage = styled.img`
    height: 100%;
    width: 180px;
`;

export const BlogTitle = styled.h3`
    font-weight: 500;
    font-size: 1.6rem;
    margin: 10px;
    line-height: 2rem;
    height: 4rem;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
`;

export const BlogDescription = styled.p`
    font-weight: 500;
    font-size: 1.4rem;
    color: #b4b4b4;
    margin: 10px;
    line-height: 1.8rem;
    height: 5.4rem;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
`;
