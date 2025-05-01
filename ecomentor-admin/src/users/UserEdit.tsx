import {
    Edit,
    SimpleForm,
    TextInput,
} from 'react-admin';

export const UserEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="email" type="email" />
        </SimpleForm>
    </Edit>
);