import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogged } from '../helpers/AuthHandler';

// ...rest = props da Route. Ex: exact, path...
export default ({ children, ...rest }) => {
    let logged = isLogged();
    let authorized = (rest.private && !logged) ? false : true;

    return (
        <Route 
            {...rest}
            render={() => 
                authorized ? children : <Redirect to="signin" />
            }
        />
    );
}