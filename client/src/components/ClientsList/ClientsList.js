import { Button, TextField } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { getClients } from '../../actions/adminActions';
import Loader from '../Loader/Loader';
import { socket } from '../../socket';

import './ClientsList.scss';

function ClientsList() {
    const [loading, setLoading] = useState(false);
    const [clients, setClients] = useState([]);

    const alert = useAlert();

    const fetchClients = useCallback(async () => {
        setLoading(true);

        const res = await getClients();
        if (res) {
            console.log(res);
            setClients(res);
        } else alert.error('Error while loading clients');

        setLoading(false);
    }, [alert]);

    useEffect(() => {
        fetchClients();

        socket.on('updateClients', function () {
            fetchClients();
        });
    }, [fetchClients]);

    return (
        <div>
            {' '}
            {loading ? (
                <Loader />
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Screen</th>
                            <th>Connect Time</th>
                            <th>Disconnect Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client, i) => {
                            return (
                                <tr>
                                    <td>{client._id}</td>
                                    <td>{client.screenId}</td>
                                    <td>
                                        {new Date(
                                            client.connected,
                                        ).toLocaleDateString()}
                                    </td>
                                    <td>
                                        {client.disconnected
                                            ? new Date(
                                                  client.disconnected,
                                              ).toLocaleDateString()
                                            : ''}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}{' '}
        </div>
        // <form onSubmit={handleSubmit} className="admin-profile-edit center">
        //     {loading ? (
        //         <Loader />
        //     ) : (
        //         <>
        //             <h1>Admin Profile Settings: </h1>
        //             <TextField
        //                 autoFocus
        //                 label="Username"
        //                 value={username}
        //                 onChange={(e) => setUsername(e.target.value)}
        //             />
        //             <TextField
        //                 type="password"
        //                 label="Password"
        //                 value={password}
        //                 onChange={(e) => setPassword(e.target.value)}
        //             />
        //             <Button
        //                 className="edit-button"
        //                 variant="contained"
        //                 color="primary"
        //                 type="submit"
        //             >
        //                 Update details
        //             </Button>
        //         </>
        //     )}
        // </form>
    );
}

export default ClientsList;
