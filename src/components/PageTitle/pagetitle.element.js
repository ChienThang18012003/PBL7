import styled from 'styled-components';

export const PageTitleContainer = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f2f1;
`;

export const PageTitleContent = styled.h1`
    position: relative;
    display: inline-block;
    padding-bottom: 5px;
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
