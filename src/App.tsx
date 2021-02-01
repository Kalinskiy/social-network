import React from "react"
import "./App.css"
import {BrowserRouter, HashRouter, Redirect, Route, Switch, withRouter} from "react-router-dom"
import Music from "./components/Music/Music"
import Settings from "./components/Settings/Settings"
import HeaderContainer from "./components/Header/HeaderContainer"
import LoginPage from "./components/Login/Login"
import NewsContainer from "./components/News/NewsContainer"
import {connect, Provider} from "react-redux"
import {initializeApp} from "./redux/app-reducer"
import Preloader from "./components/common/Preloader/Preloader"
import store, {AppStateType} from "./redux/redux-store"
import {compose} from "redux"
import {withSuspense} from "./hoc/withSuspense"
import NavBar from "./components/Navbar/NavBar"


const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"))
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"))
const UsersContainer = React.lazy(() => import("./components/Users/UsersContainer"))

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}
const SuspendedProfile = withSuspense(ProfileContainer)
const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedUser = withSuspense(UsersContainer)
const SuspendedNews = withSuspense(NewsContainer)

class App extends React.Component<MapPropsType & DispatchPropsType> {

    componentDidMount(): void {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div>
                <div className="app-wrapper">
                    <HeaderContainer/>
                    <NavBar/>
                    <div className="app-wrapper-content">
                        <HashRouter>
                            <Route exact path={"/social-network/"} render={() => <Redirect to="/profile"/>}/>
                            <Route path="social-network/profile/:userId?" render={() => <SuspendedProfile/>}/>
                            <Route path="/social-network/dialogs" render={() => <SuspendedDialogs/>}/>
                            <Route path="/social-network/users" render={() => <SuspendedUser/>}/>
                            <Route path="/social-network/news" render={() => <SuspendedNews/>}/>
                            <Route path="/social-network/music" render={() => <Music/>}/>
                            <Route path="/social-network/settings" render={() => <Settings/>}/>
                            <Route path="/social-network/login" render={() => <LoginPage/>}/>
                            <Route exact path="/*" render={() => <div>404 NOT FOUND</div>}/>
                        </HashRouter>
                    </div>

                </div>
            </div>

        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})
const AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App)

export const SamuraiJSApp = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}
export default SamuraiJSApp


