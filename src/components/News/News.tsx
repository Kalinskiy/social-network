import React, {useEffect} from 'react';


let Users = (props: any) => {
    console.log(props)
    return <>
        {/* с {props.news.map} не работает*/}
        {props.news.length>0?props.news[11].content:''}
        {props.news.map((n:any)=> {
            return <div>{n.title}</div>
        } )}
        {/*{props.news.length>0? props.news.forEach((e:any)=>{return <span>{e}</span>;}):''}*/}



    </>
}

export default Users