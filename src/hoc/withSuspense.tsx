import React from "react";
import Preloader from "../components/common/Preloader/Preloader";


export function withSuspense<WCP>(WrappedCOmponent: React.ComponentType<WCP>)  {
    return (props: WCP) => {

        return <React.Suspense fallback={<Preloader/>}>
            <WrappedCOmponent {...props}/>
        </React.Suspense>
    }
}

