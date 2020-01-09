import React, {Component} from 'react';
import {addPictureToApartment, createApartment} from '../util/APIUtils';
import {API_BASE_URL, ANNOUNCEMENT_TITLE_MAX_LENGTH} from '../constants';
import {Button, Form, Input, notification, Select} from 'antd';
import LocationSearchInput from '../map/LocationSearchInput';
import './NewApartment.css';
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

class NewApartment extends Component {
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
            internalSurface: {
                text: ''
            },
            yearOfConstruction: {
                text: ''
            },
            numberOfRooms: {
                text: ''
            },
            numberOfBathrooms: {
                text: ''
            },
            floorNumber: {
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
        this.handleInternalSurfaceChange = this.handleInternalSurfaceChange.bind(this);
        this.handleYearOfConstructionChange = this.handleYearOfConstructionChange.bind(this);
        this.handleNumberOfRoomsChange = this.handleNumberOfRoomsChange.bind(this);
        this.handleNumberOfBathroomsChange = this.handleNumberOfBathroomsChange.bind(this);
        this.handleFloorNumberChange = this.handleFloorNumberChange.bind(this);
        this.handleImagesChange = this.handleImagesChange.bind(this);
        this.handleImageUploaderChange = this.handleImageUploaderChange.bind(this);
        this.onImagesUploadResponse = this.onImagesUploadResponse.bind(this);
        this.addPicture = this.addPicture.bind(this);
        this.returnLocation = this.returnLocation.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const apartmentData = {
            title: this.state.title.text,
            description: this.state.description.text,
            price: this.state.price.text,
            internalSurface: this.state.internalSurface.text,
            yearOfConstruction: this.state.yearOfConstruction.text,
            numberOfRooms: this.state.numberOfRooms.text,
            numberOfBathrooms: this.state.numberOfBathrooms.text,
            floorNumber: this.state.floorNumber.text,
            latitude: this.state.latitude,
            longitude: this.state.longitude
        };

        let apartmentId;

        createApartment(apartmentData)
            .then(response => {

                apartmentId = response.objectId;

                this.addPicture(0, this.state.picturesIds, apartmentId);

                this.props.history.push("/apartments/" + apartmentId);

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

    addPicture(index, picturesIds, apartmentId) {
        if(index < picturesIds.length) {
            addPictureToApartment(apartmentId, picturesIds[index])
                .then(response => {
                    this.addPicture(index+1, picturesIds, apartmentId);
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

    handleInternalSurfaceChange(event) {
        const value = event.target.value;

        this.setState({
            internalSurface: {
                text: value,
                ...this.validateNumberProperty(value)
            }
        })
    }

    handleYearOfConstructionChange(event) {
        const value = event.target.value;

        this.setState({
            yearOfConstruction: {
                text: value,
                ...this.validateNumberProperty(value)
            }
        })
    }

    handleNumberOfRoomsChange(event) {
        const value = event.target.value;

        this.setState({
            numberOfRooms: {
                text: value,
                ...this.validateNumberProperty(value)
            }
        })
    }

    handleNumberOfBathroomsChange(event) {
        const value = event.target.value;

        this.setState({
            numberOfBathrooms: {
                text: value,
                ...this.validateNumberProperty(value)
            }
        })
    }

    handleFloorNumberChange(event) {
        const value = event.target.value;

        this.setState({
            floorNumber: {
                text: value,
                ...this.validateNumberProperty(value)
            }
        })
    }

    isFormInvalid() {
        if(this.state.title.validateStatus !== 'success' ||
            this.state.price.validateStatus !== 'success' ||
            this.state.internalSurface.validateStatus !== 'success' ||
            this.state.yearOfConstruction.validateStatus !== 'success' ||
            this.state.numberOfRooms.validateStatus !== 'success' ||
            this.state.numberOfBathrooms.validateStatus !== 'success' ||
            this.state.floorNumber.validateStatus !== 'success') {
            return true;
        }
    }

    render() {

        return (
            <div className="new-apartment-container">
                <h1 className="page-title">Add apartment</h1>
                <div className="new-apartment-content">
                    <Form onSubmit={this.handleSubmit} className="create-apartment-form">
                        <FormItem validateStatus={this.state.title.validateStatus}
                                  help={this.state.title.errorMsg} className="apartment-form-row">
                            <TextArea
                                placeholder="Apartment title"
                                style = {{ fontSize: '16px' }}
                                autosize={{ minRows: 3, maxRows: 6 }}
                                name = "title"
                                value = {this.state.title.text}
                                onChange = {this.handleTitleChange} />
                        </FormItem>
                        <FormItem validateStatus={this.state.price.validateStatus}
                                  help={this.state.price.errorMsg} className="apartment-form-row">
                            <Input
                                placeholder = "Apartment price (€)"
                                size="large"
                                value={this.state.price.text}
                                onChange={this.handlePriceChange} />
                        </FormItem>
                        <FormItem validateStatus={this.state.internalSurface.validateStatus}
                                  help={this.state.internalSurface.errorMsg} className="apartment-form-row">
                            <Input
                                placeholder = "Internal surface (m²)"
                                size="large"
                                value={this.state.internalSurface.text}
                                onChange={this.handleInternalSurfaceChange} />
                        </FormItem>
                        <FormItem validateStatus={this.state.numberOfRooms.validateStatus}
                                  help={this.state.numberOfRooms.errorMsg} className="apartment-form-row">
                            <Input
                                placeholder = "Number of rooms"
                                size="large"
                                value={this.state.numberOfRooms.text}
                                onChange={this.handleNumberOfRoomsChange} />
                        </FormItem>
                        <FormItem validateStatus={this.state.numberOfBathrooms.validateStatus}
                                  help={this.state.numberOfBathrooms.errorMsg} className="apartment-form-row">
                            <Input
                                placeholder = "Number of bathrooms"
                                size="large"
                                value={this.state.numberOfBathrooms.text}
                                onChange={this.handleNumberOfBathroomsChange} />
                        </FormItem>
                        <FormItem validateStatus={this.state.floorNumber.validateStatus}
                                  help={this.state.floorNumber.errorMsg} className="apartment-form-row">
                            <Input
                                placeholder = "Floor number"
                                size="large"
                                value={this.state.floorNumber.text}
                                onChange={this.handleFloorNumberChange} />
                        </FormItem>
                        <FormItem validateStatus={this.state.yearOfConstruction.validateStatus}
                                  help={this.state.yearOfConstruction.errorMsg} className="apartment-form-row">
                            <Input
                                placeholder = "Year of construction"
                                size="large"
                                value={this.state.yearOfConstruction.text}
                                onChange={this.handleYearOfConstructionChange} />
                        </FormItem>
                        <FormItem className="apartment-form-row">
                            <LocationSearchInput
                                returnLocation={this.returnLocation}/>
                        </FormItem>
                        <FormItem className="apartment-form-row">
                            <TextArea
                                placeholder="Apartment description"
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

                        <FormItem className="apartment-form-row">
                            <Button type="primary"
                                    htmlType="submit"
                                    size="large"
                                    disabled={this.isFormInvalid()}
                                    className="create-apartment-form-button">Add apartment</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

export default NewApartment;