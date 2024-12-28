import styled from 'styled-components';
import { FaMagento } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Container } from '../../globalStyles';

export const Nav = styled.nav`
  background: #00A6A9;
  height: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1002;
`;

export const NavbarContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  height: 80px;

  ${Container}
`;

export const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 960px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavLogo = styled.div`

    justify-self: flex-start;
    cursor: pointer;
    display: flex;
    align-items: center;
    width: 200px;
    height: 50px;
    margin-top: 20px;

    .logo-image {
        width: 200px;
        height: 50px;
      object-fit: cover;
    }
`;

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  justify-content: space-between;
  position: relative;
  z-index: 5000;

  .Button-container {
  background-color: #f0f1f2;
  position: absolute;
  top: 110%;
  right: 0;
  width: 200px;
  display: none; /* Ẩn mặc định */
  flex-direction: column;
  justify-content: space-around;
  align-content: space-between;
  align-items: center;
  height: 120px;
  z-index: 9999;

  &::after{
    content: '';
    position: absolute;
    top: -10px;
    right: -5px;
    transform: translateX(-50%);
    width: 24px;
    height: 10px;
    background-color: transparent;
    border-radius: 5px;
  }
}

.profile_image:hover + .Button-container,
.Button-container:hover {
  display: flex;
}

.user-email{
   font-size: 1.4rem;
   font-weight: 500;
   color: #fff;
   margin-right: 10px;
   margin-top: 20px;
   z-index: 9999;
}

.profile_image {
  width: 32px;
  height: 32px;
  margin-top: 20px;
  object-fit: cover;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1001;
}

.profile-buttons {
  width: 100%;
  height: 40px;
  border: none;
  background-color: azure;
  text-align: left;
  display: block;
  font-size: 1.4rem;
  font-weight: 500;
  padding-left: 10px;
  z-index: 9999;
  cursor: pointer;

  &:hover {
    background-color: #b4b4b4;
    color: #fff;
  }
}


.profile-options button {
  padding: 10px 20px;
  background-color: #00A6A9;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  z-index: 1001;
}

.profile-options button:hover {
  background-color: #008080;
}

  
  
  @media screen and (max-width: 960px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 130px);
    position: fixed;
    top: 130px;
    left: ${({ click }) => (click ? '-10%' : '-100%')};
    opacity: 1;
    transition: all 0.5s ease;
    background: azure;
    justify-content: space-evenly;
  }
`;

export const NavItem = styled.li`
  //height: 80px;
  //border-bottom: 2px solid transparent;
  font-size: 15px;
  display: inline-block;
  position: relative;
  
  &::after {
    content: '';
    width: 0;
    height: 2px;
    background: #fff;
    display: block;
    margin: auto;
    transition: width 0.5s;
  }

  &:hover::after{
    width: 100%;
  }

  @media screen and (max-width: 960px) {
    width: 100%;

    &:hover {
      border: none;
    }
  }
`;

export const NavItemBtn = styled.li`
  @media screen and (max-width: 960px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 120px;
  }
`;

export const NavLinks = styled.p`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  //height: 100%;

  @media screen and (max-width: 960px) {
    text-align: center;
    padding: 2rem;
    width: 100%;
    display: table;

    &:hover {
      color: #fff;
      transition: all 0.3s ease;
    }
  }
`;

export const NavBtnLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  padding: 8px 16px;
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
 
`;

export const NavBtnLink2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  margin-top: 10px;
  padding: 8px 16px;
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
 
`;
export const GroupButtonLink = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

export const NavLinks2 = styled(Link)`
    color: #005A5C;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: 1.5rem;
    z-index: 1002;

    .active {
    background-color: #00A6A9;
    color: white;
    transition: all 0.3s ease;
    }

    &:hover {
        color: #fff;
        transition: all 0.3s ease;
        background-color: #00A6A9;
    }

    @media screen and (max-width: 960px) {
        text-align: center;
        padding: 1rem;
        width: 100%;
        display: table;

        &:hover {
            color: #fff;
            transition: all 0.3s ease;
        }
    }
`;


export const NavbarContainer2 = styled(Container)`
  display: flex;
  justify-content: space-between;
  height: 80px;

  ${Container}
`;

export const Nav2 = styled.nav`
  background: #fff;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  position: fixed;
  width: 100%;
  top: 130px;
  left: 0;
  z-index: 1000;
`;

export const NavItem2 = styled.li`

  font-size: 15px;
  display: inline-block;
  position: relative;
  margin: 0 20px;
  z-index: 1001;
  

  .active {
    background-color: #00A6A9;
    color: white;
    transition: all 0.3s ease;
  }

  .button {
    display: inline-block;
    margin: 4px 2px;
    background-color: #fff;
   padding-left: 32px;
    padding-right: 32px; 
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: black;
    text-decoration: none;
    cursor: pointer;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .button:hover {
    transition-duration: 0.4s;
    -moz-transition-duration: 0.4s;
    -webkit-transition-duration: 0.4s;
    -o-transition-duration: 0.4s;
    background-color: #00A6A9;
    color: white;
  }

  .search-container {
    position: relative;
    display: inline-block;
    margin: 4px 2px;
    height: 40px;
    width: 40px;
    vertical-align: bottom;
  }

  .mglass {
    display: inline-block;
    pointer-events: none;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
  }

  .searchbutton {
    position: absolute;
    font-size: 22px;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .search:focus + .searchbutton {
    transition-duration: 0.4s;
    -moz-transition-duration: 0.4s;
    -webkit-transition-duration: 0.4s;
    -o-transition-duration: 0.4s;
    background-color: #00A6A9;
    color: white;
  }

  .search {
    position: absolute;
    left: 49px; /* Button width-1px (Not 50px/100% because that will sometimes show a 1px line between the search box and button) */
    background-color: #00A6A9;
    outline: none;
    border: none;
    padding: 0;
    width: 0;
    height: 100%;
    z-index: 10;
    transition-duration: 0.4s;
    -moz-transition-duration: 0.4s;
    -webkit-transition-duration: 0.4s;
    -o-transition-duration: 0.4s;
    color: white
  }

  .search::placeholder {
    color: white; /* Change placeholder text color to white */
    opacity: 1; /* Ensures the color shows fully */
  }

  .search:focus {
    width: 201px; /* Bar width+1px */
    padding: 0 16px 0 0;
  }

  .expandright {
    left: auto;
    right: 39px; /* Button width-1px */
  }

  .expandright:focus {
    padding: 0 0 0 16px;
  }
  
  //&::after {
  //  content: '';
  //  width: 0;
  //  height: 2px;
  //  background: #fff;
  //  display: block;
  //  margin: auto;
  //  transition: width 0.5s;
  //}
  //
  //&:hover::after{
  //  width: 100%;
  //}

  @media screen and (max-width: 960px) {
    width: 100%;

    &:hover {
      border: none;
    }
  }
`;
