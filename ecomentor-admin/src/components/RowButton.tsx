import {Button} from "react-admin";
import BlockIcon from "@mui/icons-material/Block";
import EditIcon from '@mui/icons-material/Edit';
import RestoreIcon from '@mui/icons-material/Restore';
import {useState} from "react";

export interface RowButtonProps {
    toggle: boolean;
    initialIsToggled?: boolean
    icon: keyof typeof iconMap;
    iconToggled?: keyof typeof iconMap;
    onClick?: (toggleState?: boolean) => void;
}

const iconMap = {
    'Block': BlockIcon,
    'Restore': RestoreIcon,
    'Edit': EditIcon,
}

export const RowButton = (props: RowButtonProps) => {
    const [isToggled, setIsToggled] = useState<boolean>(props.initialIsToggled ?? false);
    const IconComponent = iconMap[props.icon];
    const ToggleIconComponent = props.iconToggled
        ? iconMap[props.iconToggled]
        : iconMap[props.icon];

    const onToggle = (event: React.MouseEvent) => {
        event.stopPropagation();
        if(props.toggle) {
            setIsToggled(!isToggled);
            props.onClick && props.onClick(isToggled);
        }
        else {
            props.onClick && props.onClick();
        }
    }

    return (
        <Button onClick={(event) => onToggle(event)}>
            { ( ( props.icon && !props.toggle)  || (props.icon && props.toggle && !isToggled) )
                && <IconComponent />}
            { (props.iconToggled && props.toggle && isToggled)
                && <ToggleIconComponent />}
        </Button>
    );
};

export default RowButton;