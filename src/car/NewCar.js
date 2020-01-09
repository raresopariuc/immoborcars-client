import React, {Component} from 'react';
import {addPictureToCar, createCar} from '../util/APIUtils';
import {API_BASE_URL, ANNOUNCEMENT_TITLE_MAX_LENGTH, ANNOUNCEMENT_PROPERTY_MAX_LENGTH} from '../constants';
import {Button, Form, Input, notification, Select} from 'antd';
import LocationSearchInput from '../map/LocationSearchInput';
import './NewCar.css';
import ImageUploader from 'react-images-upload';

import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Option = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input

class NewCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: {
                text: ''
            },
            description: {
                text: ''
            },
            price: {
                text: ''
            },
            cubicCapacity: {
                text: ''
            },
            power: {
                text: ''
            },
            mileage: {
                text: ''
            },
            yearOfManufacture: {
                text: ''
            },
            fuel: {
                text: ''
            },
            gearbox: {
                text: ''
            },
            emissionClass: {
                text: ''
            },
            vin: {
                text: ''
            },
            latitude: null,
            longitude: null,
            pictures: [],
            picturesIds: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleCubicCapacityChange = this.handleCubicCapacityChange.bind(this);
        this.handlePowerChange = this.handlePowerChange.bind(this);
        this.handleMileageChange = this.handleMileageChange.bind(this);
        this.handleYearOfManufactureChange = this.handleYearOfManufactureChange.bind(this);
        this.handleFuelChange = this.handleFuelChange.bind(this);
        this.handleGearboxChange = this.handleGearboxChange.bind(this);
        this.handleEmissionClassChange = this.handleEmissionClassChange.bind(this);
        this.handleVinChange = this.handleVinChange.bind(this);
        this.handleImagesChange = this.handleImagesChange.bind(this);
        this.handleImageUploaderChange = this.handleImageUploaderChange.bind(this);
        this.onImagesUploadResponse = this.onImagesUploadResponse.bind(this);
        this.addPicture = this.addPicture.bind(this);
        this.returnLocation = this.returnLocation.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const carData = {
            title: this.state.title.text,
            description: this.state.description.text,
            price: this.state.price.text,
            cubicCapacity: this.state.cubicCapacity.text,
            power: this.state.power.text,
            mileage: this.state.mileage.text,
            yearOfManufacture: this.state.yearOfManufacture.text,
            fuel: this.state.fuel.text,
            gearbox: this.state.gearbox.text,
            emissionClass: this.state.emissionClass.text,
            vin: this.state.vin.text,
            latitude: this.state.latitude,
            longitude: this.state.longitude
        };

        let carId;

        createCar(carData)
            .then(response => {

                carId = response.objectId;

                this.addPicture(0, this.state.picturesIds, carId);

                this.props.history.push("/cars/" + carId);

            }).catch(error => {
            if(error.status === 401) {
                this.props.handleLogout('/login', 'error', 'You have been logged out. Please login.');
            } else {
                notification.error({
                    message: 'immoborcars',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });
            }
        });
    }

    addPicture(index, picturesIds, carId) {
        if(index < picturesIds.length) {
            addPictureToCar(carId, picturesIds[index])
                .then(response => {
                    this.addPicture(index+1, picturesIds, carId);
                }).catch(error => {

                });
        }
    }

    onImagesUploadResponse(response) {
        response = JSON.parse(response);
        let fileId = response.result[0].id;
        this.setState({
            picturesIds: this.state.picturesIds.concat(fileId)
        })
    }

    handleImagesChange(event) {
        event.preventDefault();
        this.setState({
            pictures: event.target.files
        })
    }

    handleImageUploaderChange(picture) {
        // if(this.state.pictures.indexOf(picture) === -1) {
        //     this.setState({
        //         pictures: this.state.pictures.concat(picture)
        //     });
        // }
        this.setState({
            pictures: picture
        })
    }

    returnLocation(latitude, longitude) {
        this.setState({
            latitude: latitude,
            longitude: longitude
        });
    }

    validateTitle = (titleText) => {
        if(titleText.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter a title!'
            }
        } else if (titleText.length > ANNOUNCEMENT_TITLE_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Title is too long (Maximum ${ANNOUNCEMENT_TITLE_MAX_LENGTH} characters allowed)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    validatePrice = (priceText) => {
        if(priceText.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter a price!'
            }
        } else if (/^(0|[1-9]\d*)$/.test(priceText) === false) {
            return {
                validateStatus: 'error',
                errorMsg: `Price must be a positive integer!`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    validateNumberProperty = (propertyText) => {
        if(propertyText.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter a value!'
            }
        } else if(isNaN(propertyText)) {
            return {
                validateStatus: 'error',
                errorMsg: 'Value must be a number!'
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    validateStringProperty = (propertyText) => {
        if(propertyText.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter a text value!'
            }
        } else if (propertyText.length > ANNOUNCEMENT_PROPERTY_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Text is too long (Maximum ${ANNOUNCEMENT_PROPERTY_MAX_LENGTH} characters allowed)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    validateVinProperty = (vinText) => {
        if (vinText.length > 0 && vinText.length !== 17) {
            return {
                validateStatus: 'error',
                errorMsg: `VIN must have exactly 17 characters!`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    handleTitleChange(event) {
        const value = event.target.value;
        this.setState({
            title: {
                text: value,
                ...this.validateTitle(value)
            }
        });
    }

    handleDescriptionChange(event) {
        const value = event.target.value;
        this.setState({
            description: {
                text: value
            }
        });
    }

    handlePriceChange(event) {
        const value = event.target.value;
        this.setState({
            price: {
                text: value,
                ...this.validatePrice(value)
            }
        });
    }

    handleCubicCapacityChange(event) {
        const value = event.target.value;

        this.setState({
            cubicCapacity: {
                text: value,
                ...this.validateNumberProperty(value)
            }
        })
    }

    handlePowerChange(event) {
        const value = event.target.value;

        this.setState({
            power: {
                text: value,
                ...this.validateNumberProperty(value)
            }
        })
    }

    handleMileageChange(event) {
        const value = event.target.value;

        this.setState({
            mileage: {
                text: value,
                ...this.validateNumberProperty(value)
            }
        })
    }

    handleYearOfManufactureChange(event) {
        const value = event.target.value;

        this.setState({
            yearOfManufacture: {
                text: value,
                ...this.validateNumberProperty(value)
            }
        })
    }

    handleFuelChange(event) {
        const value = event.target.value;

        this.setState({
            fuel: {
                text: value,
                ...this.validateStringProperty(value)
            }
        })
    }

    handleGearboxChange(event) {
        const value = event.target.value;

        this.setState({
            gearbox: {
                text: value,
                ...this.validateStringProperty(value)
            }
        })
    }

    handleEmissionClassChange(event) {
        const value = event.target.value;

        this.setState({
            emissionClass: {
                text: value,
                ...this.validateStringProperty(value)
            }
        })
    }

    handleVinChange(event) {
        const value = event.target.value;

        this.setState({
            vin: {
                text: value,
                ...this.validateVinProperty(value)
            }
        })
    }

    isFormInvalid() {
        if(this.state.title.validateStatus !== 'success' ||
            this.state.price.validateStatus !== 'success' ||
            this.state.cubicCapacity.validateStatus !== 'success' ||
            this.state.power.validateStatus !== 'success' ||
            this.state.mileage.validateStatus !== 'success' ||
            this.state.yearOfManufacture.validateStatus !== 'success' ||
            this.state.fuel.validateStatus !== 'success' ||
            this.state.gearbox.validateStatus !== 'success' ||
            this.state.emissionClass.validateStatus !== 'success' ||
            this.state.vin.validateStatus !== 'success') {
            return true;
        }
    }

    render() {

        return (
            <div className="new-car-container">
                <h1 className="page-title">Add car</h1>
                <div className="new-car-content">
                    <Form onSubmit={this.handleSubmit} className="create-car-form">
                        <FormItem validateStatus={this.state.title.validateStatus}
                                  help={this.state.title.errorMsg} className="car-form-row">
                            <TextArea
                                placeholder="Car title"
                                style = {{ fontSize: '16px' }}
                                autosize={{ minRows: 3, maxRows: 6 }}
                                name = "title"
                                value = {this.state.title.text}
                                onChange = {this.handleTitleChange} />
                        </FormItem>
                        <FormItem validateStatus={this.state.price.validateStatus}
                                  help={this.state.price.errorMsg} className="car-form-row">
                            <Input
                                placeholder = "Car price (€)"
                                size="large"
                                value={this.state.price.text}
                                onChange={this.handlePriceChange} />
                        </FormItem>
                        <FormItem validateStatus={this.state.cubicCapacity.validateStatus}
                                  help={this.state.cubicCapacity.errorMsg} className="car-form-row">
                            <Input
                                placeholder = "Cubic capacity (cm³)"
                                size="large"
                                value={this.state.cubicCapacity.text}
                                onChange={this.handleCubicCapacityChange} />
                        </FormItem>
                        <FormItem validateStatus={this.state.power.validateStatus}
                                  help={this.state.power.errorMsg} className="car-form-row">
                            <Input
                                placeholder = "Power"
                                size="large"
                                value={this.state.power.text}
                                onChange={this.handlePowerChange} />
                        </FormItem>
                        <FormItem validateStatus={this.state.mileage.validateStatus}
                                  help={this.state.mileage.errorMsg} className="car-form-row">
                            <Input
                                placeholder = "Mileage"
                                size="large"
                                value={this.state.mileage.text}
                                onChange={this.handleMileageChange} />
                        </FormItem>
                        <FormItem validateStatus={this.state.yearOfManufacture.validateStatus}
                                  help={this.state.yearOfManufacture.errorMsg} className="car-form-row">
                            <Input
                                placeholder = "Year of manufacture"
                                size="large"
                                value={this.state.yearOfManufacture.text}
                                onChange={this.handleYearOfManufactureChange} />
                        </FormItem>
                        <FormItem validateStatus={this.state.fuel.validateStatus}
                                  help={this.state.fuel.errorMsg} className="car-form-row">
                            <Input
                                placeholder = "Fuel"
                                size="large"
                                value={this.state.fuel.text}
                                onChange={this.handleFuelChange} />
                        </FormItem>
                        <FormItem validateStatus={this.state.gearbox.validateStatus}
                                  help={this.state.gearbox.errorMsg} className="car-form-row">
                            <Input
                                placeholder = "Gearbox"
                                size="large"
                                value={this.state.gearbox.text}
                                onChange={this.handleGearboxChange} />
                        </FormItem>
                        <FormItem validateStatus={this.state.emissionClass.validateStatus}
                                  help={this.state.emissionClass.errorMsg} className="car-form-row">
                            <Input
                                placeholder = "Emission class"
                                size="large"
                                value={this.state.emissionClass.text}
                                onChange={this.handleEmissionClassChange} />
                        </FormItem>
                        <FormItem validateStatus={this.state.vin.validateStatus}
                                  help={this.state.vin.errorMsg} className="car-form-row">
                            <Input
                                placeholder = "VIN"
                                size="large"
                                value={this.state.vin.text}
                                onChange={this.handleVinChange} />
                        </FormItem>
                        <FormItem className="car-form-row">
                            <LocationSearchInput
                                returnLocation={this.returnLocation}/>
                        </FormItem>
                        <FormItem className="car-form-row">
                            <TextArea
                                placeholder="Car description"
                                style = {{ fontSize: '16px' }}
                                autosize={{ minRows: 5, maxRows: 8 }}
                                name = "description"
                                value = {this.state.description.text}
                                onChange = {this.handleDescriptionChange} />
                        </FormItem>
                        <FilePond
                            ref={ref => (this.pond = ref)}
                            files={this.state.pictures}
                            allowMultiple={true}
                            maxFiles={10}
                            imagePreviewHeight={240}
                            labelIdle='Upload photos by drag&drop or <span class="filepond--label-action"> Browse </span>'
                            server={{
                                url: 'http://localhost:8181/api/files/uploadFilepond',
                                process: {
                                    method: 'POST',
                                    withCredentials: false,
                                    headers: {},
                                    timeout: 7000,
                                    onload: (response) => {
                                            response = JSON.parse(response);
                                            let fileId = response.id;
                                            this.setState({
                                                picturesIds: this.state.picturesIds.concat(fileId)
                                            });
                                            return fileId;
                                    },
                                    onerror: null,
                                    ondata: null
                                },
                                revert: {
                                    method: 'DELETE',
                                    withCredentials: false,
                                    headers: {},
                                    timeout: 7000,
                                    onload: (response) => {
                                            response = JSON.parse(response);
                                            let fileId = response.objectId;
                                            for (let i = 0; i < this.state.picturesIds.length; i++){
                                               if ( this.state.picturesIds[i] === fileId) {
                                                 this.state.picturesIds.splice(i, 1);
                                               }
                                            }
                                    }
                                }
                            }}
                            onupdatefiles={fileItems => {
                                this.setState({
                                    pictures: fileItems.map(fileItem => fileItem.file)
                                });
                            }}
                        />

                        <FormItem className="car-form-row">
                            <Button type="primary"
                                    htmlType="submit"
                                    size="large"
                                    disabled={this.isFormInvalid()}
                                    className="create-car-form-button">Add car</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

export default NewCar;