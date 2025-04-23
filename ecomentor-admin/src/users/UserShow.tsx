import {FunctionField, Show, SimpleShowLayout, TextField} from 'react-admin';

export const UserShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="name" />
            <TextField source="email" />
            <FunctionField
                label="Roles"
                render={record => (record.roles || []).join(', ')}
            />
        </SimpleShowLayout>
    </Show>
);