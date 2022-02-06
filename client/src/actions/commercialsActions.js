import commercials from '../api/commercials';

export const getCommercials = async () => {
    try {
        const { data } = await commercials.get('/');

        console.log('Commercials: ', data);

        return data;
    } catch (e) {
        console.error(e);
    }
};
