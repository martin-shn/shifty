import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './routes';
import './assets/style.scss';
import { AppHeader } from './cmps/App-header';
import { AppFooter } from './cmps/App-footer';

export class App extends React.Component {
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
