
export const useAuthentication = () => {
    return localStorage.getItem('token') !== null;
};