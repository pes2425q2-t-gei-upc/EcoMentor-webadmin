import { List, Datagrid, TextField, NumberField } from 'react-admin';

export const RecommendationList = () => (
    <List>
        <Datagrid rowClick="show">
            <NumberField source="recommendationId" />
            <TextField source="name" />
            <TextField source="description" />
            <TextField source="recommendationType" />
            <TextField source="upgradedICEE" />
            <NumberField source="upgradePercentage" />
            <NumberField source="upgradedAnualCost" />
            <NumberField source="totalPrice" />
        </Datagrid>
    </List>
);