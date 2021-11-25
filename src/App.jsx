import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import routes from './routes';
import './assets/style.scss';
import { AppHeader } from './cmps/App-header';
import { AppFooter } from './cmps/App-footer';
import { setLoggedInUser } from './store/user.action';

class _App extends React.Component {
    
    componentDidMount(){
        this.props.setLoggedInUser()
    }

    render() {
        return (
            <>
                <AppHeader />
                <Switch>
                    {routes.map((route) => (
                        <Route key={route.path} exact component={route.component} path={route.path} />
                    ))}
                </Switch>
                <AppFooter />
            </>
        );
    }
}

const mapDispatchToProps = {
    setLoggedInUser
}

export const App = connect(null, mapDispatchToProps)(_App)
