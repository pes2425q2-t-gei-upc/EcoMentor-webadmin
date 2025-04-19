import type { AuthProvider } from 'react-admin';

//Done following the documentation from: https://marmelab.com/react-admin/AuthProviderWriting.html

//TODO change to production and ENV urls
export const authProvider: AuthProvider = {
    async login({ username, password }) {
        console.log(username, password);
        const request = new Request('http://localhost:8080/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email: username, password: password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
            credentials: 'include',
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
        localStorage.setItem('auth', JSON.stringify(auth));
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