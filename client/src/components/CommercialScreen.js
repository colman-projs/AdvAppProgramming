import React, { useState, useEffect } from 'react';
import { useAlert } from 'react-alert';

import { useQuery } from '../customHooks';
import { getCommercials } from '../actions/commercialsActions';
import { TemplateComponents, TEMPLATE_TYPES } from './Templates';
import Loader from './Loader/Loader';
import { DEFAULT_TIME_TO_WAIT_FOR_NEXT_COMMERCIAL_IN_SECONDS } from '../globals';

import './CommercialScreen.scss';

function CommercialScreen() {
    const [commercial, setCommercial] = useState(null);
    const [template, setTemplate] = useState(TEMPLATE_TYPES.DefaultTemplate);
    const [commercials, setCommercials] = useState([]);
    const [ignoreTimeSets, setIgnoreTimeSets] = useState(false);
    const [loading, setLoading] = useState(false);
    const [screen, setScreen] = useState(0);
    const alert = useAlert();
    let query = useQuery();

    useEffect(() => {
        const fetchCommercials = async () => {
            setLoading(true);
            const res = await getCommercials();

            if (res.commercials) {
                console.log(res);
                setCommercials(
                    res.commercials.filter((comm) => comm.screenId === screen),
                );
            } else alert.error('שגיאה בשליפת הפרסומות');

            setLoading(false);
        };

        fetchCommercials();
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

            setTimeout(
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

        const disableTimeSet = query.get('disableTimeSet');

        setIgnoreTimeSets(disableTimeSet);
    }, [query]);

    const renderCommercial = () => {
        if (loading) return <Loader />;

        if (!commercial)
            return <div className="no-ad">אין לנו פרסומת להציג לכם כרגע</div>;

        return TemplateComponents[template](commercial);
    };

    return renderCommercial();
}

export default CommercialScreen;
