import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Semantic Components
import { Container } from 'semantic-ui-react';

// Styles
import './App.css';

// Components
import AuthRoute from './hoc/auth-route';
import MenuBar from './components/menu/menu';
import Home from './pages/home/home';
import SinglePost from './pages/single-post/single-post';
import Register from './pages/register/register';
import Login from './pages/login/login';

function App() {
    return (
        <Container>
            <MenuBar />
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/posts/:postId' component={SinglePost} />
                <AuthRoute exact path='/register' component={Register} />
                <AuthRoute exact path='/login' component={Login} />
            </Switch>
        </Container>
    );
}

export default App;
