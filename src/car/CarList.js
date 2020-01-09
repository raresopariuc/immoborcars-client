import React, { Component } from 'react';
import {getAllCars, getCarsByFilter, getUserCreatedCars} from '../util/APIUtils';
import CarBox from './CarBox';
import CarInputSearch from './CarInputSearch';
import LoadingIndicator  from '../common/LoadingIndicator';
import { Button, Icon, notification } from 'antd';
import { HOUSE_LIST_SIZE } from '../constants';
import { withRouter } from 'react-router-dom';
import './CarList.css';
import ApartmentInputSearch from "../apartment/ApartmentInputSearch";

class CarList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: [],
            page: 0,
            size: 10,
            totalElements: 0,
            totalPages: 0,
            last: true,
            isLoading: false
        };
        this.loadCarList = this.loadCarList.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
        this.filterCars = this.filterCars.bind(this);
    }

    loadCarList(page = 0, size = HOUSE_LIST_SIZE, filters = null) {
        let promise;
        if (this.props.username) {
            if (this.props.type === 'USER_CREATED_CARS') {
                promise = getUserCreatedCars(this.props.username, page, size);
            }
        } else if (filters) {
            promise = getCarsByFilter(page, size, filters);
        } else {
            promise = getAllCars(page, size);
        }

        if (!promise) {
            return;
        }

        this.setState({
            isLoading: true
        });

        promise.then(response => {
            const cars = this.state.cars.slice();

            this.setState({
                cars: cars.concat(response.content),
                page: response.page,
                size: response.size,
                totalElements: response.totalElements,
                totalPages: response.totalPages,
                last: response.last,
                isLoading: false
            })
        }).catch(error => {
            this.setState({
                isLoading: false
            })
        });
    }

    filterCars(filters) {
        // Reset State
        this.setState({
            cars: [],
            page: 0,
            size: 10,
            totalElements: 0,
            totalPages: 0,
            last: true,
            isLoading: false
        });
        this.loadCarList(0, HOUSE_LIST_SIZE, filters);
    }

    componentDidMount() {
        this.loadCarList();
    }

    componentDidUpdate(nextProps) {
        if(this.props.isAuthenticated !== nextProps.isAuthenticated) {
            // Reset State
            this.setState({
                cars: [],
                page: 0,
                size: 10,
                totalElements: 0,
                totalPages: 0,
                last: true,
                isLoading: false
            });
            this.loadCarList();
        }
    }

    handleLoadMore() {
        this.loadCarList(this.state.page + 1);
    }

    render() {
        const carViews = [];
        this.state.cars.forEach((car, carIndex) => {
            carViews.push(<CarBox
                currentUser={this.props.currentUser}
                key={car.id}
                car={car} />)
        });

        return (
            <div className="cars-and-search-container">
                {(!this.props.username && <CarInputSearch filterCars={this.filterCars}/>)}
                <div className="cars-container">
                    {carViews}
                    {
                        !this.state.isLoading && this.state.cars.length === 0 ? (
                            <div className="no-cars-found">
                                <span>No cars found!</span>
                            </div>
                        ) : null
                    }
                    {
                        !this.state.isLoading && !this.state.last ? (
                            <div className="load-more-cars">
                                <Button type="dashed" onClick={this.handleLoadMore} disabled={this.state.isLoading}>
                                    <Icon type="plus" /> Load more
                                </Button>
                            </div>) : null
                    }
                    {
                        this.state.isLoading ?
                            <LoadingIndicator/> : null
                    }
                </div>
            </div>
        );
    }
}

export default withRouter(CarList)