import React from 'react';
import {Button} from '../../globalStyles';
import {
    FaFacebook,
    FaInstagram,
    FaYoutube,
    FaTwitter,
    FaLinkedin
} from 'react-icons/fa';
import {
    FooterContainer,
    FooterContentContainer,
    FooterContentWrapper,
    FooterContentItems,
    FooterContentTitle,
    FooterContent,
    SocialMedia,
    SocialMediaWrap,
    MedicalLogoContainer,
    SocialIcons,
    SocialIconContent, FooterContentWraperLower
} from './footer.elements';
import {IoLocationOutline} from "react-icons/io5";
import {assets} from "../../assets/assets_fe/assets";

function Footer() {
    return (
        <FooterContainer>
            <FooterContentContainer>
                <FooterContentWrapper>
                    <FooterContentItems>
                        <FooterContentTitle>Hệ thống bệnh viện</FooterContentTitle>
                        <FooterContent to='/sign-up'> <IoLocationOutline/> 2B Phổ Quang, Phường 2
                            Q. Tân Bình, Tp. Hồ Chí Minh</FooterContent>
                        <FooterContent ><IoLocationOutline/> 108 Phố Hoàng Như Tiếp,
                            P.Bồ Đề, Q. Long Biên, Tp. Hà Nội
                        </FooterContent>

                    </FooterContentItems>
                    <FooterContentItems>
                        <FooterContentTitle>Đường dây liên hệ</FooterContentTitle>
                        <FooterContent> <IoLocationOutline/>024 3872 3872</FooterContent>
                      <FooterContentWraperLower>
                          <FooterContent >024 7106 6858</FooterContent>
                      </FooterContentWraperLower>
                        <FooterContent ><IoLocationOutline/>0287 102 6789</FooterContent>
                      <FooterContentWraperLower>
                          <FooterContent >093 108 6858</FooterContent>
                      </FooterContentWraperLower>

                    </FooterContentItems>
                    <FooterContentItems>
                        <FooterContentTitle>Đường dẫn nhanh</FooterContentTitle>
                        <FooterContent >Chuyên khoa</FooterContent>
                        <FooterContent >Chuyên mục bảo mật</FooterContent>
                        <FooterContent >Chính sách bảo mật</FooterContent>
                        <FooterContent >Đặc san</FooterContent>
                    </FooterContentItems>
                    <FooterContentItems>
                        <FooterContentTitle>Website cùng tập đoàn</FooterContentTitle>
                        <FooterContent >Viện nghiên cứu </FooterContent>
                        <FooterContent >Trung tâm hỗ trợ sinh sản</FooterContent>
                    </FooterContentItems>
                </FooterContentWrapper>
            </FooterContentContainer>
            <SocialMedia>
                <SocialMediaWrap>
                    <MedicalLogoContainer >
                        <img src={assets.MedicalLogo} alt="logo" className="logo"/>
                    </MedicalLogoContainer>

                    <SocialIcons>
                        <SocialIconContent href='/' target='_blank' aria-label='Facebook'>
                            <FaFacebook/>
                        </SocialIconContent>
                        <SocialIconContent href='/' target='_blank' aria-label='Instagram'>
                            <FaInstagram/>
                        </SocialIconContent>
                        <SocialIconContent
                            href={
                                'https://www.youtube.com/watch?v=AThMowOwuWs'
                            }
                            rel='noopener noreferrer'
                            target='_blank'
                            aria-label='Youtube'
                        >
                            <FaYoutube/>
                        </SocialIconContent>
                        <SocialIconContent href='/' target='_blank' aria-label='Twitter'>
                            <FaTwitter/>
                        </SocialIconContent>
                        <SocialIconContent href='/' target='_blank' aria-label='ContentedIn'>
                            <FaLinkedin/>
                        </SocialIconContent>
                    </SocialIcons>
                </SocialMediaWrap>
            </SocialMedia>
        </FooterContainer>
    );
}

export default Footer;
