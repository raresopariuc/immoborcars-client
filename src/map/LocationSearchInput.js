import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { classnames } from '../util/Helpers';
import { Input } from 'antd';
import './LocationSearchInput.css';

class LocationSearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            errorMessage: '',
            latitude: null,
            longitude: null,
            isGeocoding: false,
        };
    }

    handleChange = address => {
        this.setState({
            address,
            latitude: null,
            longitude: null,
            errorMessage: '',
        });
    };

    handleSelect = selected => {
        this.setState({ isGeocoding: true, address: selected });
        geocodeByAddress(selected)
            .then(res => getLatLng(res[0]))
            .then(({ lat, lng }) => {
                this.setState({
                    latitude: lat,
                    longitude: lng,
                    isGeocoding: false,
                });
                this.props.returnLocation(lat, lng);
            })
            .catch(error => {
                this.setState({ isGeocoding: false });
                console.log('error', error); // eslint-disable-line no-console
            });
    };

    handleError = (status, clearSuggestions) => {
        console.log('Error from Google Maps API', status); // eslint-disable-line no-console
        this.setState({ errorMessage: status }, () => {
            clearSuggestions();
        });
    };

    render() {
        const {
            address,
            errorMessage,
            latitude,
            longitude,
            isGeocoding,
        } = this.state;

        return (
            <div>
                <PlacesAutocomplete
                    onChange={this.handleChange}
                    value={address}
                    onSelect={this.handleSelect}
                    onError={this.handleError}
                    shouldFetchSuggestions={address.length > 2}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps }) => {
                        return (
                            <div>
                                <div>
                                    <Input
                                        size="large"
                                        {...getInputProps({
                                            placeholder: 'Add address'
                                        })}
                                    />
                                </div>
                                {suggestions.length > 0 && (
                                    <div className="Demo__autocomplete-container">
                                        {suggestions.map(suggestion => {
                                            const className = classnames('Demo__suggestion-item', {
                                                'Demo__suggestion-item--active': suggestion.active,
                                            });

                                            return (
                                                /* eslint-disable react/jsx-key */
                                                <div
                                                    {...getSuggestionItemProps(suggestion, { className })}
                                                >
                                                    <strong>
                                                        {suggestion.formattedSuggestion.mainText}
                                                    </strong>{' '}
                                                    <small>
                                                        {suggestion.formattedSuggestion.secondaryText}
                                                    </small>
                                                </div>
                                            );
                                            /* eslint-enable react/jsx-key */
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    }}
                </PlacesAutocomplete>
                {errorMessage.length > 0 && (
                    <div className="Demo__error-message">{this.state.errorMessage}</div>
                )}

                {/*{((latitude && longitude) || isGeocoding) && (*/}
                {/*    <div>*/}
                {/*        <h3 className="Demo__geocode-result-header">Geocode result</h3>*/}
                {/*        {isGeocoding ? (*/}
                {/*            <div>*/}
                {/*                <i className="fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner" />*/}
                {/*            </div>*/}
                {/*        ) : (*/}
                {/*            <div>*/}
                {/*                <div className="Demo__geocode-result-item--lat">*/}
                {/*                    <label>Latitude:</label>*/}
                {/*                    <span>{latitude}</span>*/}
                {/*                </div>*/}
                {/*                <div className="Demo__geocode-result-item--lng">*/}
                {/*                    <label>Longitude:</label>*/}
                {/*                    <span>{longitude}</span>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        )}*/}
                {/*    </div>*/}
                {/*)}*/}
            </div>
        );
    }
}

export default LocationSearchInput;