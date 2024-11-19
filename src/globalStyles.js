import styled, { createGlobalStyle } from 'styled-components';

// loai bo nhung khoang trang
const GlobalStyle = createGlobalStyle`
  * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
 } 
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1300px;
  margin-right: auto;
  margin-left: auto;
  padding-right: 50px;
  padding-left: 50px;

  @media screen and (max-width: 991px) {
    padding-right: 30px;
    padding-left: 30px;
  }
`;

export const Button = styled.button`
    border-radius: 30px;
        // background: ${({primary}) => (primary ? '#4B59F7' : '#0467FB')};
        //   background: ${({primary}) => (primary ? 'linear-gradient(to right, #00FBFF 0%, #0C507C 100%)' : 'linear-gradient(to left, #00FBFF 0%, #0C507C 100%)')};
    background: linear-gradient(to right, #00FBFF 0%, #0C507C 100%);
    white-space: nowrap;
    padding: ${({big}) => (big ? '12px 64px' : '10px 20px')};
    color: #fff;
    font-size: ${({fontBig}) => (fontBig ? '20px' : '16px')};
    outline: none;
    border: none;
    cursor: pointer;
    width: 200px;
    height: 40px;

    &:hover {
        transition: all 0.3s ease-out;
        background: #fff;
            // background-color: ${({primary}) => (primary ? '#0467FB' : '#4B59F7')};
        background: linear-gradient(to right, #0C507C 0%, #00FBFF 100%);
    }

    @media screen and (max-width: 960px) {
        width: 100%;
    }
`;

export default GlobalStyle;
