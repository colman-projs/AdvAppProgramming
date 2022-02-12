import commercials from '../api/commercials';

export const getCommercials = async (screenId) => {
    try {
        const { data } = await commercials.get(screenId ? `/${screenId}` : '/');

        console.log('Commercials: ', data);

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const getCommercialById = async (commercialId) => {
    try {
        const { data } = await commercials.get(`/${commercialId}`);

        console.log('Commercials: ', data);

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const upsertCommercial = async (commercial) => {
    try {
        const { data } = await commercials.post('/', commercial);

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const deleteCommercial = async (commercialId) => {
    try {
        const { data } = await commercials.delete(`/${commercialId}`);

        return data;
    } catch (e) {
        console.error(e);
    }
};
