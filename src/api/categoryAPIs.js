// src/api/categoryAPIs.js

export const fetchAllCategories = (accessToken) => {
    let promiseResolveRef = null;
    let promiseRejectRef = null;
    let promise = new Promise((resolve, reject) => {
        promiseResolveRef = resolve;
        promiseRejectRef = reject;
    });

    fetch('http://localhost:3002/api/v1/products/categories', {
        method: 'GET',
        headers: {
            'x-auth-token': accessToken,
        },
    })
    .then((response) => {
        if (response.headers.get('content-type').includes('application/json')) {
            return response.json().then((json) => ({ json, response }));
        } else {
            return response.text().then((text) => { throw new Error(text); });
        }
    })
    .then(({ json, response }) => {
        if (response.ok) {
            promiseResolveRef({
                data: json,
                response: response,
            });
        } else {
            promiseRejectRef({
                reason: "Server error occurred.",
                response: response,
            });
        }
    })
    .catch((err) => {
        promiseRejectRef({
            reason: "Some error occurred.",
            response: err,
        });
    });

    return promise;
};
