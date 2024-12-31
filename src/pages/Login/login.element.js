import styled from 'styled-components';


export const LoginLayout = styled.div`
    display: flex; 
    justify-content: center; 
    align-items: center; 
    margin: 0; 
    width: 100vw;  
    height: 100vh;
`
export const LoginContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    //border: 1px solid gainsboro;
   
`
export const LoginItemAndHeader = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 35%;
    align-items: center;

    @media (max-width: 1024px){
        width: 50%;
    }

    @media (max-width: 740px){
        width: 80%;
    }
`
export const LoginLogo = styled.div`
    width: 120px;
    height: 120px;
    cursor: pointer;
    img{
        width: 100%;
        height: 100%;
    }
`

export const LoginHeader = styled.p`
    color: #00D3D6;
    margin-bottom: 20px;
    font-size: 40px;
`
export const LoginItemList = styled.div`
    width: 96%;
    height: 250px;
    flex: 3;
    padding: 10px 20px 0 20px;
    border: 1px solid gainsboro;
    border-radius: 5px;
    //box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 

`
export const LoginItem = styled.div`
    font-size: 20px;
    color: #00D3D6;
    input{
        display: block;
        width: 100%; 
        margin: 5px 0; 
        padding: 10px; 
        border: 1px solid gainsboro;
        border-radius: 50px;
        &:focus{
           outline:none;
        }
    }
    
`

export const LoginItem3 = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    background-color: #fff;
    border-radius: 50px;
    border: 1px solid gainsboro;
    margin: 5px 0;
    position: relative;
    input{
        display: block;
        width: 100%; 
        padding: 10px; 
        padding-right: 40px;
        border-radius: 50px;
        border: none;
        &:focus{
           outline:none;
        }
    }
    .eye-icon{
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 1.6rem;
        cursor: pointer;
        &:hover{
           color:rgb(151, 152, 153);
        }
    }

`

export const LoginItem2 = styled.div`
    font-size: 20px;
    color: #000;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 10px;
    
`

export const LoginLink2 = styled.p`
    color: #50ACE9;
    font-size: 20px;
    font-style: italic;
    cursor: pointer;

    &:hover{
       text-decoration: underline;
    }
`

export const LoginButton = styled.button`
    width: 100%;
    height: 40px;
    font-weight: bold;
    color: white;
    background-color: #00D3D6;
    margin-top: 5px;
    font-size: 20px;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    &:hover{
      background-color: #50ACE9;
    }
`

export const LoginLink = styled.div`
    margin-top: 10px;
    p{
        color: #50ACE9;
        font-size: 20px;
        font-style: italic;
        cursor: pointer;
        &:hover{
          text-decoration: underline;
        }
    }
    
`

export const LoginDeco = styled.div`
    flex: 2;
    position: relative;
    height: 100%; 
    overflow: hidden;
    display: flex;
    justify-content: flex-end;
`

export const Deco2 = styled.div`
    position: absolute;
    bottom: -200px; 
    left: -80%;
    width: 700px; 
    height: 450px; 
    background-color: #3BA5A9; 
    //border-radius: 0 10% 10% 0; 
    border-radius: 50%;
`

// export const Deco3 = styled.div`
//     position: absolute;
//     top: 20px;
//     right: 20px;
//     background-color: #4CAF50; /* Color of the floating icon */
//     border-radius: 50%;
//     width: 40px;
//     height: 40px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     z-index: 2; /* Make sure it's above the curve */
// `

export const LoginDeco2 = styled.div`
    flex: 2;
    position: relative;
    height: 100%; 
    overflow: hidden;
    display: flex;
    justify-content: flex-end;

    //.code-icon i.icon {
    //    color: white; /* Icon color */
    //    font-size: 20px; /* Adjust the size of the icon */
    //}
    //
    ///* Optionally, add some hover effect for the icon */
    //.code-icon:hover {
    //    background-color: #388E3C;
    //}
    
`

export const Deco4 = styled.div`
    position: absolute;
    top: -200px; 
    right: -400px;
    width: 850px; 
    height: 500px; 
    background-color: #3BA5A9; 
    border-radius: 50%; 
`
