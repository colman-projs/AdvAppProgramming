import React, { useState, useEffect } from "react";
// import { useSnackbar } from "notistack";
import { useQuery } from "../customHooks";
import { getCommercials } from "../actions/commercialsActions";
import { TemplateComponents, TEMPLATE_TYPES } from "./Templates";
import Loader from "./Loader/Loader";

function CommercialScreen() {
    const [commercialWithTemplate, setCommercialWithTemplate] = useState(null);
    const [commercials, setCommercials] = useState([]);
    const [ignoreTimeSets, setIgnoreTimeSets] = useState(false);
    const [loading, setLoading] = useState(false);
    const [screen, setScreen] = useState(0);
    // const { enqueueSnackbar } = useSnackbar();

    let query = useQuery();

    useEffect(() => {
        const fetchCommercials = async () => {
            setLoading(true);
            const res = await getCommercials();

            if (res) setCommercials(res.filter((comm) => comm.screenId === screen));
            // else enqueueSnackbar("שגיאה בשליפת פרסומות", { variant: "error" });

            setLoading(false);
        };

        fetchCommercials();
    }, [screen]);

    useEffect(() => {
        getNextCommercial();
    }, [commercials]);

    useEffect(() => {
        const screenId = query.get("screen");
        setScreen(screenId);
        console.log("currentScreen: ", screenId);
    }, [query]);

    const testTimeSet = (timeSet) => {
        const currDate = new Date();
        const time = `${currDate.getHours()}${currDate.getMinutes()}${currDate.getSeconds()}`;

        return (
            (timeSet.daysInWeek.length === 0 || timeSet.daysInWeek.includes(currDate.getDay())) &&
            currDate >= timeSet.startDate &&
            currDate <= timeSet.endDate &&
            time >= timeSet.startTime &&
            time <= timeSet.endTime
        );
    };

    const getCommercialToShowByTimeSet = () => {
        return commercials.find((commercial) =>
            commercial.timeSets.some((set) => testTimeSet(set))
        );
    };

    const getCommercialToShow = () => {
        let nextCommercialIndex = 0;
        const currentCommercialIndex = commercials.findIndex(
            (comm) => comm.name === commercialWithTemplate?.name
        );

        if (currentCommercialIndex !== -1) {
            nextCommercialIndex = (currentCommercialIndex % commercials.length) + 1;
        }

        return commercials[nextCommercialIndex];
    };

    const getNextCommercial = () => {
        const currCommercial = ignoreTimeSets
            ? getCommercialToShow()
            : getCommercialToShowByTimeSet();

        let duration = 1000;

        if (!currCommercial) {
            setCommercialWithTemplate((currCommercial) =>
                TemplateComponents[TEMPLATE_TYPES.DefaultTemplate](currCommercial)
            );
        } else {
            setCommercialWithTemplate((currCommercial) =>
                TemplateComponents[currCommercial.commercialWithTemplate](currCommercial)
            );
            duration = currCommercial.durationInSeconds * 1000;
        }

        setTimeout(() => getNextCommercial(), duration);
    };

    return <div>{loading ? <Loader /> : commercialWithTemplate}</div>;
}

export default CommercialScreen;
