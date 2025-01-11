import React, {useContext, useEffect, useState} from 'react';
import {
    HeaderUnderline, PageInput, PaginationButton, PaginationContainer, PaginationInfo,
    SearchBar,
    SpecialitiesContainer,
    SpecialitiesContent,
    SpecialitiesHeader,
    SpecialitiesLayout,
    SpecialitiesImage
} from "./specialities.element";
import {assets} from "../../assets/assets_fe/assets";
import {AppContext} from "../../context/AppContext";
import {useNavigate, useParams} from "react-router-dom";
import {
    getPaginationRowModel,
    useReactTable
} from "@tanstack/react-table";
import useSpeciality from '../../hook/useSpeciality';
import useDebounce from '../../hook/useDebounce';
import LoadingAnimation from '../../components/LoadingAnimation';
import Image from '../../components/Image';
import Pagination from '../../components/Pagination';

const Specialities = () => {
    const navigate = useNavigate();
    const {speciality} = useParams();
    const [specialityLoading, specialityHook, , searchSpeciality, getAllSpeciality] = useSpeciality();
    const [filterSpec, setFilterSpec] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const debounced = useDebounce(searchValue, 500);

    const [currentPage, setCurrentPage] = useState(1);
    const [articlesPerPage, setArticlesPerPage] = useState(8);

    const lastArticleIndex = currentPage * articlesPerPage;
    const firstArticleIndex = lastArticleIndex - articlesPerPage;
    const currentArticles = (filterSpec || []).slice(firstArticleIndex, lastArticleIndex);

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 12,
    });

    const applyFilter = () => {
        if (speciality) {
            setFilterSpec(specialityHook.filter(doctor => doctor.speciality === speciality));
        } else {
            setFilterSpec(specialityHook);
        }
    };

    useEffect(() => {
        if (!debounced.trim()){
            setFilterSpec(specialityHook);
            return;
        }

        const fetchSearchResult = async () => {
            const relatedSpecialities = await searchSpeciality(debounced, specialityHook);
            setFilterSpec(relatedSpecialities);
            setCurrentPage(1);
        };

        fetchSearchResult();
    }, [debounced])

    useEffect(() => {
        applyFilter();
        const fetchSpecialitiesPeriodically = async () => {
            const specialities = await getAllSpeciality();
            if (specialities && Array.isArray(specialities) && searchValue !== "") setFilterSpec(specialities);
        };

        const intervalId = setInterval(() => {
            fetchSpecialitiesPeriodically();
        }, 8000);

        return () => {
            clearInterval(intervalId);
        };
    }, [specialityHook]);

    const table = useReactTable({
        data: filterSpec,
        state: {
            pagination,
        },
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
    });

    const paginatedData = filterSpec.slice(
        pagination.pageIndex * pagination.pageSize,
        (pagination.pageIndex + 1) * pagination.pageSize
    );

    if (specialityLoading) return (
        <LoadingAnimation></LoadingAnimation>
    )

    return (
        <SpecialitiesLayout>
            <SpecialitiesImage>
                <img src={assets.SpecialitiesImage2}></img>
            </SpecialitiesImage>
            <SpecialitiesContainer>
                
                <SpecialitiesHeader>DANH SÁCH CHUYÊN KHOA
                    <HeaderUnderline/>
                </SpecialitiesHeader>
                <SearchBar>
                    <img src={assets.search_icon} alt='icon'/>
                    <input type='text' placeholder='Tìm kiếm' value={searchValue} onChange={(e) => {setSearchValue(e.target.value)}}/>
                </SearchBar>

                <SpecialitiesContent >
                    {
                        currentArticles.map((item, index) => (
                            <div onClick={() => navigate(`/speciality-info/${item?._id}`)} className='card-spec' key={index}>
                                <div className='content'>
                                    <div className='image-wrapper'><Image className='speciality-img' src={item?.speciality_image} alt={item?.speciality}/></div>
                                    <p className='name-style'>{item?.name}</p>
                                </div>
                            </div>
                        ))
                    }
                </SpecialitiesContent>

                <PaginationContainer>
                <Pagination
                    totalPosts={(filterSpec || []).length || 0}
                    postsPerPage={articlesPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                ></Pagination>
                </PaginationContainer>
            </SpecialitiesContainer>
        </SpecialitiesLayout>
    );
};

export default Specialities;
