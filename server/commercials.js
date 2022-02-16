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
        images: [
            'https://www.incimages.com/uploaded_files/image/1920x1080/getty_495142964_198701.jpg',
            'https://www.statecollege.com/wp-content/uploads/2022/01/success-stock-scaled.jpeg',
        ],
        template: 'templateA',
        durationInSeconds: 5,
        screenId: [1, 2],
        timeSets: [
            {
                startDate: new Date(2019, 0, 1),
                endDate: new Date(2019, 11, 31, 23, 59, 59),
                startTime: '060000',
                endTime: '125959',
                daysInWeek: [1],
            },
            {
                startDate: new Date(2019, 0, 1),
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
        images: [
            'https://www.recipetineats.com/wp-content/uploads/2020/05/Pepperoni-Pizza_5-SQjpg.jpg',
        ],
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
        images: [
            'https://www.investopedia.com/thmb/513SZ-nXDzK3nLYG6hOlQr_mSL4=/2121x1193/smart/filters:no_upscale()/Investingjourneypic-12651a1840124b9d84467deb065e7b26-bfb2d9b73a524490acbed28a3c4ffecf.jpg',
            'https://imageio.forbes.com/specials-images/imageserve/5d6ba3db68cb0a0008c1089e/Financial-and-Technical-Data-Analysis-Graph-Showing-Stock-Market-Trends/960x0.jpg?fit=bounds&format=jpg&width=960',
        ],
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

module.exports = commercials;
