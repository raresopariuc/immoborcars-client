import React, { Component } from 'react';
import { Avatar, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { getAvatarColor } from '../util/Colors';
import { formatDateTime } from '../util/Helpers';
import {getCarById, getCarPredictedPrice} from "../util/APIUtils";
import ImageGallery from 'react-image-gallery';
import '../../node_modules/react-image-gallery/styles/css/image-gallery.css';
import { MapComponent } from '../map/MapComponent';
import Plot from 'react-plotly.js';
import './Car.css';

class Car extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            description: '',
            price: '',
            pictureFileIds: [],
            createdBy: {
                id: '',
                username: '',
                name: ' ',
                phoneNumber: ''
            },
            creationDateTime: '',
            cubicCapacity: '',
            power: '',
            mileage: '',
            yearOfManufacture: '',
            fuel: '',
            gearbox: '',
            emissionClass: '',
            vin: '',
            latitude: 44.435,
            longitude: 26.101,
            isMarkerShown: true,
            isLoading: false
        };
        this.loadCar = this.loadCar.bind(this);
    }

    loadCar(id) {
        let promise = getCarById(id);

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
                predictedPrice: '',
                pictureFileIds: response.pictureFileIds,
                createdBy: response.createdBy,
                creationDateTime: response.creationDateTime,
                cubicCapacity: response.cubicCapacity,
                power: response.power,
                mileage: response.mileage,
                yearOfManufacture: response.yearOfManufacture,
                fuel: response.fuel,
                gearbox: response.gearbox,
                emissionClass: response.emissionClass,
                vin: response.vin,
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
            "YearOfManufacture": this.state.yearOfManufacture,
            "Power": this.state.power,
            "Mileage": this.state.mileage
        };
        let predictedPricePromise = getCarPredictedPrice(predictRequest);

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
        this.loadCar(this.props.match.params.id);
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
            <div className="car-container">
                <div className="car-content">
                    <div className="car-header">
                        <div className="car-title">
                            {this.state.title}
                            <span className="car-creation-date">
                                added at {formatDateTime(this.state.creationDateTime)}
                            </span>
                        </div>
                        <div className="car-price">Price: <strong>{this.state.price} €</strong></div>
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
                    <table className="car-properties">
                        <tr>
                            <td>Cubic capacity: <strong>{this.state.cubicCapacity} cm³</strong></td>
                            <td>Power: <strong>{this.state.power} HP</strong></td>
                            <td>Mileage: <strong>{this.state.mileage} km</strong></td>
                            <td>Year of manufacture: <strong>{this.state.yearOfManufacture}</strong></td>
                        </tr>
                        <tr>
                            <td>Fuel: <strong>{this.state.fuel}</strong></td>
                            <td>Gearbox: <strong>{this.state.gearbox}</strong></td>
                            <td>Emission class: <strong>{this.state.emissionClass}</strong></td>
                            <td></td>
                        </tr>
                    </table>
                    <div className="car-description">
                        <p>VIN: <strong>{this.state.vin}</strong></p>
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
                        : null}
                    <div className="car-creator-info">
                        <Link className="creator-link" to={`/users/${this.state.createdBy.username}`}>
                            <Avatar className="car-creator-avatar"
                                    style={{backgroundColor: getAvatarColor(this.state.createdBy.name)}} >
                                {this.state.createdBy.name[0].toUpperCase()}
                            </Avatar>
                            <span className="car-creator-name">
                                {this.state.createdBy.name}
                            </span>
                            <span className="car-creator-phoneNumber">
                                {this.state.createdBy.phoneNumber}
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Car;