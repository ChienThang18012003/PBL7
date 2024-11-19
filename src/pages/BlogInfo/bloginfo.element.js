import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    padding-bottom: 20px;
    background-color: #f0f2f1;
    margin-top: 110px;
`;

export const BlogContentWrapper = styled.div`
    width: 80%;
    display: flex;
    justify-content: space-between;
`;

export const BlogWrapper = styled.div`
    width: 680px;
    height: 100%;
`;

export const ListBlogWrapper = styled.div`
    width: 480px;
    height: 100%;
    overflow: auto;
`;

export const BlogTitle = styled.h4`
    font-weight: 500;
    font-size: 3rem;
    margin: 10px 0;
    color: #005a5c;
`;

export const BlogInfoWrapper = styled.div`
    display: flex;
    align-items: center;
    height: 40px;
`;

export const BlogOwner = styled.h4`
    font-size: 1.4rem;
    font-weight: 700;
    color: #2197e3;
    margin-left: 2px;
`;

export const BlogPostDate = styled.h4`
    font-size: 1.4rem;
    font-weight: 700;
    margin-left: 2px;
`;

export const Separator = styled.hr`
    border: none;
    height: 2px;
    background-color: #333;
    width: 100%;
`;

export const BlogContentContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const BlogImage = styled.img`
    width: 100%;
    height: 400px;
    margin: 10px 0;
`;

export const CommentTitleWrapper = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
`;

export const CommentTitle = styled.h4`
    font-weight: 700;
    font-size: 2rem;
    margin: 10px 0;
`;

export const CommentSection = styled.div`
    width: 100%;
    height: 150px;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
`;

export const UserAvatar = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
`;

export const CommentInput = styled.textarea`
    width: 480px;
    height: 100%;
    border-radius: 10px;
    font-size: 1.4rem;
    border: 0;
    &:focus {
        outline: none;
    }
`;

export const Icon = styled(FontAwesomeIcon)`
    font-size: 1.4rem;
    width: 24px;
`;
