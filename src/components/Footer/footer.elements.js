import styled from 'styled-components';
import { FaMagento } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const FooterContainer = styled.div`
    background: #00A6A9;
  padding: 4rem 0 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FooterContentContainer = styled.div`
  width: 100%;
  max-width: 2000px;
  display: flex;
  justify-content: center;

  @media screen and (max-width: 820px) {
    padding-top: 32px;
  }
`;

export const FooterContentWrapper = styled.div`
  display: flex;

  @media screen and (max-width: 820px) {
    flex-direction: column;
  }
`;

// export const FooterContentsWrapper = styled.div`
//   display: flex;
//
//   @media screen and (max-width: 820px) {
//     flex-direction: column;
//   }
// `;
export const FooterContentItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 16px;
  text-align: left;
  width: 230px;
  box-sizing: border-box;
  color: #fff;

  @media screen and (max-width: 420px) {
    margin: 0;
    padding: 10px;
    width: 100%;
  }
`;

export const FooterContentTitle = styled.p`
  margin-bottom: 16px;
    font-size: 17px;
    border-bottom: 1px solid white;
    text-transform: uppercase;
    
`;

export const FooterContent = styled.p`
  color: #fff;
  margin-bottom: 0.5rem;
    font-size: 14px;

  //&:hover {
  //  color: #0467fb;
  //  transition: 0.3s ease-out;
  //}
`;

export const SocialMedia = styled.section`
  max-width: 1000px;
  width: 100%;
`;

export const SocialMediaWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  max-width: 1000px;
  margin: 40px auto 0 auto;

  @media screen and (max-width: 820px) {
    flex-direction: column;
  }
`;

export const MedicalLogoContainer = styled.div`
    justify-self: start;
    cursor: pointer;
    text-decoration: none;
    display: flex;
    width: 200px;
    height: 5px;
    align-items: center;
    margin-left: 75px;
    
    .logo {
        width: 200px;
        height: 50px;
        object-fit: cover;
    }
`;


export const SocialIcons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 240px;
`;

export const SocialIconContent = styled.a`
  color: #fff;
  font-size: 24px;
`;

export const FooterContentWraperLower = styled.div`
    margin-left: 14px;
`
