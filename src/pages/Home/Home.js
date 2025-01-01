import React, { useEffect } from "react";
import HomePic from "../../assets/assets_fe/home.webp"
import {
    BodyPic,
    Info,
    InfoContainer,
    InfoItem,
    InfoPic,
    InfoSection, NewButton, NewItem1, NewItem2, NewPicItem1,
    News, NewsButtonContainer,
    NewsHeader, NewsSection, NewsHeaderWrapper, InfoWrapper
} from "./home.element";
import {assets} from "../../assets/assets_fe/assets";
import {useNavigate} from "react-router-dom";
import useArticles from "../../hook/useArticles";
import MiniBlogItem from "../../components/MiniBlogItem";
import LoadingAnimation from "../../components/LoadingAnimation";
import Image from "../../components/Image";


const Home = () => {
    const [
        ,
        firstArticle,
        fourArticles,
        loading,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        getAllArticles
    ] = useArticles();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArticlesPeriodically = async () => {
            const articles = await getAllArticles();
        };

        const intervalId = setInterval(() => {
            fetchArticlesPeriodically();
        }, 5000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    if (loading) return (
        <LoadingAnimation></LoadingAnimation>
    )

    return (
        <>
            <BodyPic>
                <img src={HomePic} className="pic" alt="picture"/>
            </BodyPic>
            <Info>
                <InfoContainer>
                    <InfoSection>
                        <InfoWrapper onClick={()=>{navigate('/forum')}}>
                            <InfoPic>
                                <img src={assets.Pic2} alt="1" className="pic"/>
                            </InfoPic>
                            <InfoItem>
                                <p className="title">TƯ VẤN KHÁM BỆNH</p>
                                <p>Liên hệ với đội ngũ tư vấn viên của chúng tôi để nhận phản hồi về tình trạng sức khỏe
                                        của bạn</p>
                            </InfoItem>
                        </InfoWrapper>

                        <InfoWrapper onClick={()=>{navigate('/specialities')}}>
                            <InfoPic>
                                <img src={assets.Pic6} alt="1" className="pic"/>
                            </InfoPic>
                            <InfoItem>
                                <p className="title">CHUYÊN KHOA</p>
                                <p>Tra cứu dịch vụ khám bệnh của từng chuyên khoa</p>
                            </InfoItem>
                        </InfoWrapper>

                        <InfoWrapper onClick={()=>{navigate('/doctors')}}>
                            <InfoPic>
                                <img src={assets.Pic4} alt="1" className="pic"/>
                            </InfoPic>
                            <InfoItem>
                                <p className="title">CHUYÊN GIA - BÁC SĨ</p>
                                <p>Tìm hiểu thông tin chi tiết về đội ngũ chuyên gia - bác sĩ</p>
                            </InfoItem>
                        </InfoWrapper>

                        <InfoWrapper onClick={()=>{navigate('/appointment')}}>
                            <InfoPic>
                                <img src={assets.Pic5} alt="1" className="pic"/>
                            </InfoPic>
                            <InfoItem>
                                <p className="title">ĐẶT LỊCH KHÁM</p>
                                <p>Đặt lịch khám trực tuyến với các chuyên gia bác sĩ của chúng tôi</p>
                            </InfoItem>
                        </InfoWrapper>

                    </InfoSection>
                </InfoContainer>
            </Info>

            <News>
                <NewsHeaderWrapper>
                    <NewsHeader>
                        TIN TỨC
                        <div className="lower-header">
                            Theo dõi các tin tức cập nhật mới nhất !!
                        </div>
                    </NewsHeader>
    
                </NewsHeaderWrapper>
                <NewsSection>
                    {
                        firstArticle && (
                            <NewItem1 onClick={()=>{navigate(`/bloginfo/${firstArticle._id}`)}}>
                                <NewPicItem1>
                                    <Image src={firstArticle?.article_image} fallback={assets.ArticleImage} alt="pic1" className="pic"/>
                                </NewPicItem1>
                                <p className="title">{firstArticle?.article_title}</p>
                                <p className="content1">{firstArticle?.article_content}</p>
                            </NewItem1>
                        )
                    }
                    
                    {
                        fourArticles && (
                            <NewItem2>
                                {fourArticles.map((article) => (
                                    <MiniBlogItem data={article}></MiniBlogItem>
                                ))}
                            </NewItem2>
                        )
                    }
                    
                </NewsSection>

                <NewsButtonContainer>
                    <NewButton onClick={()=>{navigate('/blog')}}>
                        XEM TẤT CẢ TIN TỨC
                    </NewButton>
                </NewsButtonContainer>

            </News>

        </>
    )
}

export default Home;
