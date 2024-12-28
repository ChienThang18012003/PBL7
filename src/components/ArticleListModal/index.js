import React, { useState, useEffect } from "react";
import classNames from 'classnames/bind';
import styles from './ArticleListModal.module.scss';
import Button from "../Button";
import EditBlog from "../EditBlog";
import useArticles from "../../hook/useArticles";

const cx = classNames.bind(styles);

export default function ArticleListModal({ children, disabled = false, data: initialData }) {
  const [modal, setModal] = useState(false);
  const [selectedButton, setSelectedButton] = useState("remaining");
  const [data, setData] = useState(initialData?.article_list || []);
  const [filteredData, setFilteredData] = useState([]);
  const [
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
] = useArticles();
  let intervalId;

  const toggleModal = () => {
    if (disabled) return;
    setModal(!modal);
  };

  useEffect(() => {
    const filterData = () => {
      if (selectedButton === "remaining") {
        return data.filter((article) => article.is_deleted === false);
      }
      if (selectedButton === "deleted") {
        return data.filter((article) => article.is_deleted === true);
      }
      return data;
    };
    setFilteredData(filterData());
  }, [selectedButton, data]);

  useEffect(()=>{
  const fetchArticlesPeriodically = async () => {
      const articles = await getAllArticleByDoctor(initialData?.email, false);
      if (articles) setData(articles);
  };

  if (initialData?.is_doc) {
    intervalId = setInterval(() => {
      fetchArticlesPeriodically();
    }, 5000);
  }
  

  return () => {
      clearInterval(intervalId);
  };
  },[initialData])

  const handleUpdateData = (action, payload) => {
    if (action === "delete") {
      setData((prev) => prev.filter((article) => article._id !== payload));
    } else if (action === "update") {
      setData((prev) =>
        prev.map((article) =>
          article._id === payload._id ? { ...article, ...payload } : article
        )
      );
    }
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      <Button rounded disabled={disabled} type="button" primary onClick={toggleModal}>
        {children}
      </Button>

      {modal && (
        <div className={cx("modal")}>
          <div onClick={toggleModal} className={cx("overlay")}></div>
          <div className={cx("modal-content")}>
            <div className={cx("button-container")}>
              <button
                onClick={() => setSelectedButton("remaining")}
                className={cx("status-button", { selected: selectedButton === "remaining" })}
              >
                Remaining
              </button>
              <button
                onClick={() => setSelectedButton("deleted")}
                className={cx("status-button", { selected: selectedButton === "deleted" })}
              >
                Deleted
              </button>
            </div>
            <div className={cx("modal-field-container")}>
              {filteredData.map((article) => (
                <EditBlog
                  data={article}
                  key={article?._id}
                  onUpdateData={handleUpdateData}
                ></EditBlog>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
