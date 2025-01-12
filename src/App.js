import Navbar from "./components/navbar/Navbar";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import GolobalStyles from './globalStyles'
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Appointment from "./pages/Appointment/Appointment";
import Doctors from "./pages/Doctor/Doctors";
import DocInfo from "./pages/DocInfo/DocInfo";
import Specialities from "./pages/Specialities/Specialities";
import Blog from "./pages/Blog";
import SpecialitiesInfo from "./pages/SpecialitiesInfo/SpecialitiesInfo";
import Forum from "./pages/Forum";
import Profile from "./pages/Profile";
import SpecialityInfo from "./pages/SpecialityInfo";
import Question from "./pages/Question";
import BlogInfo from "./pages/BlogInfo";
import CreateBlog from "./pages/CreateBlog";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import { useEffect, useState, useRef } from "react";
import useAxiosInterceptor from "./hook/useAxiosInterceptor";
import useAccount from "./hook/useAccount";



function App() {
    const location = useLocation();

    const isLoginPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/forgot-password' ;

    const intervalId = useRef(null);

    const [
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
        , 
        , 
        , 
        , 
        , 
        ,
        ,
        ,
        getAccountStatus
        ] = useAccount();

    const [isLogined, setIsLogined] = useState(false);
    const [userEmail, setUserEmail] = useState("");

    const navigate = useNavigate();

    useAxiosInterceptor();

    useEffect(() => {

        const checkToken = () => {
            const item = localStorage.getItem('isLoginSuccess');

            if (!item) {
                return;
            }

            let obj = JSON.parse(item);
            if (obj?.token) {
                const token = obj.token;
                const base64Url = token.split('.')[1];
                const decodedPayload = JSON.parse(atob(base64Url));
                const currentTime = Math.floor(Date.now() / 1000); 
    
                if (decodedPayload.exp < currentTime) {
                    
                    localStorage.removeItem('isLoginSuccess'); 
                    alert('Phiên đăng nhập của bạn đã hết hạn, vui lòng đăng nhập lại.');
                    navigate('/login');
                }
            }
            else {
                navigate('/login');
                return;
            }
            
        };

        checkToken();
    }, [navigate]);

    useEffect(() => {
        const fetchAccountStatusPeriodically = async () => {
            if (isLogined) {
                const status = await getAccountStatus(userEmail);
            if (status && typeof status === 'object') {
                if (status?.is_deleted) {
                    alert("Tài khoản của bạn đã bị vô hiệu hóa, bạn sẽ được chuyển về trang đăng nhập!");
                    localStorage.removeItem('isLoginSuccess');
                    if (window.location.pathname === '/profile') {
                        navigate('/login', { replace: true });
                    } else {
                        navigate('/login');
                    }
                    window.location.reload();
                }
            }
            else if (status && typeof status !== 'object') {
                if (status === "No user found") {
                    alert("Có lỗi xảy ra với tài khoản của bạn, bạn sẽ được chuyển về trang đăng nhập!");
                    localStorage.removeItem('isLoginSuccess');
                    if (window.location.pathname === '/profile') {
                        navigate('/login', { replace: true });
                    } else {
                        navigate('/login');
                    }
                    window.location.reload();
                }
            }
            }
            else {
                return;
            }
        };
        
        const fetchLocalStoragePeriodically = () => {
            const item = localStorage.getItem("isLoginSuccess");
            if (item) {
                let obj = JSON.parse(item);
                if (obj?.email) setUserEmail(obj?.email);
                setIsLogined(true);
            } else {
                setUserEmail("");
                setIsLogined(false);
            }
        }

        const interval = setInterval(() => {
            fetchLocalStoragePeriodically();
        }, 2000);

        if (isLogined) {
            if (intervalId.current) {
                clearInterval(intervalId.current);
            }

            intervalId.current = setInterval(() => {
                fetchAccountStatusPeriodically();
            }, 5000);
        } else {
            clearInterval(intervalId.current);
        }

        return () => {
            clearInterval(intervalId.current);
            clearInterval(interval);
        };
    }, [isLogined]);

    return (
        <div >
            {!isLoginPage && <Navbar/>}
            {!isLoginPage && (
                <div style={{width: "100%", height: "180px"}}></div>
            )}
            <GolobalStyles/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/appointment' element={<Appointment/>}/>
                <Route path='/doctors' element={<Doctors/>}/>
                <Route path='/doctors/:speciality' element={<Doctors/>}/>
                <Route path='/appointment/:docId' element={<DocInfo/>}/>
                <Route path='/specialities' element={<Specialities/>}/>
                <Route path='/specialities/:id' element={<SpecialitiesInfo/>}/>
                <Route path='/blog' element={<Blog/>}/>
                <Route path='/forum' element={<Forum/>}/>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/speciality-info/:id' element={<SpecialityInfo/>}/>
                <Route path='/create-blog' element={<CreateBlog/>}/>
                <Route path='/bloginfo/:id' element={<BlogInfo/>}/>
                <Route path='/forum/:id' element={<Question/>}/>
                <Route path='/forgot-password' element={<ForgetPassword/>}/>

            </Routes>
            {!isLoginPage && <Footer/>}
        </div>
    );
}

export default App;
