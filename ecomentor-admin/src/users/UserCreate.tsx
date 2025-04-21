import {
    Create,
    SimpleForm,
    TextInput,
    EmailField,
} from 'react-admin';

export const UserCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" label="Name" />
            <TextInput source="email" label="Email Address" type="email" />
            <TextInput source="password" label="Password" type="password" />
        </SimpleForm>
    </Create>
);