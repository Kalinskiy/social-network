import React from 'react';
import {New} from "./New/New";


let News = (props: any) => {
    return <>
        {props.news.map((n: any) =>
            <New
                key={n.id}
                title={n.title}
                urlToImage={n.urlToImage}
                description={n.description}
                publishedAt={n.publishedAt}
            />
        )}
    </>

}


export default News