'use server'
import { cookies } from 'next/headers';

export async function handleRefresh() {
    console.log('handleRefresh');

    const refreshToken = await getRefreshToken();
    console.log('Current Refresh Token:', refreshToken);

    const token = await fetch('http://localhost:8000/api/auth/token/refresh/', {
        method: 'POST',
        body: JSON.stringify({
            refresh: refreshToken
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then((json) => {
            console.log('Response - Refresh:', json);

            if (json.access) {
                console.log('New Access Token:', json.access);
                cookies().set('session_access_token', json.access, {
                    httpOnly: true,
                    secure: false,
                    maxAge: 60 * 60, // 60 minutes
                    path: '/'
                });

                return json.access;
            } else {
                console.log('Failed to Refresh Token');
                resetAuthCookies();
            }
        })
        .catch((error) => {
            console.log('Error during token refresh:', error);

            resetAuthCookies();
        });

    return token;
}

export async function handleLogin(userId: string, accessToken: string, refreshToken: string) {
    console.log('Login - UserId:', userId);
    console.log('Login - Access Token:', accessToken);
    console.log('Login - Refresh Token:', refreshToken);

    cookies().set('session_userid', userId, {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 24 * 7, // One week
        path: '/'
    });

    cookies().set('session_access_token', accessToken, {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60, // 60 minutes
        path: '/'
    });

    cookies().set('session_refresh_token', refreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 24 * 7, // One week
        path: '/'
    });
}

export async function resetAuthCookies() {
    console.log('Resetting Auth Cookies');
    cookies().set('session_userid', '');
    cookies().set('session_access_token', '');
    cookies().set('session_refresh_token', '');
}

//
// Get data

export async function getUserId() {
    const userId = cookies().get('session_userid')?.value;
    console.log('Current UserId:', userId);
    return userId ? userId : null;
}

export async function getAccessToken() {
    let accessToken = cookies().get('session_access_token')?.value;
    console.log('Current Access Token:', accessToken);

    if (!accessToken) {
        console.log('Access Token expired or missing, attempting to refresh...');
        accessToken = await handleRefresh();
    }

    return accessToken;
}

export async function getRefreshToken() {
    let refreshToken = cookies().get('session_refresh_token')?.value;
    console.log('Current Refresh Token:', refreshToken);

    return refreshToken;
}
