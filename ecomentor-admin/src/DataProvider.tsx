import {DataProvider} from "react-admin";


const getResourceUrl = (apiUrl: string, resource: string, id: string | number) => {
    return `${apiUrl}/${resource}/${id}`;
};

const mapId = (resource: string, item: any) => {
    let idValue;
    if (resource === 'certificate') {
        idValue = item.certificateId;
    } else if (resource === 'recommendation') {
        idValue = item.recommendationId;
    } else if (resource === 'user') {
        idValue = item.id;
    } else {
        idValue = item.id;
    }
    return {
        ...item,
        id: idValue,
    };
};

const ecomentorDataProvider: DataProvider = (apiUrl, httpClient) => {
    return {
        getList: async (resource, params) => {
            const { pagination, sort, filter} = params;
            const { page, perPage } = pagination;
            const { field, order } = sort;
            let url = `${apiUrl}/${resource}?page=${page - 1}&size=${perPage}`;

            //TODO implement filter appending when done in backend. exclude now

            const { json } = await httpClient(url);
            const mappedContent = json.content.map( (item: any) => mapId(resource, item) )

            return {
                data: mappedContent,
                total: json.totalElements ?? 0,
            };
        },

        getOne: async (resource, params) => {
            const url = getResourceUrl(apiUrl, resource, params.id);
            const { json } = await httpClient(url);
            return { data: mapId(resource, json) };
        },

        update: async (resource, params) => {
            const url = getResourceUrl(apiUrl, resource, params.id);
            const { data } = params;

            const response = await httpClient(url, {
                method: 'PUT', // Or PATCH
                body: JSON.stringify(data),
            });
            const json = await response.json;


            if (json) {
                return { data: mapId(resource, json) };
            } else {
                const getOneResponse = await httpClient(getResourceUrl(apiUrl, resource, params.id));
                const getOneJson = await getOneResponse.json;
                return { data: mapId(resource, getOneJson) };
            }
        },

        deleteMany: async (resource, params) => {
            const { ids } = params;
            const requests = ids.map(id =>
                httpClient(`${apiUrl}/${resource}/${id}`, {
                    method: 'DELETE',
                })
            );
            await Promise.all(requests);
            return { data: ids };
        },

        create: async (resource, params) => {
            const url = `${apiUrl}/${resource}`;
            const { data } = params;

            await httpClient(url, {
                method: 'POST',
                body: JSON.stringify(data),
            });

            return { data: { id: null } };
        },
    }
}

export default ecomentorDataProvider;