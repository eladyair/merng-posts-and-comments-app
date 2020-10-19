import React, { useState, useEffect, useContext } from 'react';
import { withRouter, Link } from 'react-router-dom';

// Context
import { AuthContext } from '../../context/auth.context';
import { logout } from '../../context/actions/auth.actions';

// Semantic Components
import { Menu } from 'semantic-ui-react';

const MenuBar = ({ history, location }) => {
    const { user, dispatch } = useContext(AuthContext);

    const path = location.pathname.substr(1) === '' ? '/' : location.pathname.substr(1);

    const [activeItem, setActiveItem] = useState(path);

    useEffect(() => {
        setActiveItem(path);
    }, [path]);

    const handleItemClick = (e, { name }) => {
        setActiveItem(name);
    };

    const handleLogout = () => {
        dispatch(logout());
        setActiveItem(path);
    };

    const menuBar = user ? (
        <Menu pointing secondary size='massive' color='teal'>
            <Menu.Item name={user.username} active as={Link} to='/' />
            <Menu.Menu position='right'>
                <Menu.Item name='logout' onClick={handleLogout} />
            </Menu.Menu>
        </Menu>
    ) : (
        <Menu pointing secondary size='massive' color='teal'>
            <Menu.Item name='home' active={activeItem === '/'} onClick={handleItemClick} as={Link} to='/' />
            <Menu.Menu position='right'>
                <Menu.Item name='register' active={activeItem === 'register'} onClick={handleItemClick} as={Link} to='/register' />
                <Menu.Item name='login' active={activeItem === 'login'} onClick={handleItemClick} as={Link} to='/login' />
            </Menu.Menu>
        </Menu>
    );
    return menuBar;
};

export default withRouter(MenuBar);
