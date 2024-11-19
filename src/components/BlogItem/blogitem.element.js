import styled from 'styled-components';

export const BlogWrapper = styled.a`
    height: 420px;
    width: 49%;
    display: block;
    background-color: #fff;
    cursor: pointer;
`;

export const BlogImage = styled.img`
    height: 278px;
    width: 100%;
`;

export const BlogTitle = styled.h4`
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

export const BlogDescription = styled.h4`
    font-weight: 500;
    font-size: 1.4rem;
    color: #b4b4b4;
    margin: 10px;
    line-height: 1.8rem;
    height: 3.6rem;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
`;
