import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import GolobalStyles from './globalStyles'
import Footer from "./components/Footer/Footer";
import { Navigate } from 'react-router-dom';
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import { useEffect, useState, useRef } from "react";
import useAxiosInterceptor from "./hook/useAxiosInterceptor";
import useAccount from "./hook/useAccount";
import NavigationBar from "./components/NavigationBar";
import Main from "./pages/Main";
import Company from "./pages/Company";
import CompanyInfo from "./pages/CompanyInfo";
import JobInfo from "./pages/JobInfo";
import Account from "./pages/Account";
import JobProfile from "./pages/JobProfile";
import Resume from "./pages/Resume";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import JobPost from "./pages/JobPost";
import CompanyFollowed from "./pages/CompanyFollowed";
import SavedJobPost from "./pages/SavedJobPost";
import JobPostApplied from "./pages/JobPostApplied";
import EmployerMain from "./pages/EmployerMain";
import NavigationBarTwo from "./components/NavigationBarTwo";
import EmployerAccount from "./pages/EmployerAccount";
import EmployerCompany from "./pages/EmployerCompany";
import ResumeInfo from "./pages/ResumeInfo";
import EmployerSearch from "./pages/EmployerSearch";
import ResumeSaved from "./pages/ResumeSaved";
import ResumeApplied from "./pages/ResumeApplied";
import EmployerDashboard from "./pages/EmployerDashboard";
import EmployerChat from "./pages/EmployerChat";
import CandidateChat from "./pages/CandidateChat";
import Chatbot from "./components/Chatbot";
import EmployerChatbot from "./components/EmployerChatbot";



function App() {
    const location = useLocation();

    const isLoginPage = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/forgot-password' || location.pathname === '/sign-in' || location.pathname === '/sign-up' || location.pathname === '/employer-account' || location.pathname === '/employer-company' || location.pathname.startsWith('/resume-info/') || location.pathname === '/candidate-search' || location.pathname === '/resume-saved' || location.pathname === '/resume-applied' || location.pathname === '/employer-dashboard' || location.pathname === '/employer-chat' || location.pathname === '/candidate-chat' || location.pathname === '/employer-job-post';
    const isEmployerPage =  location.pathname === '/employer-account' || location.pathname.startsWith('/resume-info/') || location.pathname === '/candidate-search' || location.pathname === '/resume-saved' || location.pathname === '/resume-applied' || location.pathname === '/employer-company' || location.pathname === '/employer-dashboard' || location.pathname === '/employer-job-post';
    const isMainPage = location.pathname === '/'

    const intervalId = useRef(null);

    const [
    checkLogin, 
    signUp, 
    loadingAccount, 
    doctorsHook, 
    changeAccountInfo,
    getAccountByEmail,
    sendEmail,
    changePassword,
    forgotPassword,
    getAccountStatus
    ] = useAccount();

    const [isLogined, setIsLogined] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [userRole, setUserRole] = useState("");

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
                if (obj?.email) {setUserEmail(obj?.email); setUserRole(obj?.role)}
                setIsLogined(true);
            } else {
                setUserEmail("");
                setUserRole("");
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
            {!isLoginPage && <NavigationBar/>}
            {!isLoginPage && (
                <div style={{width: "100%", height: "100px"}}></div>
            )}
            {
                isEmployerPage && <NavigationBarTwo></NavigationBarTwo>
            }
            {
                isEmployerPage && (
                <div style={{width: "100%", height: "100px"}}></div>
            )}
            {
                isMainPage && userRole === 'employer' && (
                    <NavigationBarTwo></NavigationBarTwo>
                )
            }
            {
                isMainPage && userRole === 'employer' && (
                    <div style={{width: "100%", height: "100px"}}></div>
                )
            }
            {
                isMainPage && userRole !== 'employer' && (
                    <NavigationBar></NavigationBar>
                )
            }
            {
                isMainPage && userRole !== 'employer' && (
                    <div style={{width: "100%", height: "100px"}}></div>
                )
            }
            <GolobalStyles/>
            <Routes>
                <Route path='/forgot-password' element={<ForgetPassword/>}/>
                <Route path='/sign-in' element={<SignIn/>}/>
                <Route path='/sign-up' element={<SignUp/>}/>
                <Route path='/' element={userRole === 'employer' ? <EmployerDashboard></EmployerDashboard> : <Main></Main>}/>
                {
                    userRole === 'employer' ? (
                        <>
                            <Route path='/employer-job-post' element={<EmployerMain/>}/>
                            <Route path='/employer-account' element={<EmployerAccount/>}/>
                            <Route path='/employer-company' element={<EmployerCompany/>}/>
                            <Route path='/employer-chat' element={<EmployerChat/>}/>
                            <Route path='/resume-info/:id' element={<ResumeInfo/>}/>
                            <Route path='/candidate-search' element={<EmployerSearch/>}/>
                            <Route path='/resume-saved' element={<ResumeSaved/>}/>
                            <Route path='/resume-applied' element={<ResumeApplied/>}/>
                        </>
                    ) : (
                        <>
                            <Route path='/company' element={<Company></Company>}/>
                            <Route path='/company-followed' element={<CompanyFollowed></CompanyFollowed>}/>
                            <Route path='/company-info/:id' element={<CompanyInfo></CompanyInfo>}/>
                            <Route path='/applied-job' element={<JobPostApplied></JobPostApplied>}/>
                            <Route path='/account' element={<Account/>}/>
                            <Route path='/job-info/:id' element={<JobInfo/>}/>
                            <Route path='/job-post' element={<JobPost/>}/>
                            <Route path='/job-post-saved' element={<SavedJobPost/>}/>
                            <Route path='/job-profile' element={<JobProfile/>}/>
                            <Route path='/resume/:id' element={<Resume/>}/>
                            <Route path='/candidate-chat' element={<CandidateChat/>}/>
                        </>
                    )
                }
                <Route path="*" element={userRole === 'employer' ? <Navigate to="/employer-dashboard"  /> : <Navigate to="/"  />} />
            </Routes>
            {!isLoginPage && <Chatbot/>}
            {isEmployerPage && <EmployerChatbot/>}
            {!isLoginPage && <Footer/>}
            {
                isMainPage && userRole !== 'employer' && (
                    <Chatbot></Chatbot>
                )
            }
            {
                isMainPage && userRole !== 'employer' && (
                    <Footer></Footer>
                )
            }
        </div>
    );
}

export default App;
