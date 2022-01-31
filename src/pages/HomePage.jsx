import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

const Homepage = () => {
    const history = useHistory();
    const navigateTo = (path) => {
        history.push(path);
    }
    return (
        <div>
            <h1>HOMEPAGE</h1>
            <button onClick={() => navigateTo('/login')}>
                Go to login
            </button>
            <button onClick={() => navigateTo('/register')}>
                Go to register
            </button>
            <button onClick={() => navigateTo('/tasks')}>
                Go to tasks
            </button>
        </div>
    );
}

export default Homepage;
