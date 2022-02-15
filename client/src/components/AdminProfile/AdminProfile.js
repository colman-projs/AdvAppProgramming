import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import { updateDetails } from '../../actions/adminActions';
import Loader from '../Loader/Loader';

import './AdminProfile.scss';

function AdminProfile() {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const alert = useAlert();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        const res = await updateDetails(username, password);

        if (res) alert.success('Admin details were updated successfuly');
        else alert.error("Couldn't update admin details");

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="admin-profile-edit center">
            {loading ? (
                <Loader />
            ) : (
                <>
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
                </>
            )}
        </form>
    );
}

export default AdminProfile;
