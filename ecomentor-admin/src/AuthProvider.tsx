import type { AuthProvider } from 'react-admin';

//Done following the documentation from: https://marmelab.com/react-admin/AuthProviderWriting.html

//TODO change to production and ENV urls
export const authProvider: AuthProvider = {
    async login({ username, password }) {
        console.log(username, password);
        const apiUrl = import.meta.env.VITE_API_URL;
        const url = `${apiUrl}/auth/login`;
        console.log("POSTING TO", import.meta.env.VITE_API_URL);
        const request = new Request(url, {
            method: 'POST',
            body: JSON.stringify({ email: username, password: password }),
            headers: new Headers({ 'Content-Type': 'application/json' })
        });
        let response;
        try {
            response = await fetch(request);
        } catch (_error) {
            throw new Error('Network error');
        }
        if (response.status < 200 || response.status >= 300) {
            throw new Error(response.statusText);
        }
        const auth = await response.json();
        const userRoles = auth.roles;
        if (!userRoles || !userRoles.includes('ROLE_ADMIN')) {
            throw new Error('You do not have admin rights');
        }
        else {
            localStorage.setItem('auth', JSON.stringify(auth));
        }


    },
    async checkError(error) {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('auth');
            throw new Error();
        }
    },
    async checkAuth() {
        if (!localStorage.getItem('auth')) {
            throw new Error();
        }
    },
    async logout() {
        localStorage.removeItem('auth');
    },
}