import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { authenticate } from '../../actions/adminActions';

import './AdminLogin.scss';

function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { isAdmin, setIsAdmin } = useContext(AdminContext);

    let navigate = useNavigate();

    useEffect(() => {
        if (isAdmin) return navigate('/');
    }, [isAdmin, navigate]);

    function handleSubmit(e) {
        e.preventDefault();

        const authenticated = authenticate(username, password);

        if (authenticated) setIsAdmin(true);
    }

    return (
        <form onSubmit={handleSubmit} className="login center">
            <TextField
                autoFocus
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" type="submit">
                Login
            </Button>
        </form>
    );
}

export default AdminLogin;
