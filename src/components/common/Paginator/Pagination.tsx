import React, {useState} from 'react';
import s from './Paginator.module.css';
import cn from 'classnames'


export type PaginatorType = {
    pageSize: number,
    currentPage: number,
    onPageChanged: (pageNumber: number) => void
    totalItemsCount: number,
    portionSize?: number


}

let Pagination: React.FC<PaginatorType> = ({totalItemsCount, pageSize,
                                          currentPage = 1,
                                          onPageChanged = x => x,
                                          portionSize = 10}) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize) / 50;
    // let pagesCount = 30
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    const portionCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = useState(1)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize
    return <div className={cn(s.paginator)}>
        { portionNumber > 1 &&
        <button onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</button> }

        {pages
            .filter(p => p >= leftPortionPageNumber && p<=rightPortionPageNumber)
            .map((p) => {
                return <span className={ cn({
                    [s.selectedPage]: currentPage === p
                }, s.pageNumber) }
                             key={p}
                             onClick={(e) => {
                                 onPageChanged(p);
                             }}>{p}</span>
            })}
        { portionCount > portionNumber &&
        <button onClick={() => { setPortionNumber(portionNumber + 1) }}>NEXT</button> }


    </div>
}
export default Pagination