// ForumItem.js
import { useState } from 'react';
import {
    Container,
    Wrapper,
    UserAvatarSection,
    UserAvatar,
    QuestionSection,
    QuestionTitleWrapper,
    QuestionTitle,
    CommentIcon,
    QuestionCount,
    QuestionInfoWrapper,
    PostBy,
    QuestionAsker,
    When,
    AskedTime,
    QuestionWrapper,
    Question,
    QuestionLinkWrapper,
    Link,
    AnswerWrapper,
    DoctorInfoWrapper,
    DoctorImageWrapper,
    DoctorImage,
    DoctorInfo,
    DoctorName,
    DoctorIntroduction,
    AnswerSection,
    DoctorAnswer,
    ViewMoreSection,
    ViewMore,
} from './forumitem.element';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ForumItem({ children }) {
    const [isAnswerVisible, setAnswerVisible] = useState(false);

    const toggleAnswerVisibility = () => {
        setAnswerVisible(!isAnswerVisible);
    };

    return (
        <Container>
            <Wrapper>
                <UserAvatarSection>
                    <UserAvatar
                        src="https://cdn.pixabay.com/photo/2021/03/20/11/57/woman-6109643_1280.jpg"
                        alt="User Avatar"
                    />
                </UserAvatarSection>

                <QuestionSection>
                    <QuestionTitleWrapper>
                        <QuestionTitle>
                            <span>Vàng da sinh lý có cần chiếu đèn không? Một số lưu ý quan trọng</span>
                        </QuestionTitle>
                        <CommentIcon>
                            <FontAwesomeIcon icon={faComment} />
                        </CommentIcon>
                        <QuestionCount>
                            <span>0</span>
                        </QuestionCount>
                    </QuestionTitleWrapper>
                    <QuestionInfoWrapper>
                        <PostBy>
                            <span>Đăng bởi</span>
                        </PostBy>
                        <QuestionAsker>
                            <span>Thắng Hoàng</span>
                        </QuestionAsker>
                        <When>
                            <span>vào lúc</span>
                        </When>
                        <AskedTime>
                            <span>2/8/2024</span>
                        </AskedTime>
                    </QuestionInfoWrapper>
                    <QuestionWrapper>
                        <Question>
                            <span>
                                Thưa bác sĩ, vàng da sinh lý có cần chiếu đèn không ạ? Con em được 3 ngày tuổi, có biểu
                                hiện vàng da ở vùng mặt và cổ...
                            </span>
                        </Question>
                    </QuestionWrapper>
                    <QuestionLinkWrapper>
                        <Link onClick={toggleAnswerVisibility}>
                            Xem câu trả lời
                        </Link>
                    </QuestionLinkWrapper>
                </QuestionSection>
            </Wrapper>

            {isAnswerVisible && (
                <AnswerWrapper>
                    <DoctorInfoWrapper>
                        <DoctorImageWrapper>
                            <DoctorImage
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSslrJK5VdKIfZ0W5FXwoEqzBQ6XiGPsTEdPQ&s"
                                alt="Doctor"
                            />
                        </DoctorImageWrapper>
                        <DoctorInfo>
                            <DoctorName>
                                <span>BS. VÕ MINH TUẤN</span>
                            </DoctorName>
                            <DoctorIntroduction>
                                <span>Bác sĩ ngoại cột sống</span>
                            </DoctorIntroduction>
                            <DoctorIntroduction>
                                <span>Trung tâm chấn thương chỉnh hình</span>
                            </DoctorIntroduction>
                            <DoctorIntroduction>
                                <span>Chi nhánh TP.Hồ Chí Minh</span>
                            </DoctorIntroduction>
                        </DoctorInfo>
                    </DoctorInfoWrapper>
                    <AnswerSection>
                        <DoctorAnswer>
                            <span>
                                Chào chị! Trượt đốt sống L4-L5 độ 2, đây là tình trạng nghiêm trọng có thể gây ra nhiều
                                triệu chứng...
                            </span>
                        </DoctorAnswer>
                    </AnswerSection>
                    <ViewMoreSection>
                        <ViewMore>Xem thêm</ViewMore>
                    </ViewMoreSection>
                </AnswerWrapper>
            )}
        </Container>
    );
}

export default ForumItem;
