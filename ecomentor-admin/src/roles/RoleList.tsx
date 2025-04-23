import {Datagrid, List, TextField} from "react-admin";


export const RoleList = () => (
    <List>
        <Datagrid>
            <TextField source="name" />
        </Datagrid>
    </List>
);