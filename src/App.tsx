import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import NewsContainer from "./components/News/NewsContainer";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";
import {compose} from "redux";
import {withSuspense} from "./hoc/withSuspense";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const UsersContainer = React.lazy(() => import("./components/Users/UsersContainer"));


class App extends React.Component<any> {

    componentDidMount(): void {
        this.props.initializeApp()
    }

    componentWillUnmount(): void {
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div>
                <div className="app-wrapper">
                    <HeaderContainer/>
                    <Navbar/>
                    <div className="app-wrapper-content">
                        <Switch>
                            <Route exact path={"/"} render={() => <Redirect to="/profile"/>}/>
                            <Route path="/profile/:userId?" render={withSuspense(ProfileContainer)}/>
                            <Route path="/dialogs" render={withSuspense(DialogsContainer)}/>
                            <Route path="/users" render={withSuspense(UsersContainer)}/>
                            <Route path="/news" render={withSuspense(NewsContainer)}/>
                            <Route path="/music" render={() => <Music/>}/>
                            <Route path="/settings" render={() => <Settings/>}/>
                            <Route path="/login" render={() => <LoginPage/>}/>
                            <Route exact path="*" render={() => <div>404 NOT FOUND</div>}/>
                        </Switch>
                    </div>

                </div>
            </div>

        );
    }
}

const mapStateToProps = (state: any) => ({
    initialized: state.app.initialized
})
let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App) as React.ComponentClass;

export let SamuraiJSApp = (props: any) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}
export default SamuraiJSApp


