import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './CarFilterBox.css';
import { Button, Icon } from "antd";

class CarFilterBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cubicCapacity: {
                minValue: '',
                maxValue: ''
            },
            power: {
                minValue: '',
                maxValue: ''
            },
            mileage: {
                minValue: '',
                maxValue: ''
            },
            yearOfManufacture: {
                minValue: '',
                maxValue: ''
            },
            fuel: {
                value: ''
            },
            gearbox: {
                value: ''
            },
            price: {
                minValue: '',
                maxValue: ''
            }
        }
    }

    addFilter(property, minValue, maxValue) {
        switch (property) {
            case 'cubicCapacity':
                this.setState({
                    cubicCapacity: {
                        minValue: '',
                        maxValue: ''
                    }
                });
                break;
            case 'power':
                this.setState({
                    power: {
                        minValue: '',
                        maxValue: ''
                    }
                });
                break;
            case 'mileage':
                this.setState({
                    mileage: {
                        minValue: '',
                        maxValue: ''
                    }
                });
                break;
            case 'yearOfManufacture':
                this.setState({
                    yearOfManufacture: {
                        minValue: '',
                        maxValue: ''
                    }
                });
                break;
            case 'fuel':
                this.setState({
                    fuel: {
                        value: ''
                    }
                });
                break;
            case 'gearbox':
                this.setState({
                    gearbox: {
                        value: ''
                    }
                });
                break;
            case 'price':
                this.setState({
                    price: {
                        minValue: '',
                        maxValue: ''
                    }
                });
                break;
        }
    }

    render() {

        const cubicCapacityValues = ['', '40', '60', '80', '100', '120', '150+'];
        const powerValues = ['', '100', '200', '400', '600', '900', '1000+'];
        const mileageValues = ['', '1', '2', '3', '4', '5+'];
        const yearOfManufactureValues = ['', '1', '2', '3+'];
        const fuelValues = ['', '1960', '1970', '1980', '1990', '2000', '2010', '2019'];
        const gearboxValues = ['', '1960', '1970', '1980', '1990', '2000', '2010', '2019'];

        return (
            <div className="search-container">
                <div className="search-category-select">
                    <Link to={"/"}><Icon type="home" className="nav-icon" /></Link>
                    <Link to={"/apartments"}><Icon type="database" className="nav-icon" /></Link>
                    <Link to={"/cars"}><Icon type="car" className="nav-icon" /></Link>
                </div>
                <div className="search-table">
                    <div className="search-row">
                        <div className="search-filter">
                            <label>Cubic capacity:</label>
                            <select>
                                {cubicCapacityValues.map(value =>
                                    <option key={value} value={value}>{value}</option>
                                )}
                            </select>
                            <label>-</label>
                            <select>
                                {cubicCapacityValues.map(value =>
                                    <option key={value} value={value}>{value}</option>
                                )}
                            </select>
                        </div>
                        <div className="search-filter">
                            <label>Power:</label>
                            <select>
                                {powerValues.map(value =>
                                    <option key={value} value={value}>{value}</option>
                                )}
                            </select>
                            <label>-</label>
                            <select>
                                {powerValues.map(value =>
                                    <option key={value} value={value}>{value}</option>
                                )}
                            </select>
                        </div>
                        <div className="search-filter">
                            <label>Mileage:</label>
                            <select>
                                {mileageValues.map(value =>
                                    <option key={value} value={value}>{value}</option>
                                )}
                            </select>
                            <label>-</label>
                            <select>
                                {mileageValues.map(value =>
                                    <option key={value} value={value}>{value}</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="search-row">
                        <div className="search-filter">
                            <label>Year of manufacture:</label>
                            <select>
                                {yearOfManufactureValues.map(value =>
                                    <option key={value} value={value}>{value}</option>
                                )}
                            </select>
                            <label>-</label>
                            <select>
                                {yearOfManufactureValues.map(value =>
                                    <option key={value} value={value}>{value}</option>
                                )}
                            </select>
                        </div>
                        <div className="search-filter">
                            <label>Fuel:</label>
                            <select>
                                {fuelValues.map(value =>
                                    <option key={value} value={value}>{value}</option>
                                )}
                            </select>
                            <label>-</label>
                            <select>
                                {fuelValues.map(value =>
                                    <option key={value} value={value}>{value}</option>
                                )}
                            </select>
                        </div>
                        <div className="search-filter">
                            <label>Gearbox:</label>
                            <select>
                                {gearboxValues.map(value =>
                                    <option key={value} value={value}>{value}</option>
                                )}
                            </select>
                            <label>-</label>
                            <select>
                                {gearboxValues.map(value =>
                                    <option key={value} value={value}>{value}</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="search-row">
                        <div className="search-filter"></div>
                        <div className="search-filter">
                            <label>Price:</label>
                            <select>
                                <option key="40" value="40">40</option>
                            </select>
                            <label>-</label>
                            <select>
                                <option key="40" value="40">40</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="search-button">
                    <Button>Search</Button>
                </div>
            </div>
        )
    }

}

export default withRouter(CarFilterBox)