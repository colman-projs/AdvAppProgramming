import React, { useState, useEffect, useRef } from 'react';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import { MenuItem, TextField } from '@mui/material';

import { useQuery } from '../../customHooks';
import { getCommercials } from '../../actions/commercialsActions';
import { TemplateComponents, TEMPLATE_TYPES } from '../Templates';
import Loader from '../Loader/Loader';
import {
    DEFAULT_TIME_TO_WAIT_FOR_NEXT_COMMERCIAL_IN_SECONDS,
    SCREENS,
} from '../../globals';
import { socket } from '../../socket';

import './CommercialScreen.scss';

function CommercialScreen() {
    const [commercial, setCommercial] = useState(null);
    const [template, setTemplate] = useState(TEMPLATE_TYPES.DefaultTemplate);
    const [commercials, setCommercials] = useState([]);
    const [ignoreTimeSets, setIgnoreTimeSets] = useState(false);
    const [loading, setLoading] = useState(false);
    const [screen, setScreen] = useState(null);
    const alert = useAlert();
    const timeoutId = useRef();
    let query = useQuery();
    let navigate = useNavigate();

    useEffect(() => {
        const fetchCommercials = async () => {
            setLoading(true);
            const res = await getCommercials(screen);

            if (res) {
                console.log(res);
                setCommercials(res);
            } else alert.error('Error while loading commercials');

            setLoading(false);
        };

        if (!screen) return;

        fetchCommercials();

        socket.on('updateCommerical', () => {
            fetchCommercials();
            console.log("commericals updated");
        });

    }, [screen, alert]);

    useEffect(() => {
        const testTimeSet = (timeSet) => {
            const currDate = new Date();
            const time = `${currDate.getHours()}${currDate.getMinutes()}${currDate.getSeconds()}`;

            return (
                (timeSet.daysInWeek.length === 0 ||
                    timeSet.daysInWeek.includes(currDate.getDay())) &&
                currDate >= timeSet.startDate &&
                currDate <= timeSet.endDate &&
                time >= timeSet.startTime &&
                time <= timeSet.endTime
            );
        };

        const getCommercialToShowByTimeSet = () => {
            return commercials.find((commercial) =>
                commercial.timeSets.some((set) => testTimeSet(set)),
            );
        };

        const getCommercialToShow = () => {
            let nextCommercialIndex = 0;
            const currentCommercialIndex = commercials.findIndex(
                (comm) => comm.name === commercial?.name,
            );

            if (commercials[currentCommercialIndex]) {
                nextCommercialIndex =
                    (currentCommercialIndex % commercials.length) + 1;
            }

            return commercials[nextCommercialIndex];
        };

        const getNextCommercial = () => {
            console.log('Try to get next commercial');
            const currCommercial = ignoreTimeSets
                ? getCommercialToShow()
                : getCommercialToShowByTimeSet();

            setTemplate(
                currCommercial?.template || TEMPLATE_TYPES.DefaultTemplate,
            );
            setCommercial(currCommercial);

            clearTimeout(timeoutId.current);
            timeoutId.current = setTimeout(
                () => getNextCommercial(),
                (currCommercial?.durationInSeconds ||
                    DEFAULT_TIME_TO_WAIT_FOR_NEXT_COMMERCIAL_IN_SECONDS) * 1000,
            );
        };

        if (commercials.length) getNextCommercial();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [commercials, ignoreTimeSets]);

    useEffect(() => {
        const screenId = query.get('screen');

        setScreen(screenId);

        const disableTimeSet = query.get('loop');

        setIgnoreTimeSets(disableTimeSet);
    }, [query]);

    const renderCommercial = () => {
        if (loading) return <Loader text="loading commercials..." />;

        if (!screen)
            return (
                <div className="main center">
                    <div className="screen-field">
                        <h1>Choose a Screen:</h1>
                        <TextField
                            select
                            className="select-screen"
                            label="Screen Id"
                            onChange={(e) => {
                                socket.emit('screen', e.target.value);
                                navigate(`/?screen=${e.target.value}`);
                            }}
                        >
                            {SCREENS.map((screenId) => (
                                <MenuItem key={screenId} value={screenId}>
                                    {screenId}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                </div>
            );

        if (!commercial)
            return (
                <div className="no-ad center">
                    No commercials to show at the moment
                </div>
            );

        return TemplateComponents[template](commercial);
    };

    return <>{renderCommercial()}</>;
}

export default CommercialScreen;
