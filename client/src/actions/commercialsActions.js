import authHeader from '../api/auth-header';
import commercials from '../api/commercials';
import { socket } from '../socket';




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
        const { data } = await commercials.get(`/${commercialId}`, {
            headers: authHeader(),
        });

        console.log('Commercials: ', data);

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const upsertCommercial = async (commercial) => {
    try {
        const { data } = await commercials.post('/', commercial, {
            headers: authHeader(),
        });

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const deleteCommercial = async (commercialId) => {
    try {
        const { data } = await commercials.delete(`/${commercialId}`, {
            headers: authHeader(),
        });

        return data;
    } catch (e) {
        console.error(e);
    }
};
