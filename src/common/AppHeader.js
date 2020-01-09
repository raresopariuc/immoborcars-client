import React, { Component } from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';
import './AppHeader.css';
import Logo from '../immoborcars_logo.svg';
import { Layout, Menu, Dropdown, Icon } from 'antd';
const Header = Layout.Header;
    
class AppHeader extends Component {
    constructor(props) {
        super(props);   
        this.handleMenuClick = this.handleMenuClick.bind(this);   
    }

    handleMenuClick({ key }) {
      if(key === "logout") {
        this.props.onLogout();
      }
    }

    render() {
        let menuItems;
        if(this.props.currentUser) {
            menuItems = [
                <Menu.Item key="/">
                    <Link to="/">
                        <Icon type="home" className="nav-icon" />
                    </Link>
                </Menu.Item>,
                <Menu.Item key="/add" className="add-articles-menu">
                    <AddAnnouncementDropdownMenu
                        currentUser={this.props.currentUser}
                        handleMenuClick={this.handleMenuClick}/>
                </Menu.Item>,
                <Menu.Item key="/profile" className="profile-menu">
                    <ProfileDropdownMenu
                        currentUser={this.props.currentUser}
                        handleMenuClick={this.handleMenuClick}/>
                </Menu.Item>
            ];
        } else {
            menuItems = [
                <Menu.Item key="/login">
                    <Link to="/login">Login</Link>
                </Menu.Item>,
                <Menu.Item key="/signup">
                    <Link to="/signup">Signup</Link>
                </Menu.Item>
            ];
        }

        return (
            <Header className="app-header">
            <div className="container">
              {/*<div className="app-title" >*/}
              {/*    <Link to="/">immob<strong>or</strong>cars</Link>*/}
              {/*</div>*/}
              <Link to="/">
                <img src={Logo} alt="Logo" className="app-logo" />
              </Link>
              <Menu
                className="app-menu"
                mode="horizontal"
                selectedKeys={[this.props.location.pathname]}
                style={{ lineHeight: '64px' }} >
                  {menuItems}
              </Menu>
            </div>
          </Header>
        );
    }
}

function ProfileDropdownMenu(props) {
  const dropdownMenu = (
    <Menu onClick={props.handleMenuClick} className="profile-dropdown-menu">
      <Menu.Item key="user-info" className="dropdown-item" disabled>
        <div className="user-full-name-info">
          {props.currentUser.name}
        </div>
        <div className="username-info">
          @{props.currentUser.username}
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="profile" className="dropdown-item">
        <Link to={`/users/${props.currentUser.username}`}>Profile</Link>
      </Menu.Item>
      <Menu.Item key="logout" className="dropdown-item">
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown 
      overlay={dropdownMenu} 
      trigger={['click']}
      getPopupContainer = { () => document.getElementsByClassName('profile-menu')[0]}>
      <a className="ant-dropdown-link">
         <Icon type="user" className="nav-icon" style={{marginRight: 0}} /> <Icon type="down" />
      </a>
    </Dropdown>
  );
}

function AddAnnouncementDropdownMenu(props) {
    const dropdownMenu = (
        <Menu>
            <Menu.Item key="add-house" className="dropdown-item">
                <Link to={"/house/new"}>Add house</Link>
            </Menu.Item>
            <Menu.Item key="add-apartment" className="dropdown-item">
                <Link to={"/apartment/new"}>Add apartment</Link>
            </Menu.Item>
            <Menu.Item key="add-car" className="dropdown-item">
                <Link to={"/car/new"}>Add car</Link>
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown
            overlay={dropdownMenu}
            trigger={['click']}
            getPopupContainer = { () => document.getElementsByClassName('add-articles-menu')[0]}>
            <a className="ant-dropdown-link">
                <Icon type="plus-circle" className="nav-icon" style={{marginRight: 0}} />
            </a>
        </Dropdown>
    );
}

export default withRouter(AppHeader);