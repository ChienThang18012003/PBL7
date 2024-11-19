import styled from 'styled-components';
import {Container} from "../../globalStyles";


export const BodyPic = styled.div`
    width: 100vw; 
    height: 50vh; 
   .pic{
       width: 100%;
       height: 100%;
       object-fit: cover;
   }
`;

export const Info = styled.div`
    background: #F0F2F1;
    height: 400px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const InfoContainer = styled(Container)`
  display: flex;
  justify-content: center;
  height: 80px;

  ${Container}
`;

export const InfoSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

`;

export const InfoItem = styled.div`
  color: black;
  font-size: 22px;
  margin: 10px; /* Adds space around each item */
  //padding: 10px; /* Adds space inside each item */
  width: 300px;
  height: 300px;
  background: #fff;
  border-radius: 10px;
  p{
    color: #B4B4B4;
    font-size: 15px;
  }
  .title{
    color: black;
    font-size: 17px;
  }
`;

export const InfoPic = styled.div`
  width: 300px;
  height: 200px;
  border-radius: 10px;
  background: #00D3D6;
  padding-left: 10px;
  .pic{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const News = styled.div`
  background: #F0F2F1;
  height: 700px;
  display: flex;
  
  flex-direction: column;
`;
export const NewsHeader = styled.p`
  color: #008285;
  margin-left: 130px;
  
  .lower-header{
    color: #B4B4B4;
    font-size: 12px;
    margin-top: 10px;
  }
`;

export const NewsSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 130px;

`;

export const NewItem1 = styled.div`
  color: black;
  font-size: 22px;
  width: 600px;
  margin-top: 15px;
  height: 550px;
  background: #fff;
  flex: 2;
  p{
    color: #B4B4B4;
    font-size: 15px;
  }
  .title{
    color: black;
    font-size: 20px;
    margin-bottom: 5px;
  }
`;

export const NewPicItem1 = styled.div`
  width: 600px;
  height: 400px;
  .pic{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;


export const NewItem2 = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
  width: 200px;
  margin: 16px;
  justify-content: space-between;
 
`;

export const NewPicAndContent = styled.div`
  display: flex;
`;
export const NewPicItem2 = styled.div`
    width: 200px;
    height: 100px;
    margin: 20px;
    display: flex;
    .pic2 {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const NewsTitleAndContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 18px;
  flex: 1; // nay giup cho kich thuoc anh khong bi anh huong boi content
 
  .title{
    color: #2197E3;
  }
  .content{
    color: #C7C7C7;
    font-size: 15px;
    margin-top: 5px;
  }
`;
export const NewsButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NewButton = styled.button`
  color: white;
  background: #00D3D6;
  width: 150px;
  height: 50px;
  margin-top: 10px;
  border: none;
  cursor: pointer;
  //position: absolute; left: 50% ; top: 50%; transform: translateX(-50%) translateY(-50%)
`;

