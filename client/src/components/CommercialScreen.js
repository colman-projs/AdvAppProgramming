import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { useQuery } from "../customHooks";
import { getCommercials } from "../actions/commercialsActions";
import { TemplateComponents } from "../Templates";

function CommercialScreen() {
    const [currentCommercial, setCurrentCommercial] = useState(null);
    const [commercials, setCommercials] = useState([]);
    const [ignoreTimeSets, setIgnoreTimeSets] = useState(false);
    const [loading, setLoading] = useState(false);
    const [screen, setScreen] = useState(0);
    const { enqueSnackbar } = useSnackbar();

    let query = useQuery();

    useEffect(() => {
        const fetchCommercials = async () => {
            setLoading(true);
            const res = await getCommercials();

            if (res) setCommercials(res);
            else enqueSnackbar("שגיאה בשליפת פרסומות", { variant: "error" });

            setLoading(false);
        };

        fetchCommercials();
    }, []);

    useEffect(() => {
        getNextCommercial();
    }, [commercials]);

    useEffect(() => {
        const screenId = query.get("screen");
        setScreen(screenId);
        console.log("currentScreen: ", screenId);
    }, [query]);

    /**
     * Test a time set compared to the current time and date
     * @param {object} timeSet the time set to check
     */
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

    /**
     * Get the next commercial to show, based on the time sets
     */
    const getCommercialToShowByTimeSet = () => {
        return commercials.find((commercial) =>
            commercial.timeSets.some((set) => testTimeSet(set))
        );
    };

    /**
     * Get the next commercial to show without timesets
     */
    const getCommercialToShow = () => {
        let nextCommercialIndex = 0;
        const currentCommercialIndex = commercials.findIndex(
            (comm) => comm.name === currentCommercial?.name
        );

        if (currentCommercialIndex !== -1) {
            nextCommercialIndex = (currentCommercialIndex % commercials.length) + 1;
        }

        return commercials[nextCommercialIndex];
    };

    /**
     * Show a specipic commercial in the screen
     * @param commercial The commercial to show
     */
    const showCommercial = () => {
        // $("#content").load(`./Templates/${currentCommercial.template}.html`, () => {
        //     currentCommercial.messages.forEach((msg, idx) => {
        //         $(`#msg${idx}`).html(msg);
        //     });
        //     currentCommercial.images.forEach((img, idx) => {
        //         $(`#img${idx}`).attr("src", `./Images/${img}.jpg`);
        //     });
        // });
    };

    /**
     * Gets the next commercial and shows the commercial data.
     * In case of on commercial to show (due to time constrains), show No Ad html
     * @param IgnoreTimeSets - If true loops through the ads ignoring the timesets given (Used to show the ads continuously)
     */
    const getNextCommercial = () => {
        currentCommercial = ignoreTimeSets ? getCommercialToShow() : getCommercialToShowByTimeSet();

        let duration = 1000;

        if (!currentCommercial) {
            // $("#content").load("./Templates/NoAd.html");
        } else {
            showCommercial(currentCommercial);
            duration = currentCommercial.durationInSeconds * 1000;
        }

        setTimeout(() => getNextCommercial(), duration);
    };

    return <div>Commercial</div>;
}

export default CommercialScreen;
