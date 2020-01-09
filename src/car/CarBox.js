import React, { Component } from 'react';
import { Menu, Dropdown, Avatar, Icon, notification } from 'antd';
import { deleteCar } from '../util/APIUtils';
import { Link } from 'react-router-dom';
import { getAvatarColor } from '../util/Colors';
import { formatDateTime } from '../util/Helpers';
import './CarBox.css';

class CarBox extends Component {

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
        if(key === "carbox-delete") {
            deleteCar(this.props.car.id)
                .then(response => {
                    //this.props.history.push("/");
                    window.location.reload();
                }).catch(error => {
                    if(error.status === 500) {
                        notification.error({
                            message: 'Car was not deleted!',
                            description: error.message || 'Sorry! Something went wrong. Please try again!'
                        });
                    }
                });
        }
    }

    render() {

        const editDropdownMenu = [];
        if(this.props.currentUser && this.props.currentUser.username === this.props.car.createdBy.username) {
            editDropdownMenu.push(
                <EditDropdownMenu
                    key = {this.props.car.id}
                    carId = {this.props.car.id}
                    handleMenuClick={this.handleMenuClick}
                />
            );
        }

        return (
            <div className="carbox-content">
                <div className="carbox-header">
                    <Link className="carbox-title" to={`/cars/${this.props.car.id}`}>
                        {this.props.car.title}
                        <span className="car-creation-date">
                            added at {formatDateTime(this.props.car.creationDateTime)}
                        </span>
                    </Link>
                    {/*<div className="carbox-creator-info">
                        <Link className="creator-link" to={`/users/${this.props.car.createdBy.username}`}>
                            <Avatar className="carbox-creator-avatar"
                                    style={{backgroundColor: getAvatarColor(this.props.car.createdBy.name)}} >
                                {this.props.car.createdBy.name[0].toUpperCase()}
                            </Avatar>
                            <span className="carbox-creator-name">
                                {this.props.car.createdBy.name}
                            </span>
                            <span className="carbox-creator-username">
                                {this.props.car.createdBy.username}
                            </span>
                            <span className="carbox-creation-date">
                                {formatDateTime(this.props.car.creationDateTime)}
                            </span>
                        </Link>
                    </div>*/}
                    <div className="carbox-options">
                        {editDropdownMenu}
                    </div>
                </div>
                <div className="carbox-body">
                    <div className="carbox-image">
                        {/*<img src={`${'http://localhost:8181/api/files/downloadFile/' + this.props.car.pictureFileIds[0]}`} alt=""/>*/}
                        <a href={`/cars/${this.props.car.id}`} className="img" style={{backgroundImage: 'url(' + `${'http://localhost:8181/api/files/downloadFile/' + this.props.car.pictureFileIds[0]}` + ')'}}></a>
                    </div>
                    <div className="carbox-properties">
                        <ul>
                            <li>
                                Cubic capacity: <strong>{this.props.car.cubicCapacity} cm³</strong>
                            </li>
                            <li>
                                Power: <strong>{this.props.car.power} HP</strong>
                            </li>
                            <li>
                                Mileage: <strong>{this.props.car.mileage} km</strong>
                            </li>
                            <li>
                                Year of manufacture: <strong>{this.props.car.yearOfManufacture}</strong>
                            </li>
                            <li>
                                Fuel: <strong>{this.props.car.fuel}</strong>
                            </li>
                            <li>
                                Gearbox: <strong>{this.props.car.gearbox}</strong>
                            </li>

                            <li>
                                Price: <strong>{this.props.car.price} €</strong>
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
        <Menu onClick={props.handleMenuClick} className="carbox-dots">
            <Menu.Item key="carbox-edit" className="dropdown-item">
                <Link to={`/cars/edit/${props.carId}`}><Icon type="edit" /> Edit car</Link>
            </Menu.Item>
            <Menu.Item key="carbox-delete" className="dropdown-item">
                <Icon type="delete" /> Delete car
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown
            overlay={dropdownMenu}
            trigger={['click']}
            getPopupContainer = { () => document.getElementsByClassName('carbox-options')[0]}>
            <a className="ant-dropdown-link">
                <Icon type="ellipsis" className="carbox-options-icon" style={{marginRight: 0}} />
            </a>
        </Dropdown>
    )
}

export default CarBox;