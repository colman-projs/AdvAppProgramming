// Days and months start from zero!
const commercials = [
    {
        name: 'Success Incorporated',
        messages: [
            'Discover the key to success!',
            'Today at our company find out the true values',
            'At only 12.99$ a month!',
            'Join us today',
        ],
        images: ['2', '4'],
        template: 'templateA',
        durationInSeconds: 5,
        screenId: [1, 2],
        timeSets: [
            {
                startDate: new Date(2019),
                endDate: new Date(2019, 11, 31, 23, 59, 59),
                startTime: '060000',
                endTime: '125959',
                daysInWeek: [1],
            },
            {
                startDate: new Date(2019),
                endDate: new Date(2019, 11, 31, 23, 59, 59),
                startTime: '130000',
                endTime: '205959',
                daysInWeek: [3],
            },
        ],
    },
    {
        name: "Tony's Pizza",
        messages: [
            "Tony's Pizza",
            'The best pizza in town',
            'We have the best dough!',
            'Money back guarantee!',
            'Olives, tomatoes, mushrooms, and more!',
            'Rated 10/10 in mouth-feel!',
            "Doesn't get better than this pizza!",
            'Anchovies, pineapple, horse meat, and more!',
            "Tony's Pizza, find us at 14th Johnson ave, Florida",
            'Buy it today!',
        ],
        images: ['5'],
        template: 'templateB',
        durationInSeconds: 5,
        screenId: [1, 3],
        timeSets: [
            {
                startDate: new Date(2019, 2, 1),
                endDate: new Date(2019, 3, 31, 23, 59, 59),
                startTime: '100000',
                endTime: '165959',
                daysInWeek: [2, 3],
            },
        ],
    },
    {
        name: 'Advertisement',
        messages: [],
        images: [],
        template: 'templateC',
        durationInSeconds: 5,
        screenId: [2, 3],
        timeSets: [
            {
                startDate: new Date(2019, 4, 1),
                endDate: new Date(2019, 5, 15, 23, 59, 59),
                startTime: '080000',
                endTime: '225959',
                daysInWeek: [],
            },
        ],
    },
    {
        name: 'Coinkrush Bitcoin',
        messages: [
            'Buy the cheapest crypto today at coinkrush.co.il!',
            'The best prices hands down.',
        ],
        images: [],
        template: 'templateA',
        durationInSeconds: 5,
        screenId: [1],
        timeSets: [
            {
                startDate: new Date(2019, 2, 29),
                // Zero Based Months
                endDate: new Date(2019, 3, 15, 23, 59, 59),
                startTime: '150000',
                endTime: '195959',
                // Zero based days
                daysInWeek: [1],
            },
        ],
    },
    {
        name: 'Vanguard Funds',
        messages: [
            'Vanguard Funds Inc. - The leading source to financial stability.',
            'Find out today the secret to a laid back lifestyle.',
            'Set up your account for free, today',
            'Let your money work for you',
            'Set your goals in the future!',
            "Vanguard Funds, it's all in the name.",
            'Find out today at vanguardFunds.co.kz',
        ],
        images: ['1', '3'],
        template: 'templateB',
        durationInSeconds: 5,
        screenId: [3],
        timeSets: [
            {
                startDate: new Date(2021, 3, 1),
                // Zero Based Months
                endDate: new Date(2021, 3, 31, 23, 59, 59),
                startTime: '010000',
                endTime: '235959',
                // Zero based days
                daysInWeek: [1, 2, 3],
            },
        ],
    },
];
