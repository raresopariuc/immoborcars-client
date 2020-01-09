import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Button, Icon, Input, Select} from 'antd';
import './CarInputSearch.css';

const InputGroup = Input.Group;
const { Option } = Select;

class CarInputSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cubicCapacityMin: '',
            cubicCapacityMax: '',
            powerMin: '',
            powerMax: '',
            mileageMin: '',
            mileageMax: '',
            yearOfManufactureMin: '',
            yearOfManufactureMax: '',
            priceMin: '',
            priceMax: ''
        };
        this.handleCubicCapacityMinChange = this.handleCubicCapacityMinChange.bind(this);
        this.handleCubicCapacityMaxChange = this.handleCubicCapacityMaxChange.bind(this);
        this.handlePowerMinChange = this.handlePowerMinChange.bind(this);
        this.handlePowerMaxChange = this.handlePowerMaxChange.bind(this);
        this.handleMileageMinChange = this.handleMileageMinChange.bind(this);
        this.handleMileageMaxChange = this.handleMileageMaxChange.bind(this);
        this.handleYearOfManufactureMinChange = this.handleYearOfManufactureMinChange.bind(this);
        this.handleYearOfManufactureMaxChange = this.handleYearOfManufactureMaxChange.bind(this);
        this.handlePriceMinChange = this.handlePriceMinChange.bind(this);
        this.handlePriceMaxChange = this.handlePriceMaxChange.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
    }

    handleCubicCapacityMinChange(event) {
        const value = event.target.value;
        this.setState({
            cubicCapacityMin: value
        });
    }

    handleCubicCapacityMaxChange(event) {
        const value = event.target.value;
        this.setState({
            cubicCapacityMax: value
        });
    }

    handlePowerMinChange(event) {
        const value = event.target.value;
        this.setState({
            powerMin: value
        });
    }

    handlePowerMaxChange(event) {
        const value = event.target.value;
        this.setState({
            powerMax: value
        });
    }

    handleMileageMinChange(event) {
        const value = event.target.value;
        this.setState({
            mileageMin: value
        });
    }

    handleMileageMaxChange(event) {
        const value = event.target.value;
        this.setState({
            mileageMax: value
        });
    }

    handleYearOfManufactureMinChange(event) {
        const value = event.target.value;
        this.setState({
            yearOfManufactureMin: value
        });
    }

    handleYearOfManufactureMaxChange(event) {
        const value = event.target.value;
        this.setState({
            yearOfManufactureMax: value
        });
    }

    handlePriceMinChange(event) {
        const value = event.target.value;
        this.setState({
            priceMin: value
        });
    }

    handlePriceMaxChange(event) {
        const value = event.target.value;
        this.setState({
            priceMax: value
        });
    }

    applyFilter() {
        this.props.filterCars(this.state);
    }

    render() {
        return (
            <div className="input-search-container">
                <div className="input-search-category-select">
                    <Link to={"/"}><Icon type="home" className="nav-icon" /></Link>
                    <Link to={"/apartments"}><Icon type="database" className="nav-icon" /></Link>
                    <Link to={"/cars"}><Icon type="car" className="nav-icon" /></Link>
                </div>
                <div className="input-search-table">
                    <div className="input-search-row">
                        <InputGroup className="input-search-filter" compact >
                            <Input
                                style={{
                                    width: 170,
                                    pointerEvents: 'none',
                                    color: '#000',
                                    backgroundColor: '#fff'
                                }}
                                defaultValue="Cubic capacity (cm³)"
                                disabled />
                            <Input placeholder="Minimum" onChange={this.handleCubicCapacityMinChange} style={{width: 100, textAlign: 'center'}} />
                            <Input
                                style={{
                                    width: 30,
                                    pointerEvents: 'none',
                                    backgroundColor: '#fff'
                                }}
                                placeholder="-"
                                disabled />
                            <Input placeholder="Maximum" onChange={this.handleCubicCapacityMaxChange} style={{width: 100, textAlign: 'center'}} />
                        </InputGroup>
                        <InputGroup className="input-search-filter" compact >
                            <Input
                                style={{
                                    width: 170,
                                    pointerEvents: 'none',
                                    color: '#000',
                                    backgroundColor: '#fff'
                                }}
                                defaultValue="Power (HP)"
                                disabled />
                            <Input placeholder="Minimum" onChange={this.handlePowerMinChange} style={{width: 100, textAlign: 'center'}} />
                            <Input
                                style={{
                                    width: 30,
                                    pointerEvents: 'none',
                                    backgroundColor: '#fff'
                                }}
                                placeholder="-"
                                disabled />
                            <Input placeholder="Maximum" onChange={this.handlePowerMaxChange} style={{width: 100, textAlign: 'center'}} />
                        </InputGroup>
                    </div>
                    <div className="input-search-row">
                        <InputGroup className="input-search-filter" compact >
                            <Input
                                style={{
                                    width: 170,
                                    pointerEvents: 'none',
                                    color: '#000',
                                    backgroundColor: '#fff'
                                }}
                                defaultValue="Mileage"
                                disabled />
                            <Input placeholder="Minimum" onChange={this.handleMileageMinChange} style={{width: 100, textAlign: 'center'}} />
                            <Input
                                style={{
                                    width: 30,
                                    pointerEvents: 'none',
                                    backgroundColor: '#fff'
                                }}
                                placeholder="-"
                                disabled />
                            <Input placeholder="Maximum" onChange={this.handleMileageMaxChange} style={{width: 100, textAlign: 'center'}} />
                        </InputGroup>
                        <InputGroup className="input-search-filter" compact >
                            <Input
                                style={{
                                    width: 170,
                                    pointerEvents: 'none',
                                    color: '#000',
                                    backgroundColor: '#fff'
                                }}
                                defaultValue="Year of manufacture"
                                disabled />
                            <Input placeholder="Minimum" onChange={this.handleYearOfManufactureMinChange} style={{width: 100, textAlign: 'center'}} />
                            <Input
                                style={{
                                    width: 30,
                                    pointerEvents: 'none',
                                    backgroundColor: '#fff'
                                }}
                                placeholder="-"
                                disabled />
                            <Input placeholder="Maximum" onChange={this.handleYearOfManufactureMaxChange} style={{width: 100, textAlign: 'center'}} />
                        </InputGroup>
                    </div>
                    <div className="input-search-row">
                        <InputGroup className="input-search-filter" compact >
                            <Input
                                style={{
                                    width: 170,
                                    pointerEvents: 'none',
                                    color: '#000',
                                    backgroundColor: '#fff'
                                }}
                                defaultValue="Price (€)"
                                disabled />
                            <Input placeholder="Minimum" onChange={this.handlePriceMinChange} style={{width: 100, textAlign: 'center'}} />
                            <Input
                                style={{
                                    width: 30,
                                    pointerEvents: 'none',
                                    backgroundColor: '#fff'
                                }}
                                placeholder="-"
                                disabled />
                            <Input placeholder="Maximum" onChange={this.handlePriceMaxChange} style={{width: 100, textAlign: 'center'}} />
                        </InputGroup>
                    </div>
                </div>
                <div className="input-search-button">
                    <Button onClick={this.applyFilter}>Search</Button>
                </div>
            </div>
        )
    }

}

export default withRouter(CarInputSearch)