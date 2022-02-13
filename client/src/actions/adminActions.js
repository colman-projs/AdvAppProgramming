import admin from '../api/admin';

export const authenticate = async (username, password) => {
    try {
        const { data } = await admin.get('/');

        return data;
    } catch (e) {
        console.error(e);
    }
};
