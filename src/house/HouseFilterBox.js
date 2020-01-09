import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './HouseFilterBox.css';
import { Button, Icon } from "antd";

class HouseFilterBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            internalSurface: {
                minValue: '',
                maxValue: ''
            },
            gardenSurface: {
                minValue: '',
                maxValue: ''
            },
            numberOfRooms: {
                minValue: '',
                maxValue: ''
            },
            numberOfBathrooms: {
                minValue: '',
                maxValue: ''
            },
            yearOfConstruction: {
                minValue: '',
                maxValue: ''
            },
            price: {
                minValue: '',
                maxValue: ''
            }
        }
    }

    addFilter(property, minValue, maxValue) {
        switch (property) {
            case 'internalSurface':
                this.setState({
                    internalSurface: {
                        minValue: '',
                        maxValue: ''
                    }
                });
                break;
            case 'gardenSurface':
                this.setState({
                    gardenSurface: {
                        minValue: '',
                        maxValue: ''
                    }
                });
                break;
            case 'numberOfRooms':
                this.setState({
                    numberOfRooms: {
                        minValue: '',
                        maxValue: ''
                    }
                });
                break;
            case 'numberOfBathrooms':
                this.setState({
                    numberOfBathrooms: {
                        minValue: '',
                        maxValue: ''
                    }
                });
                break;
            case 'yearOfConstruction':
                this.setState({
                    yearOfConstruction: {
                        minValue: '',
                        maxValue: ''
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

        const internalSurfaceValues = ['', '40', '60', '80', '100', '120', '150+'];
        const gardenSurfaceValues = ['', '100', '200', '400', '600', '900', '1000+'];
        const numberOfRoomsValues = ['', '1', '2', '3', '4', '5+'];
        const numberOfBathroomsValues = ['', '1', '2', '3+'];
        const yearOfConstructionValues = ['', '1960', '1970', '1980', '1990', '2000', '2010', '2019'];

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
                            <label>Internal surface:</label>
                            <select>
                                {internalSurfaceValues.map(value =>
                                    <option key={value} value={value}>{value}</option>
                                )}
                            </select>
                            <label>-</label>
                            <select>
                                {internalSurfaceValues.map(value =>
                                    <option key={value} value={value}>{value}</option>
                                )}
                            </select>
                        </div>
                        <div className="search-filter">
                            <label>Garden surface:</label>
                            <select>
                                {gardenSurfaceValues.map(value =>
                                    <option key={value} value={value}>{value}</option>
                                )}
                            </select>
                            <label>-</label>
                            <select>
                                {gardenSurfaceValues.map(value =>
                                    <option key={value} value={value}>{value}</option>
                                )}
                            </select>
                        </div>
                        <div className="search-filter">
                            <label>Number of rooms:</label>
                            <select>
                                {numberOfRoomsValues.map(value =>
                                    <option key={value} value={value}>{value}</option>
                                )}
                            </select>
                            <label>-</label>
                            <select>
                                {numberOfRoomsValues.map(value =>
                                    <option key={value} value={value}>{value}</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="search-row">
                        <div className="search-filter">
                            <label>Number of bathrooms:</label>
                            <select>
                                {numberOfBathroomsValues.map(value =>
                                    <option key={value} value={value}>{value}</option>
                                )}
                            </select>
                            <label>-</label>
                            <select>
                                {numberOfBathroomsValues.map(value =>
                                    <option key={value} value={value}>{value}</option>
                                )}
                            </select>
                        </div>
                        <div className="search-filter">
                            <label>Year of construction:</label>
                            <select>
                                {yearOfConstructionValues.map(value =>
                                    <option key={value} value={value}>{value}</option>
                                )}
                            </select>
                            <label>-</label>
                            <select>
                                {yearOfConstructionValues.map(value =>
                                    <option key={value} value={value}>{value}</option>
                                )}
                            </select>
                        </div>
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

export default withRouter(HouseFilterBox)