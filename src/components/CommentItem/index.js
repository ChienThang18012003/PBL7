import React from 'react';
import {
    Wrapper,
    UserAvatarSection,
    UserAvatar,
    QuestionSection,
    QuestionTitleWrapper,
    QuestionTitle,
    QuestionInfoWrapper,
    AskedTime,
    QuestionWrapper,
    Question,
} from './commentitem.element';

function CommentItem({ children }) {
    return (
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
                        <span>Thắng Hoàng</span>
                    </QuestionTitle>
                </QuestionTitleWrapper>
                <QuestionInfoWrapper>
                    <AskedTime>
                        <span>2/8/2024</span>
                    </AskedTime>
                </QuestionInfoWrapper>
                <QuestionWrapper>
                    <Question>
                        <span>
                            Thưa bác sĩ, vàng da sinh lý có cần chiếu đèn không ạ? Con em được 3 ngày tuổi, có biểu
                            hiện vàng da ở vùng mặt và cổ. Bác sĩ bảo con bị vàng da sinh lý nên không cần điều trị,
                            tình trạng này sẽ tự khỏi sau ít ngày. Tuy nhiên, đến nay đã gần 1 tuần em thấy da bé vẫn
                            vàng nên lo lắng quá. Mong bác sĩ tư vấn ạ.
                        </span>
                    </Question>
                </QuestionWrapper>
            </QuestionSection>
        </Wrapper>
    );
}

export default CommentItem;
