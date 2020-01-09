import React, {Component} from 'react';
import {getAllHouses, getHousesByFilter, getUserCreatedHouses} from '../util/APIUtils';
import HouseBox from './HouseBox';
import HouseInputSearch from './HouseInputSearch';
import LoadingIndicator from '../common/LoadingIndicator';
import {Button, Icon} from 'antd';
import {HOUSE_LIST_SIZE} from '../constants';
import {withRouter} from 'react-router-dom';
import './HouseList.css';

class HouseList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            houses: [],
            page: 0,
            size: 10,
            totalElements: 0,
            totalPages: 0,
            last: true,
            isLoading: false
        };
        this.loadHouseList = this.loadHouseList.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
        this.filterHouses = this.filterHouses.bind(this);
    }

    loadHouseList(page = 0, size = HOUSE_LIST_SIZE, filters = null) {
        let promise;
        if (this.props.username) {
            if (this.props.type === 'USER_CREATED_HOUSES') {
                promise = getUserCreatedHouses(this.props.username, page, size);
            }
        } else if (filters) {
            promise = getHousesByFilter(page, size, filters);
        } else {
            promise = getAllHouses(page, size);
        }

        if (!promise) {
            return;
        }

        this.setState({
            isLoading: true
        });

        promise.then(response => {
            const houses = this.state.houses.slice();

            this.setState({
                houses: houses.concat(response.content),
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

    filterHouses(filters) {
        // Reset State
        this.setState({
            houses: [],
            page: 0,
            size: 10,
            totalElements: 0,
            totalPages: 0,
            last: true,
            isLoading: false
        });
        this.loadHouseList(0, HOUSE_LIST_SIZE, filters);
    }

    componentDidMount() {
        this.loadHouseList();
    }

    componentDidUpdate(nextProps) {
        if(this.props.isAuthenticated !== nextProps.isAuthenticated) {
            // Reset State
            this.setState({
                houses: [],
                page: 0,
                size: 10,
                totalElements: 0,
                totalPages: 0,
                last: true,
                isLoading: false
            });
            this.loadHouseList();
        }
    }

    handleLoadMore() {
        this.loadHouseList(this.state.page + 1);
    }

    render() {
        const houseViews = [];
        this.state.houses.forEach((house, houseIndex) => {
            houseViews.push(<HouseBox
                currentUser={this.props.currentUser}
                key={house.id}
                house={house} />)
        });

        return (
            <div className="houses-and-search-container">
                {(!this.props.username && <HouseInputSearch filterHouses={this.filterHouses}/>)}
                <div className="houses-container">
                    {houseViews}
                    {
                        !this.state.isLoading && this.state.houses.length === 0 ? (
                            <div className="no-houses-found">
                                <span>No houses found!</span>
                            </div>
                        ) : null
                    }
                    {
                        !this.state.isLoading && !this.state.last ? (
                            <div className="load-more-houses">
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

export default withRouter(HouseList)