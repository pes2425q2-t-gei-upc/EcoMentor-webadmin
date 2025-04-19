import {Datagrid, TextField, useResourceContext, InfiniteList} from 'react-admin';

const ResourceName = () => {
    const resource = useResourceContext();
    return <>{resource}</>;
}

export const UserList = () => (
    <InfiniteList>
        <>
            <ResourceName />
            <Datagrid>
                <TextField source="name" />
                <TextField source="email" />
            </Datagrid>
        </>
    </InfiniteList>
)
