import React from 'react';
import {connect} from 'react-redux';
import {AppStoreType} from "../../redux/redux-store";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from 'redux';
import News from "./News";
import {getNews} from "../../redux/news-reducer";
import Preloader from "../common/Preloader/Preloader";

class NewsContainer extends React.Component<any> {
    componentDidMount(): void {
        this.props.getNews1();
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> :
                <News
                    news={this.props.news}
                    getNews={this.props.getNews}

                />
            }

        </>
    }
}

const mapStateToProps = (state: AppStoreType) => {
    return {
        news: state.news.news,
        isFetching: state.app.isFetching
    }
}

let mapDispatchToProps = (dispatch: any) => ({
    getNews1: () => dispatch(getNews())
})


export default compose<React.ComponentType>(
    WithAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps)
)(NewsContainer)