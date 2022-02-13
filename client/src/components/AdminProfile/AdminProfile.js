import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';

import './AdminProfile.scss';

function AdminProfile() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();

        // TODO: Call server to update username, password
    }

    return (
        <form onSubmit={handleSubmit} className="admin-profile-edit center">
            <h1>Admin Profile Settings: </h1>
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
            <Button
                className="edit-button"
                variant="contained"
                color="primary"
                type="submit"
            >
                Update details
            </Button>
        </form>
    );
}

export default AdminProfile;
