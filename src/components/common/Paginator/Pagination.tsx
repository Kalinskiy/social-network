import React from 'react';
import s from './Paginator.module.css';


export type PaginatorType = {
    pageSize: number,
    currentPage: number,
    onPageChanged: (pageNumber: number) => void
    totalUsersCount: number,


}

let Pagination = ({totalUsersCount, pageSize, currentPage, onPageChanged}: PaginatorType) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize) / 50;
    // let pagesCount = 30
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return <>
        {pages.map(p => {

            return <span className={currentPage === p? s.selectedPage:''}
                         onClick={(e) => {
                             onPageChanged(p);
                         }}>{p} </span>
        })}
    </>


}

export default Pagination