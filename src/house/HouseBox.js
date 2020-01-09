import React, { Component } from 'react';
import { Menu, Dropdown, Avatar, Icon, notification } from 'antd';
import { deleteHouse } from '../util/APIUtils';
import { Link } from 'react-router-dom';
import { getAvatarColor } from '../util/Colors';
import { formatDateTime } from '../util/Helpers';
import './HouseBox.css';

class HouseBox extends Component {

    constructor(props) {
        super(props);
        this.handleMenuClick = this.handleMenuClick.bind(this);

        notification.config({
            placement: 'topRight',
            top: 70,
            duration: 3,
        });
    }

    handleMenuClick({ key }) {
        if(key === "housebox-delete") {
            deleteHouse(this.props.house.id)
                .then(response => {
                    //this.props.history.push("/");
                    window.location.reload();
                }).catch(error => {
                    if(error.status === 500) {
                        notification.error({
                            message: 'House was not deleted!',
                            description: error.message || 'Sorry! Something went wrong. Please try again!'
                        });
                    }
                });
        }
    }

    render() {

        const editDropdownMenu = [];
        if(this.props.currentUser && this.props.currentUser.username === this.props.house.createdBy.username) {
            editDropdownMenu.push(
                <EditDropdownMenu
                    key = {this.props.house.id}
                    houseId = {this.props.house.id}
                    handleMenuClick={this.handleMenuClick}
                />
            );
        }

        return (
            <div className="housebox-content">
                <div className="housebox-header">
                    <Link className="housebox-title" to={`/houses/${this.props.house.id}`}>
                        {this.props.house.title}
                        <span className="house-creation-date">
                            added at {formatDateTime(this.props.house.creationDateTime)}
                        </span>
                    </Link>
                    {/*<div className="housebox-creator-info">
                        <Link className="creator-link" to={`/users/${this.props.house.createdBy.username}`}>
                            <Avatar className="housebox-creator-avatar"
                                    style={{backgroundColor: getAvatarColor(this.props.house.createdBy.name)}} >
                                {this.props.house.createdBy.name[0].toUpperCase()}
                            </Avatar>
                            <span className="housebox-creator-name">
                                {this.props.house.createdBy.name}
                            </span>
                            <span className="housebox-creator-username">
                                {this.props.house.createdBy.username}
                            </span>
                            <span className="housebox-creation-date">
                                {formatDateTime(this.props.house.creationDateTime)}
                            </span>
                        </Link>
                    </div>*/}
                    <div className="housebox-options">
                        {editDropdownMenu}
                    </div>
                </div>
                <div className="housebox-body">
                    <div className="housebox-image">
                        {/*<img src={`${'http://localhost:8181/api/files/downloadFile/' + this.props.house.pictureFileIds[0]}`} alt=""/>*/}
                        <a href={`/houses/${this.props.house.id}`} className="img" style={{backgroundImage: 'url(' + `${'http://localhost:8181/api/files/downloadFile/' + this.props.house.pictureFileIds[0]}` + ')'}}></a>
                    </div>
                    <div className="housebox-properties">
                        <ul>
                            <li>
                                Internal surface: <strong>{this.props.house.internalSurface} m²</strong>
                            </li>
                            <li>
                                Year of construction: <strong>{this.props.house.yearOfConstruction}</strong>
                            </li>
                            <li>
                                Number of rooms: <strong>{this.props.house.numberOfRooms}</strong>
                            </li>
                            <li>
                                Number of bathrooms: <strong>{this.props.house.numberOfBathrooms}</strong>
                            </li>
                            <li>
                                Garden surface: <strong>{this.props.house.gardenSurface} m²</strong>
                            </li>
                            <li>
                                Number of floors: <strong>{this.props.house.numberOfFloors}</strong>
                            </li>

                            <li>
                                Price: <strong>{this.props.house.price} €</strong>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

function EditDropdownMenu(props) {

    const dropdownMenu = (
        <Menu onClick={props.handleMenuClick} className="housebox-dots">
            <Menu.Item key="housebox-edit" className="dropdown-item">
                <Link to={`/houses/edit/${props.houseId}`}><Icon type="edit" /> Edit house</Link>
            </Menu.Item>
            <Menu.Item key="housebox-delete" className="dropdown-item">
                <Icon type="delete" /> Delete house
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown
            overlay={dropdownMenu}
            trigger={['click']}
            getPopupContainer = { () => document.getElementsByClassName('housebox-options')[0]}>
            <a className="ant-dropdown-link">
                <Icon type="ellipsis" className="housebox-options-icon" style={{marginRight: 0}} />
            </a>
        </Dropdown>
    )
}

export default HouseBox;