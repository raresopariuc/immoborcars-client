import React, { Component } from 'react';
import { Menu, Dropdown, Avatar, Icon, notification } from 'antd';
import { deleteApartment } from '../util/APIUtils';
import { Link } from 'react-router-dom';
import { getAvatarColor } from '../util/Colors';
import { formatDateTime } from '../util/Helpers';
import './ApartmentBox.css';

class ApartmentBox extends Component {

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
        if(key === "apartmentbox-delete") {
            deleteApartment(this.props.apartment.id)
                .then(response => {
                    //this.props.history.push("/");
                    window.location.reload();
                }).catch(error => {
                    if(error.status === 500) {
                        notification.error({
                            message: 'Apartment was not deleted!',
                            description: error.message || 'Sorry! Something went wrong. Please try again!'
                        });
                    }
                });
        }
    }

    render() {

        const editDropdownMenu = [];
        if(this.props.currentUser && this.props.currentUser.username === this.props.apartment.createdBy.username) {
            editDropdownMenu.push(
                <EditDropdownMenu
                    key = {this.props.apartment.id}
                    apartmentId = {this.props.apartment.id}
                    handleMenuClick={this.handleMenuClick}
                />
            );
        }

        return (
            <div className="apartmentbox-content">
                <div className="apartmentbox-header">
                    <Link className="apartmentbox-title" to={`/apartments/${this.props.apartment.id}`}>
                        {this.props.apartment.title}
                        <span className="apartment-creation-date">
                            added at {formatDateTime(this.props.apartment.creationDateTime)}
                        </span>
                    </Link>
                    {/*<div className="apartmentbox-creator-info">
                        <Link className="creator-link" to={`/users/${this.props.apartment.createdBy.username}`}>
                            <Avatar className="apartmentbox-creator-avatar"
                                    style={{backgroundColor: getAvatarColor(this.props.apartment.createdBy.name)}} >
                                {this.props.apartment.createdBy.name[0].toUpperCase()}
                            </Avatar>
                            <span className="apartmentbox-creator-name">
                                {this.props.apartment.createdBy.name}
                            </span>
                            <span className="apartmentbox-creator-username">
                                {this.props.apartment.createdBy.username}
                            </span>
                            <span className="apartmentbox-creation-date">
                                {formatDateTime(this.props.apartment.creationDateTime)}
                            </span>
                        </Link>
                    </div>*/}
                    <div className="apartmentbox-options">
                        {editDropdownMenu}
                    </div>
                </div>
                <div className="apartmentbox-body">
                    <div className="apartmentbox-image">
                        {/*<img src={`${'http://localhost:8181/api/files/downloadFile/' + this.props.apartment.pictureFileIds[0]}`} alt=""/>*/}
                        <a href={`/apartments/${this.props.apartment.id}`} className="img" style={{backgroundImage: 'url(' + `${'http://localhost:8181/api/files/downloadFile/' + this.props.apartment.pictureFileIds[0]}` + ')'}}></a>
                    </div>
                    <div className="apartmentbox-properties">
                        <ul>
                            <li>
                                Internal surface: <strong>{this.props.apartment.cubicCapacity} m²</strong>
                            </li>
                            <li>
                                Year of construction: <strong>{this.props.apartment.power}</strong>
                            </li>
                            <li>
                                Number of rooms: <strong>{this.props.apartment.mileage}</strong>
                            </li>
                            <li>
                                Number of bathrooms: <strong>{this.props.apartment.yearOfManufacture}</strong>
                            </li>
                            <li>
                                Floor number: <strong>{this.props.apartment.floorNumber}</strong>
                            </li>

                            <li>
                                Price: <strong>{this.props.apartment.price} €</strong>
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
        <Menu onClick={props.handleMenuClick} className="apartmentbox-dots">
            <Menu.Item key="apartmentbox-edit" className="dropdown-item">
                <Link to={`/apartments/edit/${props.apartmentId}`}><Icon type="edit" /> Edit apartment</Link>
            </Menu.Item>
            <Menu.Item key="apartmentbox-delete" className="dropdown-item">
                <Icon type="delete" /> Delete apartment
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown
            overlay={dropdownMenu}
            trigger={['click']}
            getPopupContainer = { () => document.getElementsByClassName('apartmentbox-options')[0]}>
            <a className="ant-dropdown-link">
                <Icon type="ellipsis" className="apartmentbox-options-icon" style={{marginRight: 0}} />
            </a>
        </Dropdown>
    )
}

export default ApartmentBox;