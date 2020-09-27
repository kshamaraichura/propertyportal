import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';

function App() {
    return (
        <BrowserRouter>   
            <Header />         
            <div>
                <Switch>
                    <Route exact path='/' component={Home} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
