import {DataProvider} from "react-admin";

const ecomentorDataProvider: DataProvider = (apiUrl, httpClient) => {
    return {
        getList: async (resource, params) => {
            const { pagination, sort} = params;
            const { page, perPage } = pagination;
            const { field, order } = sort;
            let url = `${apiUrl}/${resource}?page=${page - 1}&size=${perPage}`;

            //TODO implement filter appending when done in backend. exclude now

            console.log(url)
            const { json } = await httpClient(url);
            const mappedContent = json.content.map( (item: any) => {
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
                }
            })

            console.log("Resource:", mappedContent);
            return {
                data: mappedContent,
                total: json.totalElements,
            };
        },

        getOne: (resource, params) => {
            const url = `${apiUrl}/${resource}/${params.id}`;
            return httpClient(url).then(({ json }) => ({
                data: {
                    ...json,
                    id: ( (resource === 'certificate') && json.certificateId ) || ( (resource === 'recommendation') && json.recommendationId ) || ( (resource === 'user') && json.id ) ,
                }
            }));
        },

    }
}

export default ecomentorDataProvider;