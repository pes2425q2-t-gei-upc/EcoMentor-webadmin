import {fetchUtils, Admin, Resource} from "react-admin";
import { Layout } from "./Layout";
import { authProvider } from './AuthProvider.tsx';
import { UserList } from './users/UserList.tsx';
import ecomentorDataProvider from "./DataProvider.tsx";
import {CertificateList} from "./certificates/CertificateList.tsx";
import {RecommendationList} from "./recommendation/RecommendationList.tsx";
import {UserShow} from "./users/UserShow.tsx";
import {CertificateShow} from "./certificates/CertificateShow.tsx";
import ecomentorTheme from "./theme.tsx";
import {UserEdit} from "./users/UserEdit.tsx";
import {UserCreate} from "./users/UserCreate.tsx";
import {RoleList} from "./roles/RoleList.tsx";



export const App = () => {
    //Setting up the http client to put bearer token to all calls.
    const httpClient = (url: string,
                        options: fetchUtils.Options = {}) => {
        if (!options.headers) {
            options.headers = new Headers({ Accept: 'application/json' });
        }
        const authData = localStorage.getItem('auth');
        const { token } = authData ? JSON.parse(authData) : {};
        (options.headers as Headers).set('Authorization', `Bearer ${token}`);
        return fetchUtils.fetchJson(url, options);
    };

    const apiUrl = import.meta.env.VITE_API_URL
    const dataProvider = ecomentorDataProvider(apiUrl, httpClient);

    return   (
        <Admin theme={ecomentorTheme}
                layout={Layout}
                authProvider={authProvider}
                dataProvider={dataProvider}
        >
                <Resource name="users" list={UserList} show={UserShow} edit={UserEdit}  create={UserCreate} options={{ label: 'Users' }}/>
                <Resource name="roles" list={RoleList} options={{ label: 'Roles' }}/>
                <Resource name="certificate" list={CertificateList} show={CertificateShow} options={{ label: 'Certificates' }}/>
                <Resource name="recommendation" list={RecommendationList} options={{ label: 'Recommendations' }}/>
        </Admin>

    )
};
