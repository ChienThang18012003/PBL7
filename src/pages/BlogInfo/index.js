import { faUser, faCalendar } from '@fortawesome/free-regular-svg-icons';
import MiniBlogItem from '../../components/MiniBlogItem';
import PageTitle from '../../components/PageTitle';
import Button from '../../components/Button';
import CommentItem from '../../components/CommentItem';
import {
    BlogContentContainer,
    BlogContentWrapper,
    BlogImage,
    BlogInfoWrapper,
    BlogOwner,
    BlogPostDate,
    BlogTitle,
    BlogWrapper,
    CommentInput,
    CommentSection,
    CommentTitle,
    CommentTitleWrapper,
    Icon,
    ListBlogWrapper,
    Separator,
    UserAvatar,
    Wrapper
} from "./bloginfo.element";


function BlogInfo() {
    const blogs = {
        description: `Sốt là tình trạng nhiệt độ cơ thể tăng cao...`,
        image: 'https://tamanhhospital.vn/wp-content/uploads/2021/03/sanh-cho-rong-rai-f.jpg',
        content: `TS.BS Lâm Văn Hoàng – Giám đốc Trung tâm Kiểm soát cân nặng...`,
    };

    const renderDescription = () => {
        return blogs.description.split('\n').map((line, index) => (
            <h4 key={index}>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;{line.trim()}</span>
            </h4>
        ));
    };

    const renderContent = () => {
        return blogs.content.split('\n').map((line, index) => (
            <h4 key={index}>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;{line.trim()}</span>
            </h4>
        ));
    };

    return (
        <Wrapper>
            <PageTitle>TIN TỨC</PageTitle>
            <BlogContentWrapper>
                <BlogWrapper>
                    <BlogTitle>
                        <span>Sau chuyển phôi bị sốt có sao không? Bao nhiêu độ là nguy hiểm?</span>
                    </BlogTitle>
                    <BlogInfoWrapper>
                        <Icon icon={faUser} />
                        <BlogOwner>Thắng Hoàng</BlogOwner>
                        <Icon icon={faCalendar} style={{ marginLeft: '100px' }} />
                        <BlogPostDate>01-04-2024</BlogPostDate>
                    </BlogInfoWrapper>
                    <Separator />
                    <BlogContentContainer>
                        {renderDescription()}
                        <BlogImage src={blogs.image} alt="Blog Image" />
                        {renderContent()}
                    </BlogContentContainer>
                    <CommentTitleWrapper>
                        <CommentTitle>Bình luận</CommentTitle>
                    </CommentTitleWrapper>
                    <Separator />
                    <CommentSection>
                        <UserAvatar src="https://cdn.pixabay.com/photo/2021/03/20/11/57/woman-6109643_1280.jpg" alt="User Avatar" />
                        <CommentInput placeholder="Viết bình luận..." rows="4" />
                        <Button submitThree>Gửi</Button>
                    </CommentSection>
                    <CommentItem />
                    <CommentItem />
                    <CommentItem />
                    <CommentItem />
                    <CommentItem />
                </BlogWrapper>
                <ListBlogWrapper>
                    <h4>BÀI VIẾT MỚI</h4>
                    <Separator />
                    <MiniBlogItem />
                    <MiniBlogItem />
                    <MiniBlogItem />
                    <MiniBlogItem />
                    <MiniBlogItem />
                </ListBlogWrapper>
            </BlogContentWrapper>
        </Wrapper>
    );
}

export default BlogInfo;
