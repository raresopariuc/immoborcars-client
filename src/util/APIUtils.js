import { API_BASE_URL, HOUSE_LIST_SIZE, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function getAllHouses(page, size) {
    page = page || 0;
    size = size || HOUSE_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/houses?page=" + page + "&size=" + size,
        method: 'GET'
    });
}

export function getAllApartments(page, size) {
    page = page || 0;
    size = size || HOUSE_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/apartments?page=" + page + "&size=" + size,
        method: 'GET'
    });
}

export function getAllCars(page, size) {
    page = page || 0;
    size = size || HOUSE_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/cars?page=" + page + "&size=" + size,
        method: 'GET'
    });
}

export function getHousesByFilter(page, size, filters) {
    page = page || 0;
    size = size || HOUSE_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/houses/searchByFilter?page=" + page + "&size=" + size,
        method: 'POST',
        body: JSON.stringify(filters)
    });
}

export function getApartmentsByFilter(page, size, filters) {
    page = page || 0;
    size = size || HOUSE_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/apartments/searchByFilter?page=" + page + "&size=" + size,
        method: 'POST',
        body: JSON.stringify(filters)
    });
}

export function getCarsByFilter(page, size, filters) {
    page = page || 0;
    size = size || HOUSE_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/cars/searchByFilter?page=" + page + "&size=" + size,
        method: 'POST',
        body: JSON.stringify(filters)
    });
}

export function createHouse(houseData) {
    return request({
        url: API_BASE_URL + "/houses",
        method: 'POST',
        body: JSON.stringify(houseData)
    });
}

export function createApartment(apartmentData) {
    return request({
        url: API_BASE_URL + "/apartments",
        method: 'POST',
        body: JSON.stringify(apartmentData)
    });
}

export function createCar(carData) {
    return request({
        url: API_BASE_URL + "/cars",
        method: 'POST',
        body: JSON.stringify(carData)
    });
}

export function updateHouse(houseId, houseData) {
    return request({
        url: API_BASE_URL + "/houses/" + houseId,
        method: 'PUT',
        body: JSON.stringify(houseData)
    });
}

export function updateApartment(apartmentId, apartmentData) {
    return request({
        url: API_BASE_URL + "/apartments/" + apartmentId,
        method: 'PUT',
        body: JSON.stringify(apartmentData)
    });
}

export function updateCar(carId, carData) {
    return request({
        url: API_BASE_URL + "/cars/" + carId,
        method: 'PUT',
        body: JSON.stringify(carData)
    });
}

export function deleteHouse(houseId) {
    return request({
        url: API_BASE_URL + "/houses/" + houseId,
        method: 'DELETE'
    });
}

export function deleteApartment(apartmentId) {
    return request({
        url: API_BASE_URL + "/apartments/" + apartmentId,
        method: 'DELETE'
    });
}

export function deleteCar(carId) {
    return request({
        url: API_BASE_URL + "/cars/" + carId,
        method: 'DELETE'
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}


export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function getUserProfile(username) {
    return request({
        url: API_BASE_URL + "/users/" + username,
        method: 'GET'
    });
}

export function getUserCreatedHouses(username, page, size) {
    page = page || 0;
    size = size || HOUSE_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/users/" + username + "/houses?page=" + page + "&size=" + size,
        method: 'GET'
    });
}

export function getUserCreatedApartments(username, page, size) {
    page = page || 0;
    size = size || HOUSE_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/users/" + username + "/apartments?page=" + page + "&size=" + size,
        method: 'GET'
    });
}

export function getUserCreatedCars(username, page, size) {
    page = page || 0;
    size = size || HOUSE_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/users/" + username + "/cars?page=" + page + "&size=" + size,
        method: 'GET'
    });
}

export function getHouseById(houseId) {
    return request({
        url: API_BASE_URL + "/houses/" + houseId,
        method: 'GET'
    });
}

export function getApartmentById(apartmentId) {
    return request({
        url: API_BASE_URL + "/apartments/" + apartmentId,
        method: 'GET'
    });
}

export function getCarById(carId) {
    return request({
        url: API_BASE_URL + "/cars/" + carId,
        method: 'GET'
    });
}

export function getHousePredictedPrice(predictRequest) {
    return request({
        url: "http://localhost:5000/use-gradient-boosting-regressor-for-houses",
        method: 'POST',
        body: JSON.stringify(predictRequest)
    })
}

export function getCarPredictedPrice(predictRequest) {
    return request({
        url: "http://localhost:5000/use-gradient-boosting-regressor-for-cars",
        method: 'POST',
        body: JSON.stringify(predictRequest)
    })
}

export function uploadMultipleFiles(formData) {
    return request({
        url: API_BASE_URL + "/files/uploadMultipleFiles",
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
        },
        body: formData
    });
}

export function addPictureToHouse(houseId, pictureFileId) {
    return request({
        url: API_BASE_URL + "/houses/pictures/" + houseId,
        method: 'POST',
        body: pictureFileId
    })
}

export function addPictureToApartment(apartmentId, pictureFileId) {
    return request({
        url: API_BASE_URL + "/apartments/pictures/" + apartmentId,
        method: 'POST',
        body: pictureFileId
    })
}

export function addPictureToCar(carId, pictureFileId) {
    return request({
        url: API_BASE_URL + "/cars/pictures/" + carId,
        method: 'POST',
        body: pictureFileId
    })
}

export function deletePicture(pictureFileId) {
    return request({
        url: API_BASE_URL + "/files/uploadFilepond",
        method: 'DELETE',
        body: pictureFileId
    })
}