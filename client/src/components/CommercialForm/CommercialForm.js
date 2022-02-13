import { Button, MenuItem, TextField } from '@mui/material';
import { useAlert } from 'react-alert';
import React, { useCallback, useEffect, useState } from 'react';

import Loader from '../Loader/Loader';
import {
    deleteCommercial,
    getCommercials,
    upsertCommercial,
} from '../../actions/commercialsActions';

import './CommercialForm.scss';

function CommercialForm({ isEdit }) {
    const [commercial, setCommercial] = useState(null);
    const [loading, setLoading] = useState(false);
    const [commercials, setCommercials] = useState([]);

    const alert = useAlert();

    const fetchCommercials = useCallback(async () => {
        setLoading(true);
        const res = await getCommercials();

        if (res) {
            console.log(res);
            setCommercials(res);
        } else alert.error('Error while loading commercials');

        setLoading(false);
    }, [alert]);

    useEffect(() => {
        if (isEdit) fetchCommercials();
    }, [isEdit, fetchCommercials]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const res = await upsertCommercial(commercial);

        if (res) {
            alert.success(
                `The commercial was ${
                    isEdit ? 'Updated' : 'Added'
                } successfuly`,
            );
            await fetchCommercials();
        } else alert.error('Error while updating commercials');

        setLoading(false);
    };

    const onDeleteCommercial = async () => {
        setLoading(true);

        const res = await deleteCommercial(commercial.id);

        if (res) {
            await fetchCommercials();
        } else alert.error('Error while deleting commercial');

        setCommercial(null);

        setLoading(false);
    };

    // TODO: Add all commercial form fields

    return (
        <form onSubmit={handleSubmit} className="commercial-form center">
            {loading ? (
                <Loader />
            ) : (
                <>
                    {isEdit && (
                        <TextField
                            select
                            className="select-screen"
                            label="Commercial"
                            onChange={(e) => setCommercial(e.target.value)}
                            value={commercial}
                        >
                            {commercials.map((comm) => (
                                <MenuItem key={comm._id} value={comm}>
                                    {comm.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                    <div className="actions">
                        <Button
                            variant="contained"
                            onClick={() => setCommercial(null)}
                        >
                            Clear
                        </Button>
                        {isEdit && (
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={onDeleteCommercial}
                            >
                                Delete
                            </Button>
                        )}
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            {isEdit ? 'Save' : 'Create'}
                        </Button>
                    </div>
                </>
            )}
        </form>
    );
}

export default CommercialForm;
