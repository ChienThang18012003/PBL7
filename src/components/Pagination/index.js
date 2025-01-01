import classNames from 'classnames/bind';
import styles from './Pagination.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const Pagination = ({ totalPosts, postsPerPage, currentPage, setCurrentPage }) => {
    if (totalPosts <= postsPerPage) return null;

    let pages = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i);
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    function handlePreviousPage() {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
            scrollToTop();
        }
    }

    function handleNextPage() {
        if (currentPage < pages.length) {
            setCurrentPage((prev) => prev + 1);
            scrollToTop();
        }
    }

    function handlePageClick(page) {
        setCurrentPage(page);
        scrollToTop();
    }

    function renderUI() {
        if (pages.length <= 5) {
            return pages.map((page, index) => {
                return (
                    <button
                        key={index}
                        onClick={() => handlePageClick(page)}
                        className={cx({ active: currentPage === page })}
                    >
                        {page}
                    </button>
                );
            });
        } else {
            if (currentPage >= 4 && currentPage <= pages.length - 3) {
                return (
                    <>
                        <button onClick={() => handlePageClick(1)}>1</button>
                        <div>...</div>
                        <button onClick={() => handlePageClick(currentPage - 2)}>{currentPage - 2}</button>
                        <button onClick={() => handlePageClick(currentPage - 1)}>{currentPage - 1}</button>
                        <button className={cx({ active: true })}>{currentPage}</button>
                        <button onClick={() => handlePageClick(currentPage + 1)}>{currentPage + 1}</button>
                        <button onClick={() => handlePageClick(currentPage + 2)}>{currentPage + 2}</button>
                        <div>...</div>
                        <button onClick={() => handlePageClick(pages.length)}>{pages.length}</button>
                    </>
                );
            } else if (currentPage < 4) {
                return (
                    <>
                        <button onClick={() => handlePageClick(1)} className={cx({ active: currentPage === 1 })}>
                            1
                        </button>
                        <button onClick={() => handlePageClick(2)} className={cx({ active: currentPage === 2 })}>
                            2
                        </button>
                        <button onClick={() => handlePageClick(3)} className={cx({ active: currentPage === 3 })}>
                            3
                        </button>
                        <button onClick={() => handlePageClick(4)} className={cx({ active: currentPage === 4 })}>
                            4
                        </button>
                        <button onClick={() => handlePageClick(5)} className={cx({ active: currentPage === 5 })}>
                            5
                        </button>
                        <div>...</div>
                        <button onClick={() => handlePageClick(pages.length)}>{pages.length}</button>
                    </>
                );
            } else if (currentPage > pages.length - 3) {
                return (
                    <>
                        <button onClick={() => handlePageClick(1)}>1</button>
                        <div>...</div>
                        <button
                            onClick={() => handlePageClick(pages.length - 4)}
                            className={cx({ active: currentPage === pages.length - 4 })}
                        >
                            {pages.length - 4}
                        </button>
                        <button
                            onClick={() => handlePageClick(pages.length - 3)}
                            className={cx({ active: currentPage === pages.length - 3 })}
                        >
                            {pages.length - 3}
                        </button>
                        <button
                            onClick={() => handlePageClick(pages.length - 2)}
                            className={cx({ active: currentPage === pages.length - 2 })}
                        >
                            {pages.length - 2}
                        </button>
                        <button
                            onClick={() => handlePageClick(pages.length - 1)}
                            className={cx({ active: currentPage === pages.length - 1 })}
                        >
                            {pages.length - 1}
                        </button>
                        <button
                            onClick={() => handlePageClick(pages.length)}
                            className={cx({ active: currentPage === pages.length })}
                        >
                            {pages.length}
                        </button>
                    </>
                );
            }
        }
    }

    return (
        <div className={cx('pagination')}>
            <button onClick={handlePreviousPage}>
                <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
            </button>
            {renderUI()}
            <button onClick={handleNextPage}>
                <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
            </button>
        </div>
    );
};

export default Pagination;
