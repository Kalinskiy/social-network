import React, {useState} from "react"
import s from "./Paginator.module.css"
import cn from "classnames"


type PropsType = {
    pageSize: number,
    currentPage: number,
    onPageChanged: (pageNumber: number) => void
    totalItemsCount: number,
    portionSize?: number


}

let Pagination: React.FC<PropsType> = ({
                                           totalItemsCount, pageSize,
                                           currentPage = 1,
                                           onPageChanged = x => x,
                                           portionSize = 10
                                       }) => {

    const [portionNumber, setPortionNumber] = useState(1)

    let pagesCount = Math.ceil(totalItemsCount / pageSize) ;
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    const portionCount = Math.ceil(pagesCount / portionSize)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize
    return <div className={cn(s.paginator)}>
        {portionNumber > 1 &&
        <span className={s.prev} onClick={() => {
            setPortionNumber(portionNumber - 1)
        }}>PREV</span>}

        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map((p) => {
                return <span className={cn({
                    [s.selectedPage]: currentPage === p
                }, s.pageNumber)}
                             key={p}
                             onClick={(e) => {
                                 onPageChanged(p);
                             }}>{p}</span>
            })}
        {portionCount > portionNumber &&
        <span className={s.next} onClick={() => {
            setPortionNumber(portionNumber + 1)
        }}>NEXT</span>}


    </div>
}
export default Pagination