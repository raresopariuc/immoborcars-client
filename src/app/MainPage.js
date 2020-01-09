import React, {Component} from 'react';
import {getAllHouses, getAllApartments, getAllCars, getHousesByFilter, getApartmentsByFilter, getCarsByFilter} from '../util/APIUtils';
import HouseBox from '../house/HouseBox';
import ApartmentBox from '../apartment/ApartmentBox';
import CarBox from '../car/CarBox';
import AnnouncementInputSearch from './AnnouncementInputSearch';
import LoadingIndicator from '../common/LoadingIndicator';
import {Button, Icon} from 'antd';
import {HOUSE_LIST_SIZE} from '../constants';
import {withRouter} from 'react-router-dom';
import '../house/HouseList.css';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            houses: [],
            apartments: [],
            cars: [],
            announcementViews: [],
            page: 0,
            size: 10,
            totalElements: 0,
            totalPages: 0,
            last: true,
            isLoading: false
        };
        this.loadAnnouncementList = this.loadAnnouncementList.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
        this.filterAnnouncements = this.filterAnnouncements.bind(this);
        this.addHousesToArray = this.addHousesToArray.bind(this);
        this.addApartmentsToArray = this.addApartmentsToArray.bind(this);
        this.addCarsToArray = this.addCarsToArray.bind(this);
        this.sortAnnouncements = this.sortAnnouncements(this);
    }

    loadAnnouncementList(page = 0, size = HOUSE_LIST_SIZE, filters = null) {
        let housesPromise, apartmentsPromise, carsPromise;
        if (filters) {
            housesPromise = getHousesByFilter(page, size, filters);
            apartmentsPromise = getApartmentsByFilter(page, size, filters);
            carsPromise = getCarsByFilter(page, size, filters);
        } else {
            housesPromise = getAllHouses(page, size);
            apartmentsPromise = getAllApartments(page, size);
            carsPromise = getAllCars(page, size);
        }

        if (!housesPromise && !apartmentsPromise && !carsPromise) {
            return;
        }

        this.setState({
            isLoading: true
        });

        housesPromise.then(response => {
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

            this.addHousesToArray(0, this.state.houses);

        }).catch(error => {
            this.setState({
                isLoading: false
            })
        });

        apartmentsPromise.then(response => {
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

            this.addApartmentsToArray(0, this.state.apartments);

        }).catch(error => {
            this.setState({
                isLoading: false
            })
        });

        carsPromise.then(response => {
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

            this.addCarsToArray(0, this.state.cars);

        }).catch(error => {
            this.setState({
                isLoading: false
            })
        });
    }

    filterAnnouncements(filters) {
        // Reset State
        this.setState({
            houses: [],
            apartments: [],
            cars: [],
            announcementViews: [],
            page: 0,
            size: 10,
            totalElements: 0,
            totalPages: 0,
            last: true,
            isLoading: false
        });
        this.loadAnnouncementList(0, HOUSE_LIST_SIZE, filters);
    }

    componentDidMount() {
        this.loadAnnouncementList();
    }

    componentDidUpdate(nextProps) {
        if(this.props.isAuthenticated !== nextProps.isAuthenticated) {
            // Reset State
            this.setState({
                houses: [],
                apartments: [],
                cars: [],
                announcementViews: [],
                page: 0,
                size: 10,
                totalElements: 0,
                totalPages: 0,
                last: true,
                isLoading: false
            });
            this.loadAnnouncementList();
        }
    }

    handleLoadMore() {
        this.loadAnnouncementList(this.state.page + 1);
    }

    addHousesToArray(index, houses) {
        const announcementViews = this.state.announcementViews.slice();

        if(index < houses.length) {
            this.setState({
                announcementViews: announcementViews.concat(
                    <HouseBox
                        currentUser={this.props.currentUser}
                        key={houses[index].id}
                        house={houses[index]}
                        creationDateTime={houses[index].creationDateTime} />
                )
            });
            this.addHousesToArray(index+1, houses);
        }
    }

    addApartmentsToArray(index, apartments) {
        const announcementViews = this.state.announcementViews.slice();

        if(index < apartments.length) {
            this.setState({
                announcementViews: announcementViews.concat(
                    <ApartmentBox
                        currentUser={this.props.currentUser}
                        key={apartments[index].id}
                        apartment={apartments[index]}
                        creationDateTime={apartments[index].creationDateTime} />
                )
            });
            this.addApartmentsToArray(index+1, apartments);
        }
    }

    addCarsToArray(index, cars) {
        const announcementViews = this.state.announcementViews.slice();

        if(index < cars.length) {
            this.setState({
                announcementViews: announcementViews.concat(
                    <CarBox
                        currentUser={this.props.currentUser}
                        key={cars[index].id}
                        car={cars[index]}
                        creationDateTime={cars[index].creationDateTime} />
                )
            });
            this.addCarsToArray(index+1, cars);
        }
    }

    sortAnnouncements() {
        var sortedAnnouncements = this.state.announcementViews.sort(
            function(a, b) {
                let aDate = new Date(a.creationDateTime);
                let bDate = new Date(b.creationDateTime);
                console.log(aDate.getDate());
                console.log(bDate.getDate());
                return aDate.getTime() < bDate.getTime() ? 1 : -1;
            }
        );
        this.setState({
            announcementViews: sortedAnnouncements
        });
    }

    render() {

        return (
            <div className="houses-and-search-container">
                {(!this.props.username && <AnnouncementInputSearch filterAnnouncements={this.filterAnnouncements}/>)}
                <div className="houses-container">
                    {this.state.announcementViews}
                    {
                        !this.state.isLoading && this.state.announcementViews.length === 0 ? (
                            <div className="no-houses-found">
                                <span>No announcements found!</span>
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

export default withRouter(MainPage)