import React, { Component } from 'react';
import { Avatar, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { getAvatarColor } from '../util/Colors';
import { formatDateTime } from '../util/Helpers';
import {getHouseById, getHousePredictedPrice} from "../util/APIUtils";
import ImageGallery from 'react-image-gallery';
import '../../node_modules/react-image-gallery/styles/css/image-gallery.css';
import { MapComponent } from '../map/MapComponent';
import Plot from 'react-plotly.js';
import './House.css';

class House extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            description: '',
            price: '',
            predictedPrice: '',
            pictureFileIds: [],
            createdBy: {
                id: '',
                username: '',
                name: ' ',
                phoneNumber: ''
            },
            creationDateTime: '',
            internalSurface: '',
            yearOfConstruction: '',
            numberOfRooms: '',
            numberOfBathrooms: '',
            gardenSurface: '',
            numberOfFloors: '',
            latitude: 44.435,
            longitude: 26.101,
            isMarkerShown: true,
            isLoading: false
        };
        this.loadHouse = this.loadHouse.bind(this);
        this.getPredictedPrice = this.getPredictedPrice.bind(this);
    }

    loadHouse(id) {
        let promise = getHouseById(id);

        if (!promise) {
            return;
        }

        this.setState({
            isLoading: true
        });

        promise.then(response => {
            this.setState({
                id: response.id,
                title: response.title,
                description: response.description,
                price: response.price,
                pictureFileIds: response.pictureFileIds,
                createdBy: response.createdBy,
                creationDateTime: response.creationDateTime,
                internalSurface: response.internalSurface,
                yearOfConstruction: response.yearOfConstruction,
                numberOfRooms: response.numberOfRooms,
                numberOfBathrooms: response.numberOfBathrooms,
                gardenSurface: response.gardenSurface,
                numberOfFloors: response.numberOfFloors,
                latitude: response.latitude,
                longitude: response.longitude,
                isLoading: false
            })

            this.getPredictedPrice();

        }).catch(error => {
            this.setState({
                isLoading: false
            })
        });
    }

    getPredictedPrice() {
        const predictRequest = {
            "YearBuilt": this.state.yearOfConstruction,
            "TotalBasementArea": this.state.internalSurface,
            "TotalNumberOfRooms": this.state.numberOfRooms,
            "NumberOfBathrooms": this.state.numberOfBathrooms
        }
        let predictedPricePromise = getHousePredictedPrice(predictRequest);

        if (!predictedPricePromise) {
            return;
        }

        this.setState({
            isLoading: true
        });

        predictedPricePromise.then(response => {
            this.setState({
                predictedPrice: response.result,
                isLoading: false
            })
        }).catch(error => {
            this.setState({
                isLoading: false
            })
        })
    }

    componentDidMount() {
        this.loadHouse(this.props.match.params.id);
    }

    render() {
        let images = [];
        for (let i = 0; i < this.state.pictureFileIds.length; i++) {
            images = images.concat({
                original: 'http://localhost:8181/api/files/downloadFile/' + this.state.pictureFileIds[i],
                thumbnail: 'http://localhost:8181/api/files/downloadFile/' + this.state.pictureFileIds[i]
            })
        }

        return (
            <div className="house-container">
                <div className="house-content">
                    <div className="house-header">
                        <div className="house-title">
                            {this.state.title}
                            <span className="house-creation-date">
                                added at {formatDateTime(this.state.creationDateTime)}
                            </span>
                        </div>
                        <div className="house-price">Price: <strong>{this.state.price} €</strong></div>
                    </div>
                    <ImageGallery
                        autoPlay={true}
                        slideInterval={7000}
                        slideDuration={450}
                        showPlayButton={true}
                        showFullscreenButton={true}
                        showThumbnails={true}
                        showBullets={false}
                        items={images} />
                    <table className="house-properties">
                        <tr>
                            <td>Internal surface: <strong>{this.state.internalSurface} m²</strong></td>
                            <td>Year of construction: <strong>{this.state.yearOfConstruction}</strong></td>
                            <td>Number of rooms: <strong>{this.state.numberOfRooms}</strong></td>
                        </tr>
                        <tr>
                            <td>Garden surface: <strong>{this.state.gardenSurface} m²</strong></td>
                            <td>Number of floors: <strong>{this.state.numberOfFloors}</strong></td>
                            <td>Number of bathrooms: <strong>{this.state.numberOfBathrooms}</strong></td>
                        </tr>
                    </table>
                    <div className="house-description">
                        <p>{this.state.description}</p>
                    </div>

                    {this.props.authenticated ?
                        <Plot className="predicted-price-plot"
                            data={[
                                {
                                    x: ['Actual Price', 'Predicted Price'],
                                    y: [this.state.price, this.state.predictedPrice],
                                    type: 'scatter',
                                    mode: 'lines+markers',
                                    marker: {color: this.state.price < this.state.predictedPrice ? 'darkgreen' : 'red'}
                                },
                                {
                                    type: 'bar',
                                    marker: {color: this.state.price < this.state.predictedPrice ? ['green', 'orange'] : ['orange', 'green']},
                                    x: ['Actual Price', 'Predicted Price'],
                                    y: [this.state.price, this.state.predictedPrice]
                                },
                                ]}
                            layout={{autosize: true, showlegend: false, hovermode: 'closest', title: 'AI Price graph'}}
                        />
                        : null}
                    <div className="house-creator-info">
                        <Link className="creator-link" to={`/users/${this.state.createdBy.username}`}>
                            <Avatar className="house-creator-avatar"
                                    style={{backgroundColor: getAvatarColor(this.state.createdBy.name)}} >
                                {this.state.createdBy.name[0].toUpperCase()}
                            </Avatar>
                            <span className="house-creator-name">
                                {this.state.createdBy.name}
                            </span>
                            <span className="house-creator-phoneNumber">
                                {this.state.createdBy.phoneNumber}
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default House;