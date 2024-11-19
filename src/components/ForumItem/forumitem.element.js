import styled from 'styled-components';

export const Container = styled.div`
    width: 1180px;
    display: block;
    overflow: auto;
    position: relative;

    & + & {
        margin-top: 10px;
    }
`;

export const AnswerWrapper = styled.div`
    width: 100%;
    height: 270px;
    background-color: #e3e5e4;
    position: relative;
    display: block;
    overflow: auto;
    top: -10px;
    z-index: 2;
`;

export const Wrapper = styled.div`
    width: 100%;
    height: 130px;
    background-color: #fff;
    position: relative;
    border-radius: 10px;
    border: 1px solid;
    display: flex;
    overflow: hidden;
    z-index: 10;
`;

export const Link = styled.span`
    font-size: 1.4rem;
    font-weight: 500;
    color: #2197e3;
    margin-right: 20px;
    text-decoration: underline;
    cursor: pointer;
`;

export const UserAvatarSection = styled.div`
    height: 100%;
    width: 80px;
    display: flex;
    justify-content: center;
`;

export const UserAvatar = styled.img`
    margin-top: 10px;
    height: 60px;
    width: 60px;
    border-radius: 50%;
`;

export const QuestionSection = styled.div`
    width: 1100px;
    height: 100%;
    flex-direction: column;
    display: flex;
`;

export const QuestionTitleWrapper = styled.div`
    margin-top: 10px;
    width: 100%;
    height: 15%;
    display: flex;
    align-items: center;
`;

export const QuestionTitle = styled.h4`
    margin: 0;
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 2rem;
    height: 2rem;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    flex: 1;
`;

export const CommentIcon = styled.span`
    font-size: 1.6rem;
    font-weight: 500;
    color: #757575;
    margin: 10px;
`;

export const QuestionCount = styled.span`
    margin-right: 20px;
    font-size: 1.6rem;
    font-weight: 500;
    color: #757575;
`;

export const QuestionInfoWrapper = styled.div`
    width: 100%;
    height: 15%;
    display: flex;
    align-items: center;
`;

export const PostBy = styled.span`
    font-size: 1.4rem;
    font-weight: 500;
    color: #757575;
`;

export const When = styled.span`
    font-size: 1.4rem;
    font-weight: 500;
    color: #757575;
    margin-left: 5px;
`;

export const AskedTime = styled.span`
    font-size: 1.4rem;
    font-weight: 500;
    color: #757575;
    margin-left: 5px;
`;

export const QuestionAsker = styled.span`
    font-size: 1.4rem;
    font-weight: 700;
    color: #2197e3;
    margin-left: 5px;
`;

export const QuestionWrapper = styled.div`
    width: 100%;
    height: 30%;
    display: flex;
`;

export const Question = styled.p`
    font-weight: 500;
    font-size: 1.4rem;
    width: 1080px;
    color: #b4b4b4;
    margin: 10px 0px;
    line-height: 1.8rem;
    height: 3.6rem;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
`;

export const QuestionLinkWrapper = styled.div`
    width: 100%;
    height: 20%;
    display: flex;
    margin-top: 10px;
    align-items: center;
    justify-content: flex-end;
`;

export const DoctorInfoWrapper = styled.div`
    height: 180px;
    width: 100%;
    display: flex;
`;

export const DoctorImageWrapper = styled.div`
    width: 200px;
    height: 180px;
`;

export const DoctorImage = styled.img`
    width: 140px;
    height: 140px;
    margin-top: 30px;
    margin-left: 20px;
    border-radius: 50%;
`;

export const DoctorInfo = styled.div`
    width: 100%;
    height: 140px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin-top: 40px;
`;

export const DoctorName = styled.h4`
    margin: 0;
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 2rem;
    height: 2rem;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    flex: 1;
`;

export const DoctorIntroduction = styled.p`
    font-weight: 500;
    font-size: 1.4rem;
    width: 100%;
    color: #b4b4b4;
    margin: 10px 0px;
    line-height: 1.8rem;
`;

export const AnswerSection = styled.div`
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
`;

export const DoctorAnswer = styled.p`
    font-weight: 500;
    font-size: 1.4rem;
    width: 98%;
    color: #b4b4b4;
    margin: 0px 0px;
    line-height: 1.8rem;
    height: 5.4rem;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
`;

export const ViewMoreSection = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

export const ViewMore = styled.span`
    text-decoration: underline;
    cursor: pointer;
    font-size: 1.4rem;
    font-weight: 500;
    margin-right: 20px;
`;
