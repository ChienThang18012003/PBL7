import React, {useEffect, useState} from "react";
import {Button as Button2} from '../../globalStyles';
import {
    MobileIcon,
    Nav, Nav2,
    NavbarContainer,
    NavBtnLink,
    NavItem,
    NavItemBtn,
    NavLinks,
    NavLogo,
    NavMenu, GroupButtonLink, NavLinks2, NavbarContainer2, NavItem2, NavBtnLink2
} from "./navbar.element";
import {FaBars, FaTimes} from "react-icons/fa";
import {IconContext} from "react-icons";
import {IoPersonOutline} from "react-icons/io5";
import {RiQuestionMark} from "react-icons/ri";
import {MdOutlineCalendarMonth} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {assets} from "../../assets/assets_fe/assets";
import Button from "../Button";
import useAccount from "../../hook/useAccount";



const Navbar = () => {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [isClickedOn, setIsClickedOn] = useState(false);
    const navigate = useNavigate();
    const [checkLogin, signUp, loadingAccount, doctorsHook, getAccountByID, filterDoctorList, getAccountByEmail, checkAccountType] = useAccount();

    const [button, setButton] = useState(true);
    const [userInfo, setUserInfo] = useState({});
    const [currentUser, setCurrentUser] = useState({});

    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        const fetchAccount = async() => {
            let item = localStorage.getItem('isLoginSuccess');

            // Nếu item tồn tại, chuyển đổi từ chuỗi JSON thành đối tượng
            if (item) {
                let obj = JSON.parse(item);
                setCurrentUser(obj);
                console.log(obj.email);
                const AccountInfo = await getAccountByEmail(obj.email);
                console.log("AccountInfo: " ,AccountInfo);
                setUserInfo(AccountInfo);
            }
        }
        showButton();
        setIsLoggedin(isObjectInLocalStorage('isLoginSuccess'));
        console.log(isObjectInLocalStorage('isLoginSuccess'));
        fetchAccount();
    }, []);

    useEffect(() => {
        console.log('Updated userInfo:', userInfo);
    }, [userInfo]);

    window.addEventListener('resize', showButton);

    const isObjectInLocalStorage = (key) => {
        // Lấy dữ liệu từ localStorage
        const storedData = localStorage.getItem(key);
    
        // Kiểm tra nếu dữ liệu không tồn tại
        if (storedData === null) {
            return false;
        }
    
        // Nếu có dữ liệu, cố gắng parse thành object (nếu có thể)
        try {
            const parsedData = JSON.parse(storedData);
            return parsedData !== null; // Kiểm tra nếu dữ liệu là object hợp lệ
        } catch (error) {
            return false; // Nếu không parse được, dữ liệu không phải object hợp lệ
        }
    };

    return (
        <>
            <IconContext.Provider value={{color: 'fff'}}>
                <Nav>
                    <NavbarContainer>
                        <NavLogo>
                            <img src={assets.MedicalLogo} alt="Medical Logo" className="logo-image"/>
                        </NavLogo>
                        <MobileIcon onClick={handleClick}>
                            {click ? <FaTimes/> : <FaBars/>}
                        </MobileIcon>

                        <GroupButtonLink>
                            <div>
                                <NavMenu>
                                    {/* Hiển thị nếu đã đăng nhập */}
                                    {!isLoggedin ? (
                                        <>
                                            <NavItemBtn>
                                                {button ? (
                                                    <NavBtnLink2>
                                                        <Button2 onClick={() => navigate('/register')} primary>ĐĂNG KÍ</Button2>
                                                    </NavBtnLink2>
                                                ) : (
                                                    <NavBtnLink2 to='/sign-up'>
                                                        <Button2 onClick={closeMobileMenu} fontBig primary>
                                                            ĐĂNG KÍ
                                                        </Button2>
                                                    </NavBtnLink2>
                                                )}
                                            </NavItemBtn>

                                            <NavItemBtn>
                                                {button ? (
                                                    <NavBtnLink2>
                                                        <Button2 onClick={() => navigate('/login')} primary>ĐĂNG NHẬP</Button2>
                                                    </NavBtnLink2>
                                                ) : (
                                                    <NavBtnLink2 to='/login'>
                                                        <Button2 onClick={closeMobileMenu} fontBig primary>
                                                            ĐĂNG NHẬP
                                                        </Button2>
                                                    </NavBtnLink2>
                                                )}
                                            </NavItemBtn>
                                        </>
                                    ) : (
                                        <>
                                              <div className="user-email">
                                                <span>{userInfo.email}</span>
                                              </div>
                                              <img className="profile_image" src={`data:image/jpeg;base64,${userInfo.profile_image}`} alt="Login status" onClick={()=>{setIsClickedOn(!isClickedOn)}}/>
                                              
                                              
                                              <div className="Button-container">
                                                  <button className="profile-buttons" to='/login' onClick={()=>{localStorage.removeItem('isLoginSuccess'); navigate('/login');}}>Đăng xuất</button>
                                                  <button className="profile-buttons">Quản lý</button>
                                                  <button className="profile-buttons" to='/profile' onClick={()=>{navigate('/profile')}}>Trang cá nhân</button>
                                              </div>
                                        </>  
                                        
                                    )}
                                </NavMenu>
                            </div>

                            
                        </GroupButtonLink>

                    </NavbarContainer>
                </Nav>

                <Nav2>
                    <NavbarContainer2>
                        <NavMenu ocClick={handleClick} click={click}>
                            <NavItem2>
                                <NavLinks2 to={'/'}>
                                    GIỚI THIỆU
                                </NavLinks2>
                            </NavItem2>

                            <NavItem2>
                                <NavLinks2 to={'/specialities'}>
                                    CHUYÊN KHOA
                                </NavLinks2>
                            </NavItem2>

                            <NavItem2>
                                <NavLinks2 to={'/doctors'}>
                                    CHUYÊN GIA - BÁC SĨ
                                </NavLinks2>
                            </NavItem2>

                            <NavItem2>
                                <NavLinks2 to='/appointment' >
                                    ĐẶT LỊCH KHÁM
                                </NavLinks2>
                            </NavItem2>

                            <NavItem2>
                                <NavLinks2 to='/blog'>
                                    TIN TỨC
                                </NavLinks2>
                            </NavItem2>

                            <NavItem2>
                                <NavLinks2 to='/forum' >
                                    HỎI ĐÁP
                                </NavLinks2>
                            </NavItem2>

                            <NavItem2>
                                <div className="search-container">
                                    <form action="/search" method="get">
                                        <input className="search" id="searchleft" type="search" name="q"
                                               placeholder="Search"/>
                                        <label className="button searchbutton" htmlFor="searchleft"><span
                                            className="mglass">&#9906;</span></label>
                                    </form>
                                </div>
                            </NavItem2>
                        </NavMenu>
                    </NavbarContainer2>
                </Nav2>
            </IconContext.Provider>
        </>
    );
}

export default Navbar;
