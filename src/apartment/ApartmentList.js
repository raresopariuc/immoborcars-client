import React, { Component } from 'react';
import {getAllApartments, getApartmentsByFilter, getUserCreatedApartments} from '../util/APIUtils';
import ApartmentBox from './ApartmentBox';
import ApartmentInputSearch from './ApartmentInputSearch';
import LoadingIndicator  from '../common/LoadingIndicator';
import { Button, Icon, notification } from 'antd';
import { HOUSE_LIST_SIZE } from '../constants';
import { withRouter } from 'react-router-dom';
import './ApartmentList.css';
import HouseInputSearch from "../house/HouseInputSearch";

class ApartmentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apartments: [],
            page: 0,
            size: 10,
            totalElements: 0,
            totalPages: 0,
            last: true,
            isLoading: false
        };
        this.loadApartmentList = this.loadApartmentList.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
        this.filterApartments = this.filterApartments.bind(this);
    }

    loadApartmentList(page = 0, size = HOUSE_LIST_SIZE, filters = null) {
        let promise;
        if (this.props.username) {
            if (this.props.type === 'USER_CREATED_APARTMENTS') {
                promise = getUserCreatedApartments(this.props.username, page, size);
            }
        } else if (filters) {
            promise = getApartmentsByFilter(page, size, filters);
        } else {
            promise = getAllApartments(page, size);
        }

        if (!promise) {
            return;
        }

        this.setState({
            isLoading: true
        });

        promise.then(response => {
            const apartments = this.state.apartments.slice();

            this.setState({
                apartments: apartments.concat(response.content),
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

    filterApartments(filters) {
        // Reset State
        this.setState({
            apartments: [],
            page: 0,
            size: 10,
            totalElements: 0,
            totalPages: 0,
            last: true,
            isLoading: false
        });
        this.loadApartmentList(0, HOUSE_LIST_SIZE, filters);
    }

    componentDidMount() {
        this.loadApartmentList();
    }

    componentDidUpdate(nextProps) {
        if(this.props.isAuthenticated !== nextProps.isAuthenticated) {
            // Reset State
            this.setState({
                apartments: [],
                page: 0,
                size: 10,
                totalElements: 0,
                totalPages: 0,
                last: true,
                isLoading: false
            });
            this.loadApartmentList();
        }
    }

    handleLoadMore() {
        this.loadApartmentList(this.state.page + 1);
    }

    render() {
        const apartmentViews = [];
        this.state.apartments.forEach((apartment, apartmentIndex) => {
            apartmentViews.push(<ApartmentBox
                currentUser={this.props.currentUser}
                key={apartment.id}
                apartment={apartment} />)
        });

        return (
            <div className="apartments-and-search-container">
                {(!this.props.username && <ApartmentInputSearch filterApartments={this.filterApartments}/>)}
                <div className="apartments-container">
                    {apartmentViews}
                    {
                        !this.state.isLoading && this.state.apartments.length === 0 ? (
                            <div className="no-apartments-found">
                                <span>No apartments found!</span>
                            </div>
                        ) : null
                    }
                    {
                        !this.state.isLoading && !this.state.last ? (
                            <div className="load-more-apartments">
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

export default withRouter(ApartmentList)