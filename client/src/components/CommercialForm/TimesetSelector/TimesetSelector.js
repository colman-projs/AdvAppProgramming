import React, { useState } from 'react';
import { Chip, FormControl, TextField } from '@mui/material';

function TimesetSelector({ timesets, onChange }) {
    const [timeset, setTimeset] = useState({
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        daysInWeek: [],
    });

    const onDelete = () => {
        //TODO
    };

    return (
        <FormControl>
            <TextField
                label="Start date"
                type="date"
                value={timeset.startDate}
                onChange={e => {
                    setTimeset(prev => ({
                        ...prev,
                        startDate: e.target.value,
                    }));
                }}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                label="End date"
                type="date"
                value={timeset.endDate}
                onChange={e => {
                    setTimeset(prev => ({ ...prev, endDate: e.target.value }));
                }}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                label="Start time"
                type="time"
                value={timeset.startTime}
                onChange={e => {
                    setTimeset(prev => ({
                        ...prev,
                        startTime: e.target.value,
                    }));
                }}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                label="End time"
                type="time"
                value={timeset.endTime}
                onChange={e => {
                    setTimeset(prev => ({ ...prev, endTime: e.target.value }));
                }}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <div>
                {timesets.map(t => (
                    <Chip label="TODO" onDelete={onDelete} />
                ))}
            </div>
        </FormControl>
    );
}

export default TimesetSelector;
