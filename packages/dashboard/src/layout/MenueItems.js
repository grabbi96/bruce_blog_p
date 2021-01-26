import React from 'react';
import { Menu } from 'antd';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';
import versions from '../demoData/changelog.json';

const { SubMenu } = Menu;

const MenuItems = ({ darkMode, toggleCollapsed, topMenu, events }) => {
  const { path } = useRouteMatch();

  const pathName = window.location.pathname;
  const pathArray = pathName.split(path);
  const mainPath = pathArray[1];
  const mainPathSplit = mainPath.split('/');

  const {
    onRtlChange,
    onLtrChange,
    modeChangeDark,
    modeChangeLight,
    modeChangeTopNav,
    modeChangeSideNav,
  } = events;
  const [openKeys, setOpenKeys] = React.useState(
    !topMenu
      ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`]
      : []
  );

  const onOpenChange = (keys) => {
    setOpenKeys(
      keys[keys.length - 1] !== 'recharts'
        ? [keys.length && keys[keys.length - 1]]
        : keys
    );
  };

  const onClick = (item) => {
    if (item.keyPath.length === 1) setOpenKeys([]);
  };

  return (
    <Menu
      onOpenChange={onOpenChange}
      onClick={onClick}
      mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
      theme={darkMode && 'dark'}
      // // eslint-disable-next-line no-nested-ternary
      defaultSelectedKeys={
        !topMenu
          ? [
              `${
                mainPathSplit.length === 1
                  ? 'home'
                  : mainPathSplit.length === 2
                  ? mainPathSplit[1]
                  : mainPathSplit[2]
              }`,
            ]
          : []
      }
      defaultOpenKeys={
        !topMenu
          ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`]
          : []
      }
      overflowedIndicator={<FeatherIcon icon="more-vertical" />}
      openKeys={openKeys}
    >
      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/settings`}>
              <FeatherIcon icon="settings" />
            </NavLink>
          )
        }
        key="settings"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/settings`}>
          Profile
        </NavLink>
      </Menu.Item>

      <SubMenu
        key="post"
        icon={!topMenu && <FeatherIcon icon="target" />}
        title="Post"
      >
        <Menu.Item key="views">
          <NavLink onClick={toggleCollapsed} to={`${path}/post/view/list`}>
            Post List
          </NavLink>
        </Menu.Item>
        <Menu.Item key="PostCreate">
          <NavLink onClick={toggleCollapsed} to={`${path}/editor`}>
            Create Post
          </NavLink>
        </Menu.Item>
        <Menu.Item key="postDetails">
          <NavLink onClick={toggleCollapsed} to={`${path}/post/postDetails/1`}>
            Post Details
          </NavLink>
        </Menu.Item>
      </SubMenu>

      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/users/dataTable`}>
              <FeatherIcon icon="users" />
            </NavLink>
          )
        }
        key="dataTable"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/users/list`}>
          Users
        </NavLink>
      </Menu.Item>

      {!topMenu && <p className="sidebar-nav-title">Pages</p>}

      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/404`}>
              <FeatherIcon icon="info" />
            </NavLink>
          )
        }
        key="404"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/404`}>
          404
        </NavLink>
      </Menu.Item>
    </Menu>
  );
};

MenuItems.propTypes = {
  darkMode: propTypes.bool,
  topMenu: propTypes.bool,
  toggleCollapsed: propTypes.func,
  events: propTypes.object,
};

export default MenuItems;
