import classNames from 'classnames/bind';
import styles from './Blog.module.scss';
import PageTitle from '../../components/PageTitle';
import BlogItem from '../../components/BlogItem';
import useArticles from '../../hook/useArticles';
import { useState, useEffect } from 'react';
import Pagination from '../../components/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import useDebounce from '../../hook/useDebounce';
import LoadingAnimation from '../../components/LoadingAnimation';

const cx = classNames.bind(styles);
function Blog() {
    const [
        articlesHook,
        ,
        ,
        loading,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        searchArticle,
        ,
        ,
        ,
        ,
        ,
        getAllArticles
    ] = useArticles();
    
    const [currentPage, setCurrentPage] = useState(1);
    const [articlesPerPage, setArticlesPerPage] = useState(4);
    const [filteredArticle, setFilteredArticle] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const debounced = useDebounce(searchValue, 500);

    const lastArticleIndex = currentPage * articlesPerPage;
    const firstArticleIndex = lastArticleIndex - articlesPerPage;
    const currentArticles = (filteredArticle || []).slice(firstArticleIndex, lastArticleIndex);

    useEffect(() => {
        if (!debounced.trim()) {
            setFilteredArticle(articlesHook || []);
            return;
        }
    
        const fetchSearchResult = () => {
            const relatedArticles = searchArticle(debounced, articlesHook || []);
            setFilteredArticle(relatedArticles);
            setCurrentPage(1);
        };
    
        fetchSearchResult();
    }, [debounced, articlesHook]);
    

    useEffect(()=>{
       setFilteredArticle(articlesHook);

        const fetchArticlesPeriodically = async () => {
            const articles = await getAllArticles();
            console.log(articles);
            if (articles && Array.isArray(articles) && searchValue !== "") setFilteredArticle(articles);
        };

        const intervalId = setInterval(() => {
            fetchArticlesPeriodically();
        }, 5000);

        return () => {
            clearInterval(intervalId);
        };
    },[articlesHook])

    if (loading) return (
        <LoadingAnimation></LoadingAnimation>
    )

    

    return (
        <div className={cx('wrapper')}>
            <PageTitle>TIN TỨC</PageTitle>
            <div className={cx('search-section')}>
                 <div className = {cx('search-bar')}>
                      <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('search-bar_icon')}></FontAwesomeIcon>
                      <input className={cx('search-input')} placeholder='Tìm kiếm bài báo' value={searchValue} onChange={(e)=>{setSearchValue(e.target.value)}}></input>
                 </div>
            </div>
            <div className={cx('blog-items')}>
                {currentArticles.map((article) => (
                    <BlogItem key={article?._id} data={article}></BlogItem>
                ))}
            </div>
            <div className={cx('pagination')}>
                <Pagination
                    totalPosts={(filteredArticle || []).length || 0}
                    postsPerPage={articlesPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                ></Pagination>
            </div>
        </div>
    );
}

export default Blog;
