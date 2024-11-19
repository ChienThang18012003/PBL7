import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 680px;
    overflow: auto;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

export const UserAvatarSection = styled.div`
    height: 100%;
    overflow: auto;
    width: 80px;
`;

export const UserAvatar = styled.img`
    margin-top: 10px;
    height: 80px;
    width: 80px;
    border-radius: 50%;
`;

export const QuestionSection = styled.div`
    width: 590px;
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const QuestionTitleWrapper = styled.div`
    margin-top: 10px;
    width: 100%;
    height: 20px;
    display: flex;
    align-items: center;
`;

export const QuestionTitle = styled.h2`
    margin: 0;
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 2rem;
    height: 2rem;
    overflow: hidden;
`;

export const QuestionInfoWrapper = styled.div`
    width: 100%;
    height: 20px;
    display: flex;
    align-items: center;
`;

export const AskedTime = styled.span`
    font-size: 1.4rem;
    font-weight: 500;
    color: #757575;
    margin-left: 5px;
`;

export const QuestionWrapper = styled.div`
    width: 100%;
    overflow: auto;
    display: flex;
`;

export const Question = styled.p`
    font-weight: 500;
    font-size: 1.4rem;
    width: 100%;
    color: #b4b4b4;
    margin: 0;
    line-height: 1.8rem;
`;

export const Link = styled.a`
    font-size: 1.4rem;
    font-weight: 500;
    color: #2197e3;
    margin-right: 20px;
    text-decoration: underline;
    cursor: pointer;
`;
