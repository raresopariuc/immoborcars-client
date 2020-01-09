import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Button, Icon, Input, Select} from 'antd';
import '../house/HouseInputSearch.css';

const InputGroup = Input.Group;
const { Option } = Select;

class AnnouncementInputSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            priceMin: '',
            priceMax: ''
        };
        this.handlePriceMinChange = this.handlePriceMinChange.bind(this);
        this.handlePriceMaxChange = this.handlePriceMaxChange.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
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
        this.props.filterAnnouncements(this.state);
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
                                    width: 150,
                                    pointerEvents: 'none',
                                    color: '#000',
                                    backgroundColor: '#fff'
                                }}
                                defaultValue="Price (€)"
                                disabled />
                            <Input placeholder="Minimum" onChange={this.handlePriceMinChange} style={{width: 200, textAlign: 'center'}} />
                            <Input
                                style={{
                                    width: 30,
                                    pointerEvents: 'none',
                                    backgroundColor: '#fff'
                                }}
                                placeholder="-"
                                disabled />
                            <Input placeholder="Maximum" onChange={this.handlePriceMaxChange} style={{width: 200, textAlign: 'center'}} />
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

export default withRouter(AnnouncementInputSearch)