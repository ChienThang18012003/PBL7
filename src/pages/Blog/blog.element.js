import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    height: 1200px;
    background-color: #f0f2f1;
    margin-top: 110px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const BlogItems = styled.div`
    width: 80%;
    height: 860px;
    display: flex;
    flex-shrink: 0;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
`;

export const Pagination = styled.div`
    width: 100%;
    height: 100px;
`;
export const PageTitleContainer = styled.div`
    width: 100%;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f2f1;
`;

export const PageTitle = styled.h1`
    position: relative;
    display: inline-block;
    padding-bottom: 5px;
    margin-top: 20px;
    font-weight: 500;
    font-size: 2.4rem;
    color: #2197e3;

    &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        height: 4px;
        background-color: #5d5d5d;
        width: calc(100% + 50%);
        margin-left: -25%;
    }
`;
