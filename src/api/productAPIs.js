//const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3002/api';

export const fetchAllProducts = (accessToken) => {
    return fetch('http://localhost:3002/api/v1/products', {
        method: 'GET',
        headers: {
            'x-auth-token': accessToken,
        },
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Server error occurred.");
        }
        return response.json();
    }).catch((error) => {
        throw new Error("Some error occurred.");
    });
};

export const createProduct = (requestJson, accessToken) => {
    return fetch('http://localhost:3002/api/v1/products', {
        method: 'POST',
        body: JSON.stringify(requestJson),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'x-auth-token': accessToken,
        },
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Server error occurred.");
        }
        return response.json();
    }).catch((error) => {
        throw new Error("Some error occurred.");
    });
};

export const deleteProduct = (id, accessToken) => {
    return fetch(`http://localhost:3002/api/v1/products/${id}`, {
        method: 'DELETE',
        headers: {
            'x-auth-token': accessToken,
        },
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Server error occurred.");
        }
        return response.json();
    }).catch((error) => {
        throw new Error("Some error occurred.");
    });
};

export const modifyProduct = (requestJson, accessToken) => {
    return fetch(`http://localhost:3002/api/v1/products/${requestJson.id}`, {
        method: 'PUT',
        body: JSON.stringify(requestJson),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'x-auth-token': accessToken,
        },
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Server error occurred.");
        }
        return response.json();
    }).catch((error) => {
        throw new Error("Some error occurred.");
    });
};

export const viewProduct = (id, accessToken) => {
    return fetch(`http://localhost:3002/api/v1/products/${id}`, {
        method: 'GET',
        headers: {
            'x-auth-token': accessToken,
        },
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Server error occurred.");
        }
        return response.json();
    }).catch((error) => {
        throw new Error("Some error occurred.");
    });
};
