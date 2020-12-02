import React from "react";
import {New} from "./New/New";
import {NewItemType} from "../../api/news-api";

type PropsType = {
    news:Array<NewItemType>
    getNews:()=>void

}
const News:React.FC<PropsType> = (props) => {
    return <>
        {props.news.map((n) =>
            <New
                key={n.source.id}
                title={n.title}
                urlToImage={n.urlToImage}
                description={n.description}
                publishedAt={n.publishedAt}
            />
        )}
    </>

}


export default News