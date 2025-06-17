import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import GolobalStyles from './globalStyles'
import Footer from "./components/Footer/Footer";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import { useEffect, useState, useRef } from "react";
import useAxiosInterceptor from "./hook/useAxiosInterceptor";
import useAccount from "./hook/useAccount";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NavigationBarTwo from "./components/NavigationBarTwo";
import AdminMain from "./pages/AdminMain";
import AdminDistrict from "./pages/AdminDistrict";
import AdminCareer from "./pages/AdminCareer";
import AdminLocation from "./pages/AdminLocation";
import AdminBanner from "./pages/AdminBanner";
import AdminFeedback from "./pages/AdminFeedback";
import AdminAccount from "./pages/AdminAccount";
import AdminUser from "./pages/AdminUser";
import AdminUserInfo from "./pages/AdminUserInfo";
import AdminCompany from "./pages/AdminCompany";
import AdminCompanyInfo from "./pages/AdminCompanyInfo";
import AdminJobPost from "./pages/AdminJobPost";
import AdminResume from "./pages/AdminResume";
import AdminResumeInfo from "./pages/AdminResumeInfo";
import AdminDashboard from "./pages/AdminDashboard";



function App() {
    const location = useLocation();

    const isLoginPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/forgot-password' || location.pathname === '/sign-in' || location.pathname === '/sign-up' || location.pathname === '/admin-city' || location.pathname === '/admin-district' || location.pathname === '/admin-career' || location.pathname === '/admin-location' || location.pathname === '/admin-banner' || location.pathname === '/admin-feedback' || location.pathname === '/admin-account' || location.pathname === '/admin-user' || location.pathname.startsWith('/admin-user-info/') || location.pathname === '/admin-company' || location.pathname.startsWith('/admin-company-info/') || location.pathname === '/admin-job-post' || location.pathname === '/admin-resume' || location.pathname.startsWith('/admin-resume-info/') || location.pathname === '/';
    const isEmployerPage =  location.pathname === '/admin-city' || location.pathname === '/admin-district' || location.pathname === '/admin-career' || location.pathname === '/admin-location' || location.pathname === '/admin-banner' || location.pathname === '/admin-feedback' || location.pathname === '/admin-account' || location.pathname === '/admin-user' || location.pathname.startsWith('/admin-user-info/') || location.pathname === '/admin-company' || location.pathname.startsWith('/admin-company-info/') || location.pathname === '/admin-job-post' || location.pathname === '/admin-resume' || location.pathname.startsWith('/admin-resume-info/') || location.pathname === '/';

    const intervalId = useRef(null);

    const [
    checkLogin, 
    signUp, 
    loadingAccount, 
    doctorsHook, 
    changeAccountInfo,
    getAccountByEmail,
    getAllAccount,
    changeAccountRole,
    updateAccountStatus,
    getAccountByID,
    countUserByRole,
    statisticUserByDate,
    sendEmail,
    changePassword,
    forgotPassword,
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
                    navigate('/sign-in');
                }
            }
            else {
                navigate('/sign-in');
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
                if (!status?.is_active) {
                    alert("Tài khoản của bạn đã bị vô hiệu hóa, bạn sẽ được chuyển về trang đăng nhập!");
                    localStorage.removeItem('isLoginSuccess');
                    if (window.location.pathname === '/profile') {
                        navigate('/sign-in', { replace: true });
                    } else {
                        navigate('/sign-in');
                    }
                    window.location.reload();
                }
            }
            else if (status && typeof status !== 'object') {
                if (status === "No user found") {
                    alert("Có lỗi xảy ra với tài khoản của bạn, bạn sẽ được chuyển về trang đăng nhập!");
                    localStorage.removeItem('isLoginSuccess');
                    if (window.location.pathname === '/profile') {
                        navigate('/sign-in', { replace: true });
                    } else {
                        navigate('/sign-in');
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
            {
                isEmployerPage && <NavigationBarTwo></NavigationBarTwo>
            }
            {
                isEmployerPage && (
                <div style={{width: "100%", height: "100px"}}></div>
            )}
            <GolobalStyles/>
            <Routes>
                <Route path='/' element={<AdminDashboard></AdminDashboard>}/>
                <Route path='/sign-in' element={<SignIn/>}/>
                <Route path='/sign-up' element={<SignUp/>}/>
                <Route path='/forgot-password' element={<ForgetPassword/>}/>
                <Route path='/admin-city' element={<AdminMain/>}/>
                <Route path='/admin-district' element={<AdminDistrict/>}/>
                <Route path='/admin-career' element={<AdminCareer/>}/>
                <Route path='/admin-location' element={<AdminLocation/>}/>
                <Route path='/admin-banner' element={<AdminBanner/>}/>
                <Route path='/admin-feedback' element={<AdminFeedback/>}/>
                <Route path='/admin-account' element={<AdminAccount/>}/>
                <Route path='/admin-user' element={<AdminUser/>}/>
                <Route path='/admin-user-info/:id' element={<AdminUserInfo/>}/>
                <Route path='/admin-company' element={<AdminCompany/>}/>
                <Route path='/admin-company-info/:id' element={<AdminCompanyInfo/>}/>
                <Route path='/admin-job-post' element={<AdminJobPost/>}/>
                <Route path='/admin-resume' element={<AdminResume/>}/>
                <Route path='/admin-resume-info/:id' element={<AdminResumeInfo/>}/>
            </Routes>
            {!isLoginPage && <Footer/>}
        </div>
    );
}

export default App;
