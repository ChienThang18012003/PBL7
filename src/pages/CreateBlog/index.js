import classNames from 'classnames/bind';
import styles from './CreateBlog.module.scss';
import PageTitle from '../../components/PageTitle';
import Button from '../../components/Button';
import { useState, useEffect } from 'react';
import useArticles from '../../hook/useArticles';
import useAccount from '../../hook/useAccount';

const cx = classNames.bind(styles);
function CreateBlog() {
    const [image, setImage] = useState();
    const [blogTitle, setBlogTitle] = useState('');
    const [blogContent, setBlogContent] = useState('');
    const [role, setRole] = useState('');
    const [
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        addArticle,
    ] = useArticles();
    const [userInfo, setUserInfo] = useState({});
    const [, , , , , , getAccountByEmail] = useAccount();


    useEffect(() => {
        return () => {
            image && URL.revokeObjectURL(image.preview);
        };
    }, [image]);

    useEffect(() => {
        const fetchAccount = async () => {
            let item = localStorage.getItem('isLoginSuccess');
            
            if (item) {
                let obj = JSON.parse(item);
                if (obj?.adminAccess) setRole('Admin');
                const AccountInfo = await getAccountByEmail(obj?.email);
                setUserInfo(AccountInfo);
            }
        };
        fetchAccount();
    }, []);

    const handleArticleSubmit = async () => {
        let item = localStorage.getItem('isLoginSuccess');
        if (item) {
            if (!blogTitle) {
                alert("Vui lòng nhập tiêu đề bài báo!");
                return;
            }
            if (!blogContent) {
                alert("Vui lòng nhập nội dung bài báo!");
                return;
            }
            if (!image) {
                alert("Vui lòng chọn hình ảnh!");
                return;
            }
            let obj = JSON.parse(item);
            if (userInfo?.__t || role === 'Admin') {
                const newArticle = await addArticle(obj?.email, blogTitle, blogContent, image);
                if (newArticle && typeof newArticle === 'object') {
                    setBlogContent('');
                    setBlogTitle('');
                    setImage(null);
                    alert("Thêm bài báo thành công!");
                    window.location.reload();
                }
                else if (newArticle && typeof newArticle !== 'object') {
                    alert(newArticle);
                }
                else {
                    alert("Có lỗi xảy ra, vui lòng thử lại sau!");
                }
            }
            else {
                alert("Chỉ tài khoản bác sĩ mới có thể đăng bài báo!");
            }
        }
        else {
            alert("Bạn cần đăng nhập để đăng bài báo");
        }
        
    };

        const handlePreviewImage = (e) => {
            const file = e.target.files[0];
            if (file) {
                file.preview = URL.createObjectURL(file);
                setImage(file);
            } else {
                alert("No file selected or invalid file type.");
            }
        };

    return (
        <div className={cx('wrapper')}>
            <PageTitle>TẠO BLOG</PageTitle>
            <div className={cx('blog-form-container')}>
                <div className={cx('blog-form')}>
                    <div className={cx('image-container')}>
                        {image && <img name="image" src={image.preview} alt="" className={cx('blog-image')}></img>}
                    </div>
                    <div className={cx('input-file-container')}>
                        <input type="file" className={cx('image-picker')} onChange={handlePreviewImage}></input>
                    </div>
                    <input
                        type="text"
                        name="title"
                        className={cx('blog-title')}
                        placeholder="Tiêu đề"
                        value={blogTitle}
                        onChange={(e) => setBlogTitle(e.target.value)}
                    ></input>
                    <textarea
                        name="content"
                        className={cx('blog-content')}
                        placeholder="Nội dung"
                        rows="4"
                        cols="50"
                        value={blogContent}
                        onChange={(e) => setBlogContent(e.target.value)}
                    ></textarea>
                    <Button submit long onClick={handleArticleSubmit}>
                        TẠO BLOG
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CreateBlog;
