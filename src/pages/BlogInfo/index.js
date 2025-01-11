import MiniBlogItem from '../../components/MiniBlogItem';
import classNames from 'classnames/bind';
import styles from './BlogInfo.module.scss';
import PageTitle from '../../components/PageTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendar } from '@fortawesome/free-regular-svg-icons';
import useArticles from '../../hook/useArticles';
import { useParams } from 'react-router-dom';
import { useState, useEffect} from 'react';
import LoadingAnimation from '../../components/LoadingAnimation';
import Image from '../../components/Image';

const cx = classNames.bind(styles);
function BlogInfo() {
    const { id } = useParams();
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const [articleByID, setArticleByID] = useState(null);
    const [fiveArticles, setFiveArticles] = useState([]);

    const [
        ,
        ,
        ,
        loading,
        ,
        ,
        getArticlesByID,
        ,
        ,
        getFiveLatestArticles,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        getFiveLatestArticlesList
    ] = useArticles();

    useEffect(() => {
        const fetchArticle = async () => {
            const article = await getArticlesByID(id);
            if (article) setArticleByID(article);
        };

        fetchArticle();
    }, [id]);

    useEffect(() => {
        const fetchFiveArticles = async () => {
            const latestArticles = await getFiveLatestArticles(id);
            if (latestArticles && Array.isArray(latestArticles)) setFiveArticles(latestArticles);
        };
        fetchFiveArticles();

        const fetchArticlesPeriodically = async () => {
            const articles = await getFiveLatestArticlesList(id);
            if (articles && Array.isArray(articles)) setFiveArticles(articles);
        };

        const intervalId = setInterval(() => {
            fetchArticlesPeriodically();
        }, 5000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);


    const renderContent = () => {
        if (!articleByID?.article_content) return null; 
        return articleByID?.article_content.split('\n').map((line, index) => (
            <h4 className={cx('blog-content')} key={index}>
                
                <span>&nbsp;&nbsp;&nbsp;&nbsp;{line.trim()}</span>
            </h4>
        ));
    };

    if (loading || !articleByID) {
        return (
            <LoadingAnimation></LoadingAnimation>
        )
    }

    return (
        <div className={cx('wrapper')}>
            <PageTitle>TIN TỨC</PageTitle>
            <div className={cx('blog-content-wrapper')}>
                <div className={cx('blog-wrapper')}>
                    <h4 className={cx('blog-title')}>
                        <span>{articleByID?.article_title}</span>
                    </h4>
                    <div className={cx('blog-info-wrapper')}>
                        <div className={cx('info-wrapper')}>
                            <FontAwesomeIcon className={cx('blog-info-user-icon')} icon={faUser} />
                            <h4 className={cx('blog-owner')}>
                                <span>{articleByID?.doctor_id?.username}</span>
                            </h4>
                        </div>
                        <div className={cx('info-wrapper')}>
                            <FontAwesomeIcon className={cx('blog-info-calendar-icon')} icon={faCalendar} />
                            <h4 className={cx('blog-post-date')}>
                                <span>{formatDate(articleByID?.date_published)}</span>
                            </h4>
                        </div>
                    </div>
                    <hr className={cx('list-blog-separator')}></hr>
                    <div className={cx('blog-content-container')}>
                        {
                            articleByID?.article_image && (
                                <Image className={cx('blog-image')} src={articleByID?.article_image} alt="Blog Image"></Image>
                            )
                        }
                        {renderContent()}
                    </div>
                    
                </div>
                <div className={cx('list-blog-wrapper')}>
                    <h4 className={cx('list-blog-title')}>
                        <span>BÀI VIẾT MỚI</span>
                    </h4>
                    <hr className={cx('list-blog-separator')}></hr>
                    {fiveArticles.map((article) => {
                        return <MiniBlogItem data={article}></MiniBlogItem>;
                    })}
                </div>
            </div>
        </div>
    );
}

export default BlogInfo;
