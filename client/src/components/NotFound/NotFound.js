import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

import './NotFound.scss';

const NotFound = () => (
    <div className="not-found center">
        <h1>404 - Not Found!</h1>
        <Link to="/">
            <Button variant="contained" color="primary">
                Go Home
            </Button>
        </Link>
    </div>
);

export default NotFound;
