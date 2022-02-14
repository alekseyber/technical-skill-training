import { FC, useState, MouseEvent, RefAttributes, ForwardRefExoticComponent } from 'react';
import { NavLinkProps } from 'react-router-dom';
import {
  Menu,
  MenuItem,
  Button,
  Divider,
  MenuList,
  SvgIconTypeMap,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import type { RouteNames } from '@src/router/appRouterSettings';
import type { OverridableComponent } from '@mui/material/OverridableComponent';

type Component = ForwardRefExoticComponent<NavLinkProps & RefAttributes<HTMLAnchorElement>>;
type IconElement = OverridableComponent<SvgIconTypeMap>;

interface MenuSettingsBaseProps {
  onClick?: () => void;
}

interface MenuSettingsPropsTo extends MenuSettingsBaseProps {
  to: RouteNames;
  component: Component;
}
export interface MenuSettings {
  title: string;
  divider?: boolean;
  dividerPrev?: boolean;
  onClickClosed?: () => void;
  IconElement?: IconElement;
  props: MenuSettingsBaseProps | MenuSettingsPropsTo;
}

type HandleCloseFunctionProps = () => void;

interface ItemMenuElementProps {
  itemMenu: MenuSettings;
  handleClose: (func?: HandleCloseFunctionProps | undefined) => void;
}

const ItemMenuElement: FC<ItemMenuElementProps> = ({ itemMenu, handleClose }) => {
  const { IconElement } = itemMenu;

  return (
    <>
      {itemMenu.dividerPrev && <Divider />}
      <MenuItem {...itemMenu.props} onClick={() => handleClose(itemMenu.onClickClosed)}>
        {!!IconElement && (
          <ListItemIcon>
            <IconElement fontSize="small" />
          </ListItemIcon>
        )}
        <ListItemText>{itemMenu.title}</ListItemText>
      </MenuItem>
      {itemMenu.divider && <Divider />}
    </>
  );
};
interface AppItemMenuProps {
  title: string;
  menuSettingsList: MenuSettings[];
}
const AppItemMenu: FC<AppItemMenuProps> = ({ title, menuSettingsList }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (func?: HandleCloseFunctionProps) => {
    if (func) {
      func();
    }
    setAnchorEl(null);
  };

  return (
    <>
      <Button color="inherit" onClick={handleClick}>
        {title}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={() => handleClose()}>
        <MenuList>
          {menuSettingsList.map((itemMenu, i) => (
            <ItemMenuElement itemMenu={itemMenu} handleClose={handleClose} key={i} />
          ))}
        </MenuList>
      </Menu>
    </>
  );
};

export default AppItemMenu;
