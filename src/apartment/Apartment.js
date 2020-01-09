import React, { Component } from 'react';
import { Avatar, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { getAvatarColor } from '../util/Colors';
import { formatDateTime } from '../util/Helpers';
import { getApartmentById, getHousePredictedPrice } from "../util/APIUtils";
import ImageGallery from 'react-image-gallery';
import '../../node_modules/react-image-gallery/styles/css/image-gallery.css';
import { MapComponent } from '../map/MapComponent';
import Plot from 'react-plotly.js';
import './Apartment.css';

class Apartment extends Component {
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
            floorNumber: '',
            latitude: 44.435,
            longitude: 26.101,
            isMarkerShown: true,
            isLoading: false
        };
        this.loadApartment = this.loadApartment.bind(this);
        this.getPredictedPrice = this.getPredictedPrice.bind(this);
    }

    loadApartment(id) {
        let promise = getApartmentById(id);

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
                floorNumber: response.floorNumber,
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
        this.loadApartment(this.props.match.params.id);
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
            <div className="apartment-container">
                <div className="apartment-content">
                    <div className="apartment-header">
                        <div className="apartment-title">
                            {this.state.title}
                            <span className="apartment-creation-date">
                                added at {formatDateTime(this.state.creationDateTime)}
                            </span>
                        </div>
                        <div className="apartment-price">Price: <strong>{this.state.price} €</strong></div>
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
                    <table className="apartment-properties">
                        <tr>
                            <td>Internal surface: <strong>{this.state.internalSurface} m²</strong></td>
                            <td>Year of construction: <strong>{this.state.yearOfConstruction}</strong></td>
                            <td>Number of rooms: <strong>{this.state.numberOfRooms}</strong></td>
                        </tr>
                        <tr>
                            <td>Floor number: <strong>{this.state.numberOfBathrooms}</strong></td>
                            <td>Number of bathrooms: <strong>{this.state.floorNumber}</strong></td>
                            <td></td>
                        </tr>
                    </table>
                    <div className="apartment-description">
                        <p>{this.state.description}</p>
                    </div>
                    {(this.state.latitude && this.state.longitude &&
                        <MapComponent lat={this.state.latitude} lng={this.state.longitude} />)}
                    {this.props.authenticated ?
                        <Plot className="predicted-price-plot"
                            data={[
                                {
                                    x: ['Actual Price', 'Predicted Price'],
                                    y: [this.state.price, this.state.predictedPrice],
                                    type: 'scatter',
                                    mode: 'lines+markers',
                                    marker: {color: this.state.price < this.state.predictedPrice ? 'green' : 'red'}
                                },
                                {
                                    type: 'bar',
                                    marker: {color: this.state.price < this.state.predictedPrice ? ['green', 'orange'] : ['orange', 'green']},
                                    x: ['Actual Price', 'Predicted Price'],
                                    y: [this.state.price, this.state.predictedPrice]
                                },
                                ]}
                            layout={{autosize: true, showlegend: false, title: 'AI Price graph'}}
                        />
                        : null }
                    <div className="apartment-creator-info">
                        <Link className="creator-link" to={`/users/${this.state.createdBy.username}`}>
                            <Avatar className="apartment-creator-avatar"
                                    style={{backgroundColor: getAvatarColor(this.state.createdBy.name)}} >
                                {this.state.createdBy.name[0].toUpperCase()}
                            </Avatar>
                            <span className="apartment-creator-name">
                                {this.state.createdBy.name}
                            </span>
                            <span className="apartment-creator-phoneNumber">
                                {this.state.createdBy.phoneNumber}
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Apartment;