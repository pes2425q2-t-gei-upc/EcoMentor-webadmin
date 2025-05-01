import {
    Datagrid,
    TextField,
    InfiniteList,
    useRecordContext,
    useNotify,
    useRefresh, FunctionField,
} from 'react-admin';

import RowButton, { RowButtonProps } from "../components/RowButton.tsx";
import { useCallback } from 'react';
import {useNavigate} from "react-router";

const BlockButton = () => {
    const record = useRecordContext();
    const notify = useNotify();
    const refresh = useRefresh();

    if (!record) return null;

    const handleBlock = useCallback(async (isBlocked: boolean) => {
        const tokenString = localStorage.getItem('auth');

        if (!tokenString) {
            notify('No token found. Please login again.', { type: 'error' });
            return;
        }

        const { token } = JSON.parse(tokenString);
        const action = (isBlocked) ? "unblock" : "block";


        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const url = `${apiUrl}/api/users/${record.id}/${action}`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to ${action} user`);
            }

            const notification = `User ${record.name} ${action}ed successfully`;
            notify(notification, { type: 'success' });
            refresh();

        } catch (error) {
            console.error(error);
            const errorMsg = `Failed to ${action} user: ${error}`;
            notify(errorMsg, { type: 'error' });
        }
    }, [record?.id, notify, refresh]);

    const isBlocked = useCallback((): boolean => {
        const roles: string[] | undefined = record.roles;
        return !!(roles && roles.includes('ROLE_BLOCKED'));
    }, [record?.roles]);

    const blockButtonProps: RowButtonProps = {
        toggle: true,
        icon: "Block",
        iconToggled: "Restore",
        onClick: handleBlock,
        initialIsToggled: isBlocked(),
    };

    return <RowButton {...blockButtonProps} />;
};

const EditButton = () => {
    const record = useRecordContext();
    const navigate = useNavigate();

    if (!record || !record.id) {
        return null;
    }

    const handleClick = () => {
        navigate(`/users/${record.id}`);
    };

    const blockButtonProps: RowButtonProps = {
        toggle: false,
        icon: "Edit",
        onClick: handleClick,
    };

    return <RowButton {...blockButtonProps} />;
};


export const UserList = () => (
    <InfiniteList>
        <>
            <Datagrid>
                <TextField source="name" />
                <TextField source="email" />
                <FunctionField
                    label="Roles"
                    render={record => (record.roles || []).join(', ')}
                />
                <BlockButton />
                <EditButton />
            </Datagrid>
        </>
    </InfiniteList>
);