import storage from './storage';

/**
 * @returns {Promise<{token: string}>}
 */
export function getJWTToken(email, password) {
    const storedToken = storage.get('jwt-token');
    if (storedToken.length > 0) {
        return new Promise(() => ({token: storedToken}));
    }

    return fetch(
        'https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    })
    .then((response) => response.json())
}
