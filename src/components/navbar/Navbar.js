import React, {useEffect, useState} from "react";
import {Button as Button2} from '../../globalStyles';
import {
    MobileIcon,
    Nav, Nav2,
    NavbarContainer,
    NavItemBtn,
    NavLogo,
    NavMenu, GroupButtonLink, NavLinks2, NavbarContainer2, NavItem2, NavBtnLink2
} from "./navbar.element";
import {FaBars, FaTimes} from "react-icons/fa";
import {IconContext} from "react-icons";
import {useNavigate} from "react-router-dom";
import {assets} from "../../assets/assets_fe/assets";
import useAccount from "../../hook/useAccount";
import Image from "../Image";



const Navbar = () => {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [isClickedOn, setIsClickedOn] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate();
    const [, , , , , , getAccountByEmail] = useAccount();

    const [button, setButton] = useState(true);
    const [userInfo, setUserInfo] = useState({});
    const [currentUser, setCurrentUser] = useState({});

    const closeMobileMenu = () => setClick(false);

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(()=>{
        if (window.innerWidth <= 960) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    },[window.innerWidth])
    useEffect(() => {
        const fetchAccount = async() => {
            let item = localStorage.getItem('isLoginSuccess');

            if (item) {
                let obj = JSON.parse(item);
                setCurrentUser(obj);
                if (obj?.email){
                    const AccountInfo = await getAccountByEmail(obj?.email);
                    setUserInfo(AccountInfo);
                }
                else {
                    navigate('/login');
                    return;
                }
                
            }
        }
        showButton();
        setIsLoggedin(isObjectInLocalStorage('isLoginSuccess'));
        fetchAccount();
    }, []);

    window.addEventListener('resize', showButton);

    const isObjectInLocalStorage = (key) => {
        const storedData = localStorage.getItem(key);
    
        if (storedData === null) {
            return false;
        }
    
        try {
            const parsedData = JSON.parse(storedData);
            return parsedData !== null;
        } catch (error) {
            return false;
        }
    };

    return (
        <>
            <IconContext.Provider value={{color: 'fff'}}>
                <Nav>
                    <NavbarContainer>
                        <NavLogo>
                            <img src={assets.MedicalLogo} alt="Medical Logo" className="logo-image" onClick={()=>{navigate('/')}}/>
                        </NavLogo>
                        <MobileIcon onClick={handleClick}>
                            {click ? <FaTimes/> : <FaBars/>}
                        </MobileIcon>

                        <GroupButtonLink>
                            <div>
                                <NavMenu>
                                    
                                    {!isLoggedin ? (
                                        <>
                                            <NavItemBtn>
                                                {button ? (
                                                    <NavBtnLink2>
                                                        <Button2 onClick={() => navigate('/register')} primary>ĐĂNG KÝ</Button2>
                                                    </NavBtnLink2>
                                                ) : (
                                                    <NavBtnLink2 to='/register'>
                                                        <Button2 onClick={closeMobileMenu} fontBig primary>
                                                            ĐĂNG KÝ
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
                                                <span>{userInfo?.email}</span>
                                              </div>
                                              <Image className="profile_image" src={userInfo?.profile_image} fallback={assets.UserImage} alt="Login status" onClick={()=>{setIsClickedOn(!isClickedOn)}}/>
                                              
                                              
                                              <div className="Button-container">
                                                  <button className="profile-buttons" to='/profile' onClick={()=>{navigate('/profile')}}>Trang cá nhân</button>
                                                  <button className="profile-buttons" onClick={() => window.location.href = "https://admin-xb5z.onrender.com/"}>Quản lý</button>
                                                  <button
                                                        className="profile-buttons"
                                                        onClick={() => {
                                                            const userConfirmed = window.confirm("Bạn có chắc muốn đăng xuất không ?")
                                                            if (userConfirmed) {
                                                                localStorage.removeItem('isLoginSuccess');
                                                                if (window.location.pathname === '/profile') {
                                                                    navigate('/login', { replace: true });
                                                                } else {
                                                                    navigate('/login');
                                                                }
                                                                window.location.reload();
                                                            }
                                                        }}
                                                    >
                                                        Đăng xuất
                                                    </button>
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
                        <NavMenu onClick={handleClick} click={click}>
                            {
                                isMobile && !isLoggedin && (
                                    <>
                                        <NavItem2>
                                            <NavLinks2 to={'/register'} className={window.location.pathname === '/register' ? 'active' : ''}>
                                                ĐĂNG KÝ
                                            </NavLinks2>
                                        </NavItem2>
                                        <NavItem2>
                                            <NavLinks2 to={'/login'} className={window.location.pathname === '/login' ? 'active' : ''}>
                                                ĐĂNG NHẬP
                                            </NavLinks2>
                                        </NavItem2>
                                    </>
                                )
                            }

                            {
                                isMobile && isLoggedin && (
                                    <>
                                        <NavItem2>
                                            <NavLinks2 to={'/profile'} className={window.location.pathname === '/profile' ? 'active' : ''}>
                                                TRANG CÁ NHÂN
                                            </NavLinks2>
                                        </NavItem2>
                                        <NavItem2>
                                            <NavLinks2 onClick={() => window.location.href = "https://admin-xb5z.onrender.com/"}>
                                                QUẢN LÝ
                                            </NavLinks2>
                                        </NavItem2>
                                        <NavItem2>
                                            <NavLinks2 onClick={() => {
                                                            const userConfirmed = window.confirm("Bạn có chắc muốn đăng xuất không ?")
                                                            if (userConfirmed) {
                                                                localStorage.removeItem('isLoginSuccess');
                                                                if (window.location.pathname === '/profile') {
                                                                    navigate('/login', { replace: true });
                                                                } else {
                                                                    navigate('/login');
                                                                }
                                                                window.location.reload();
                                                            }
                                                        }}>
                                                ĐĂNG XUẤT
                                            </NavLinks2>
                                        </NavItem2>
                                    </>
                                )
                            }

                            <NavItem2>
                                <NavLinks2 to={'/'} onClick={()=>{scrollToTop()}} className={window.location.pathname === '/' ? 'active' : ''}>
                                    GIỚI THIỆU
                                </NavLinks2>
                            </NavItem2>

                            <NavItem2 >
                                <NavLinks2 to={'/specialities'} onClick={()=>{scrollToTop()}} className={window.location.pathname === '/specialities' ? 'active' : ''}>
                                    CHUYÊN KHOA
                                </NavLinks2>
                            </NavItem2>

                            <NavItem2>
                                <NavLinks2 to={'/doctors'} onClick={()=>{scrollToTop()}} className={window.location.pathname === '/doctors' ? 'active' : ''}>
                                    CHUYÊN GIA - BÁC SĨ
                                </NavLinks2>
                            </NavItem2>

                            <NavItem2 >
                                <NavLinks2 to='/appointment' onClick={()=>{scrollToTop()}} className={window.location.pathname === '/appointment' ? 'active' : ''}>
                                    ĐẶT LỊCH KHÁM
                                </NavLinks2>
                            </NavItem2>

                            <NavItem2>
                                <NavLinks2 to='/blog' onClick={()=>{scrollToTop()}} className={window.location.pathname === '/blog' ? 'active' : ''}>
                                    TIN TỨC
                                </NavLinks2>
                            </NavItem2>

                            <NavItem2>
                                <NavLinks2 to='/forum' onClick={()=>{scrollToTop()}} className={window.location.pathname === '/forum' ? 'active' : ''}>
                                    HỎI ĐÁP
                                </NavLinks2>
                            </NavItem2>

                            <NavItem2>
                                <NavLinks2 to='/create-blog' onClick={()=>{scrollToTop()}} className={window.location.pathname === '/create-blog' ? 'active' : ''}>
                                    TẠO BLOG
                                </NavLinks2>
                            </NavItem2>
                        </NavMenu>
                    </NavbarContainer2>
                </Nav2>
            </IconContext.Provider>
        </>
    );
}

export default Navbar;
