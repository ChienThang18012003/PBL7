import React from "react";
import HomePic from "../../assets/assets_fe/home.webp"
import {
    BodyPic,
    Info,
    InfoContainer,
    InfoItem,
    InfoPic,
    InfoSection, NewButton, NewItem1, NewItem2, NewPicAndContent, NewPicItem1, NewPicItem2,
    News, NewsButtonContainer,
    NewsHeader, NewsSection, NewsTitleAndContent
} from "./home.element";
import {assets} from "../../assets/assets_fe/assets";

const Home = () => {
    return (
        <>
            <BodyPic>
                <img src={HomePic} className="pic" alt="picture"/>
            </BodyPic>
            <Info>
                <InfoContainer>
                    <InfoSection>
                        <InfoItem>
                            <InfoPic>
                                <img src={assets.Pic2} alt="1" className="pic"/>
                                <p className="title">TƯ VẤN KHÁM BỆNH</p>
                                <p>Liên hệ với đội ngũ tư vấn viên của chúng tôi để nhận phản hồi về tình trạng sức khỏe
                                    của bạn</p>
                            </InfoPic>
                        </InfoItem>

                        <InfoItem>
                            <InfoPic>
                                <img src={assets.Pic1} alt="1" className="pic"/>
                                <p className="title">TRA CỨU KẾT QUẢ</p>
                                <p>Tra cứu kết quả xét nghiệm bệnh của bạn</p>
                            </InfoPic>
                        </InfoItem>

                        <InfoItem>
                            <InfoPic>
                                <img src={assets.Pic4} alt="1" className="pic"/>
                                <p className="title">CHUYÊN GIA - BÁC SĨ</p>
                                <p>Tìm hiểu thông tin chi tiết về đội ngũ chuyên gia - bác sĩ</p>
                            </InfoPic>
                        </InfoItem>

                        <InfoItem>
                            <InfoPic>
                                <img src={assets.Pic3} alt="1" className="pic"/>
                                <p className="title">BẢNG GIÁ</p>
                                <p>Tra cứu giá thành điều trị</p>
                            </InfoPic>
                        </InfoItem>
                    </InfoSection>
                </InfoContainer>
            </Info>

            <News>
                <NewsHeader>
                    TIN TỨC
                    <div className="lower-header">
                        Theo dõi các tin tức cập nhật mới nhất !!
                    </div>
                </NewsHeader>

                <NewsSection>
                    <NewItem1>
                        <NewPicItem1>
                            <img src={assets.NewsPic1} alt="pic1" className="pic"/>
                        </NewPicItem1>
                        <p className="title">Khai trương phòng khám Đa khoa tại quận 7</p>
                        <p className="content1"> Ngày 23/8/2024, hệ thống bệnh viện Đa khoa chính thức đưa vào hoạt động phòng khám Đa khoa
                            Quận 7 chuyên sâu, hiện đại, góp phân khám...</p>
                    </NewItem1>

                    <NewItem2>
                        <NewPicAndContent>
                            <NewPicItem2>
                                <img src={assets.NewsPic1} alt="pic" className="pic2"/>
                            </NewPicItem2>
                            <NewsTitleAndContent>
                                <p className="title">Suy tim tâm trương là gì? Nguyên nhân, dấu hiệu, chần đoán, điều
                                    trị </p>
                                <p className="content"> Suy tim tâm trương là tình trạng bị suy giảm khả năng giãn nở.
                                    Tỷ lệ bệnh nhân bị suy tim....</p>

                            </NewsTitleAndContent>
                        </NewPicAndContent>

                        <NewPicAndContent>
                            <NewPicItem2>
                                <img src={assets.NewsPic1} alt="pic" className="pic2"/>
                            </NewPicItem2>
                            <NewsTitleAndContent>
                                <p className="title">
                                    Sốt xuất huyết làm gì cho nhanh khỏi? Những sai lầm thường gặp
                                </p>
                                <p className="content">
                                    Sốt xuất huyết làm gì cho nhanh khỏi là vấn đề người bệnh cần quan
                                    tam. Luu y quan trong can tuan...
                                </p>
                            </NewsTitleAndContent>
                        </NewPicAndContent>

                        <NewPicAndContent>
                            <NewPicItem2>
                                <img src={assets.NewsPic1} alt="pic" className="pic2"/>
                            </NewPicItem2>
                            <NewsTitleAndContent>
                                <p className="title">Công nghệ IPL là gì? Có công dụng ra sao? Ưu và nhược điểm.</p>
                                <p className="content">Hiện nay, với nhu cầu làm đẹp ngày càng cao, công nghệ kỹ thuật
                                    như công nghệ laser và các liệu....</p>
                            </NewsTitleAndContent>
                        </NewPicAndContent>
                    </NewItem2>
                </NewsSection>

                <NewsButtonContainer>
                    <NewButton>
                        XEM TẤT CẢ TIN TỨC
                    </NewButton>
                </NewsButtonContainer>

            </News>

        </>
    )
}

export default Home;
