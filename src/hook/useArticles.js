import { useState, useEffect } from 'react';
import Article_API from '../API/Article_API';

const useArticles = () => {
    const [articlesHook, setArticlesHook] = useState([]);
    const [firstArticle, setFirstArticle] = useState({});
    const [fourArticles, setFourArticles] = useState([]);
    const [loading, isLoading] = useState(false);
    const filterFirstArticle = (data) => {
        return data.slice().sort((a, b) => new Date(b.date_published) - new Date(a.date_published))[0];
    };
    const filterFourArticles = (data) => {
        
        return data
            .slice()
            .sort((a, b) => new Date(b.date_published) - new Date(a.date_published))
            .slice(1, Math.min(5, data.length)); 
    };
    const sortArticles = (data) => {
        return data.sort((a, b) => new Date(b.date_published) - new Date(a.date_published))
    }

    const filterArticles = async () => {
        isLoading(true);
        try {
            const allArticles = await Article_API.get_All_Article();
            const sortedArticles = sortArticles(allArticles);
            setArticlesHook(sortedArticles);
            setFirstArticle(filterFirstArticle(allArticles));
            setFourArticles(filterFourArticles(allArticles));
        } catch (error) {
            console.error('Failed to fetch articles:', error);
        } finally {
            isLoading(false);
        }
    };

    const getAllArticles = async () => {
        try {
            const allArticles = await Article_API.get_All_Article();
            const sortedArticles = sortArticles(allArticles);
            setFirstArticle(filterFirstArticle(allArticles));
            setFourArticles(filterFourArticles(allArticles));
            return sortedArticles;
        } catch (error) {
            console.error('Failed to fetch articles:', error);
            return null;
        } finally {
        }
    };
    useEffect(() => {
        filterArticles();
    }, []);

    const addComment = async (articleId, email, content) => {
        isLoading(true);
        try {
            await Article_API.addComment(articleId, email, content);
        } catch (error) {
            console.error('Failed to add comment:', error);
            return null;
        } finally {
            isLoading(false);
        }
    };

    const addArticle = async (email, article_title, article_content, article_image) => {
        isLoading(true);
        try {
            const newArticle = await Article_API.addArticle(email, article_title, article_content, article_image);
            return newArticle;
        } catch (error) {
            console.error('Failed to add article:', error);
            return null;
        } finally {
            isLoading(false);
        }
    };

    const getArticlesByDoctor = async (doctorEmail, article_id) => {
        isLoading(true);
        try {
            const articleByDoctor = await Article_API.getArticlesByDoctor(doctorEmail);
            const filteredArticles = articleByDoctor.filter((article) => article._id !== article_id);
            return filteredArticles;
        } catch (error) {
            console.error('Failed to get articles by doctor:', error);
            return null;
        } finally {
            isLoading(false);
        }
    };

    const getArticlesByID = async (id) => {
        isLoading(true);
        try {
            const articleByID = await Article_API.getArticlesByID(id);
            return articleByID;
        } catch (error) {
            console.error('Failed to get articles by ID:', error);
            return null;
        } finally {
            isLoading(false);
        }
    };

    const getArticlesBySpecialty = async (specialtyName, sortBy) => {
        isLoading(true);
        try {
            const articleBySpecialty = await Article_API.getArticlesBySpecialty(specialtyName);
            if (!articleBySpecialty) return null;
            if (!sortBy) return articleBySpecialty;
            let filteredArticles;
            if (sortBy && sortBy === 'A-Z')
                filteredArticles = articleBySpecialty
                    .slice()
                    .sort((a, b) => a.article_title.localeCompare(b.article_title));
            else if (sortBy && sortBy === 'Z-A')
                filteredArticles = articleBySpecialty
                    .slice()
                    .sort((a, b) => b.article_title.localeCompare(a.article_title));
            return filteredArticles;
        } catch (error) {
            console.error('Failed to get articles by Speciality:', error);
            return null;
        } finally {
            isLoading(false);
        }
    };

    const getFiveLatestArticles = async (excludeId) => {
        isLoading(true);
        try {
            const allArticles = await Article_API.get_All_Article();
            let filteredArticles;
            if (excludeId){
                filteredArticles = allArticles
                .slice()
                .sort((a, b) => new Date(b.date_published) - new Date(a.date_published))
                .filter((article) => article._id !== excludeId);
            }
            else {
                filteredArticles = allArticles
                .slice()
                .sort((a, b) => new Date(b.date_published) - new Date(a.date_published))
            }
                 

            return filteredArticles.slice(0, 5);
        } catch (error) {
            console.error('Failed to fetch and filter articles:', error);
            return [];
        }
        finally {
            isLoading(false);
        }
    };

    const getFiveLatestArticlesList = async (excludeId) => {
        try {
            const allArticles = await Article_API.get_All_Article();
            let filteredArticles;
            if (excludeId){
                filteredArticles = allArticles
                .slice()
                .sort((a, b) => new Date(b.date_published) - new Date(a.date_published))
                .filter((article) => article._id !== excludeId);
            }
            else {
                filteredArticles = allArticles
                .slice()
                .sort((a, b) => new Date(b.date_published) - new Date(a.date_published))
            }
                 

            return filteredArticles.slice(0, 5);
        } catch (error) {
            console.error('Failed to fetch and filter articles:', error);
            return [];
        }
        finally {
        }
    };

    const getFourLatestArticles = async () => {
        isLoading(true);
        try {
            const allArticles = await Article_API.get_All_Article();

            const filteredArticles = allArticles
                .slice()
                .sort((a, b) => new Date(b.date_published) - new Date(a.date_published))

            return filteredArticles.slice(0, 4);
        } catch (error) {
            console.error('Failed to fetch and filter articles:', error);
            return [];
        }
        finally {
            isLoading(false);
        }
    };

    const searchArticle = (searchValue, displayedArticles) => {
        if (!searchValue) return sortArticles(displayedArticles);

        return sortArticles(displayedArticles.filter((article) =>
            article.article_title.toUpperCase().includes(searchValue.toUpperCase()))
        );
    };

    const getAllArticleByDoctor = async(email, load = true) => {
        if (load) isLoading(true);
        try {
            const allArticles = await Article_API.get_All_Article_By_Doctor(email);
            return allArticles;
        } catch (error) {
            console.error('Failed to fetch and filter articles:', error);
            return [];
        }
        finally {
            if (load) isLoading(false);
        }
    }

    const softDeleteArticle = async(articleId) => {
        isLoading(true);
        try {
            const deletedArticle = await Article_API.soft_Delete_Article(articleId);
            return deletedArticle;
        } catch (error) {
            console.error('Failed to delete article:', error);
            return null;
        }
        finally {
            isLoading(false);
        }
    }

    const permaDeleteArticle = async(articleId) => {
        isLoading(true);
        try {
            const deletedArticle = await Article_API.perma_Delete_Article(articleId);
            return deletedArticle;
        } catch (error) {
            console.error('Failed to delete article:', error);
            return null;
        }
        finally {
            isLoading(false);
        }
    }

    const restoreArticle = async(articleId) => {
        isLoading(true);
        try {
            const restoredArticle = await Article_API.restore_Article(articleId);
            return restoredArticle;
        } catch (error) {
            console.error('Failed to restore article:', error);
            return null;
        }
        finally {
            isLoading(false);
        }
    }

    const updateArticle = async(articleId, articleTitle, articleContent, articleImage) => {
        isLoading(true);
        try {
            const restoredArticle = await Article_API.updateArticle(articleId, articleTitle, articleContent, articleImage);
            return restoredArticle;
        } catch (error) {
            console.error('Failed to restore article:', error);
            return null;
        }
        finally {
            isLoading(false);
        }
    }

    return [
        articlesHook,
        firstArticle,
        fourArticles,
        loading,
        getArticlesByDoctor,
        getArticlesBySpecialty,
        getArticlesByID,
        addComment,
        addArticle,
        getFiveLatestArticles,
        getFourLatestArticles,
        searchArticle,
        getAllArticleByDoctor,
        softDeleteArticle,
        permaDeleteArticle,
        restoreArticle,
        updateArticle,
        getAllArticles,
        getFiveLatestArticlesList
    ];
};
export default useArticles;
