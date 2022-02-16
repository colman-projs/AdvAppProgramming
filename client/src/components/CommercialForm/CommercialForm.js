import {
    Button,
    Checkbox,
    InputAdornment,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
} from '@mui/material';
import { useAlert } from 'react-alert';
import React, { useCallback, useEffect, useState } from 'react';

import Loader from '../Loader/Loader';
import {
    deleteCommercial,
    getCommercials,
    upsertCommercial,
} from '../../actions/commercialsActions';
import TimesetSelector from './TimesetSelector/TimesetSelector';

import './CommercialForm.scss';
import { SCREENS } from '../../globals';
import { TEMPLATE_TYPES } from '../Templates';

function CommercialForm({ isEdit }) {
    const [commercials, setCommercials] = useState([]);
    const [commercial, setCommercial] = useState({
        name: '',
        messages: [],
        images: [],
        template: null,
        durationInSeconds: 0,
        screenId: [],
        timeSets: [],
    });

    const [loading, setLoading] = useState(false);

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

    const handleChangeScreen = event => {
        const {
            target: { value },
        } = event;
        setCommercial(prev => ({
            ...prev,
            screenId: typeof value === 'string' ? value.split(',') : value,
        }));
    };

    const handleChangeField = property => e => {
        setCommercial(prev => ({
            ...prev,
            [property]: e.target.value,
        }));
    };

    const handleSubmit = async e => {
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

        const res = await deleteCommercial(commercial._id);

        if (res) {
            await fetchCommercials();
        } else alert.error('Error while deleting commercial');

        setCommercial(null);

        setLoading(false);
    };

    // TODO: Add all commercial form fields
    const fields = (
        <>
            <TextField
                label="Name"
                value={commercial.name}
                onChange={handleChangeField('name')}
            />
            <TextField
                label="Messages"
                multiline
                value={commercial.messages}
                onChange={handleChangeField('messages')}
            />
            <TextField
                label="Images"
                multiline
                value={commercial.images}
                onChange={handleChangeField('images')}
            />

            <Select
                label="Template"
                value={commercial.template}
                onChange={handleChangeField('template')}
            >
                {Object.keys(TEMPLATE_TYPES).map(t => (
                    <MenuItem value={TEMPLATE_TYPES[t]}>{t}</MenuItem>
                ))}
            </Select>

            <TextField
                label="Duration"
                type="number"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">s</InputAdornment>
                    ),
                }}
            />

            <InputLabel htmlFor="select-screen-label">Screens</InputLabel>
            <Select
                labelId="select-screen-label"
                multiple
                value={commercial.screenId}
                onChange={handleChangeScreen}
                input={<OutlinedInput label="screens" />}
                renderValue={selected => selected.join(', ')}
            >
                {SCREENS.map(s => (
                    <MenuItem key={s} value={s}>
                        <Checkbox
                            checked={commercial.screenId.indexOf(s) > -1}
                        />
                        <ListItemText primary={s} />
                    </MenuItem>
                ))}
            </Select>
            <TimesetSelector timesets={commercial.timeSets} onChange={null} />
        </>
    );

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
                            onChange={e => setCommercial(e.target.value)}
                            value={commercial}
                        >
                            {commercials.map(comm => (
                                <MenuItem key={comm._id} value={comm}>
                                    {comm.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                    {fields}
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
