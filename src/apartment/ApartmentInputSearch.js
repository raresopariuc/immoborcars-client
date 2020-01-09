import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Button, Icon, Input, Select} from 'antd';
import './ApartmentInputSearch.css';

const InputGroup = Input.Group;
const { Option } = Select;

class ApartmentInputSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            internalSurfaceMin: '',
            internalSurfaceMax: '',
            floorNumberMin: '',
            floorNumberMax: '',
            numberOfRoomsMin: '',
            numberOfRoomsMax: '',
            numberOfBathroomsMin: '',
            numberOfBathroomsMax: '',
            yearOfConstructionMin: '',
            yearOfConstructionMax: '',
            priceMin: '',
            priceMax: ''
        };
        this.handleInternalSurfaceMinChange = this.handleInternalSurfaceMinChange.bind(this);
        this.handleInternalSurfaceMaxChange = this.handleInternalSurfaceMaxChange.bind(this);
        this.handleFloorNumberMinChange = this.handleFloorNumberMinChange.bind(this);
        this.handleFloorNumberMaxChange = this.handleFloorNumberMaxChange.bind(this);
        this.handleNumberOfRoomsMinChange = this.handleNumberOfRoomsMinChange.bind(this);
        this.handleNumberOfRoomsMaxChange = this.handleNumberOfRoomsMaxChange.bind(this);
        this.handleNumberOfBathroomsMinChange = this.handleNumberOfBathroomsMinChange.bind(this);
        this.handleNumberOfBathroomsMaxChange = this.handleNumberOfBathroomsMaxChange.bind(this);
        this.handleYearOfConstructionMinChange = this.handleYearOfConstructionMinChange.bind(this);
        this.handleYearOfConstructionMaxChange = this.handleYearOfConstructionMaxChange.bind(this);
        this.handlePriceMinChange = this.handlePriceMinChange.bind(this);
        this.handlePriceMaxChange = this.handlePriceMaxChange.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
    }

    handleInternalSurfaceMinChange(event) {
        const value = event.target.value;
        this.setState({
            internalSurfaceMin: value
        });
    }

    handleInternalSurfaceMaxChange(event) {
        const value = event.target.value;
        this.setState({
            internalSurfaceMax: value
        });
    }

    handleFloorNumberMinChange(event) {
        const value = event.target.value;
        this.setState({
            floorNumberMin: value
        });
    }

    handleFloorNumberMaxChange(event) {
        const value = event.target.value;
        this.setState({
            floorNumberMax: value
        });
    }

    handleNumberOfRoomsMinChange(event) {
        const value = event.target.value;
        this.setState({
            numberOfRoomsMin: value
        });
    }

    handleNumberOfRoomsMaxChange(event) {
        const value = event.target.value;
        this.setState({
            numberOfRoomsMax: value
        });
    }

    handleNumberOfBathroomsMinChange(event) {
        const value = event.target.value;
        this.setState({
            numberOfBathroomsMin: value
        });
    }

    handleNumberOfBathroomsMaxChange(event) {
        const value = event.target.value;
        this.setState({
            numberOfBathroomsMax: value
        });
    }

    handleYearOfConstructionMinChange(event) {
        const value = event.target.value;
        this.setState({
            yearOfConstructionMin: value
        });
    }

    handleYearOfConstructionMaxChange(event) {
        const value = event.target.value;
        this.setState({
            yearOfConstructionMax: value
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
        this.props.filterApartments(this.state);
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
                                defaultValue="Internal surface (m²)"
                                disabled />
                            <Input placeholder="Minimum" onChange={this.handleInternalSurfaceMinChange} style={{width: 100, textAlign: 'center'}} />
                            <Input
                                style={{
                                    width: 30,
                                    pointerEvents: 'none',
                                    backgroundColor: '#fff'
                                }}
                                placeholder="-"
                                disabled />
                            <Input placeholder="Maximum" onChange={this.handleInternalSurfaceMaxChange} style={{width: 100, textAlign: 'center'}} />
                        </InputGroup>
                        <InputGroup className="input-search-filter" compact >
                            <Input
                                style={{
                                    width: 170,
                                    pointerEvents: 'none',
                                    color: '#000',
                                    backgroundColor: '#fff'
                                }}
                                defaultValue="Floor number"
                                disabled />
                            <Input placeholder="Minimum" onChange={this.handleFloorNumberMinChange} style={{width: 100, textAlign: 'center'}} />
                            <Input
                                style={{
                                    width: 30,
                                    pointerEvents: 'none',
                                    backgroundColor: '#fff'
                                }}
                                placeholder="-"
                                disabled />
                            <Input placeholder="Maximum" onChange={this.handleFloorNumberMaxChange} style={{width: 100, textAlign: 'center'}} />
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
                                defaultValue="Number of rooms"
                                disabled />
                            <Input placeholder="Minimum" onChange={this.handleNumberOfRoomsMinChange} style={{width: 100, textAlign: 'center'}} />
                            <Input
                                style={{
                                    width: 30,
                                    pointerEvents: 'none',
                                    backgroundColor: '#fff'
                                }}
                                placeholder="-"
                                disabled />
                            <Input placeholder="Maximum" onChange={this.handleNumberOfRoomsMaxChange} style={{width: 100, textAlign: 'center'}} />
                        </InputGroup>
                        <InputGroup className="input-search-filter" compact >
                            <Input
                                style={{
                                    width: 170,
                                    pointerEvents: 'none',
                                    color: '#000',
                                    backgroundColor: '#fff'
                                }}
                                defaultValue="Number of bathrooms"
                                disabled />
                            <Input placeholder="Minimum" onChange={this.handleNumberOfBathroomsMinChange} style={{width: 100, textAlign: 'center'}} />
                            <Input
                                style={{
                                    width: 30,
                                    pointerEvents: 'none',
                                    backgroundColor: '#fff'
                                }}
                                placeholder="-"
                                disabled />
                            <Input placeholder="Maximum" onChange={this.handleNumberOfBathroomsMaxChange} style={{width: 100, textAlign: 'center'}} />
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
                                defaultValue="Year of construction"
                                disabled />
                            <Input placeholder="Minimum" onChange={this.handleYearOfConstructionMinChange} style={{width: 100, textAlign: 'center'}} />
                            <Input
                                style={{
                                    width: 30,
                                    pointerEvents: 'none',
                                    backgroundColor: '#fff'
                                }}
                                placeholder="-"
                                disabled />
                            <Input placeholder="Maximum" onChange={this.handleYearOfConstructionMaxChange} style={{width: 100, textAlign: 'center'}} />
                        </InputGroup>
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

export default withRouter(ApartmentInputSearch)