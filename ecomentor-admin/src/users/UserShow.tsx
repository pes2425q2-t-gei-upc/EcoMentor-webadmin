import { Show, SimpleShowLayout, TextField, DateField, RichTextField } from 'react-admin';

export const UserShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="name" />
            <TextField source="email" />
        </SimpleShowLayout>
    </Show>
);