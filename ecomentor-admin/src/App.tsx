import {fetchUtils, Admin, Resource} from "react-admin";
import { Layout } from "./Layout";
import { authProvider } from './AuthProvider.tsx';
import { UserList } from './users/UserList.tsx';
import ecomentorDataProvider from "./DataProvider.tsx";
import {CertificateList} from "./certificates/CertificateList.tsx";
import {RecommendationList} from "./recommendation/RecommendationList.tsx";



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

    const dataProvider = ecomentorDataProvider('http://localhost:8080/api', httpClient);

    return   (
        <Admin
            layout={Layout}
            authProvider={authProvider}
            dataProvider={dataProvider}>
            <Resource name="users" list={UserList} options={{ label: 'Users' }}/>
            <Resource name="certificate" list={CertificateList} identifier="certificateId" options={{ label: 'Certificates' }}/>
            <Resource name="recommendation" list={RecommendationList} options={{ label: 'Recommendations' }}/>
        </Admin>
    )
};
