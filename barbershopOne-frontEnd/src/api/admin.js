const API_URL = "http://localhost:5000/user"

export async function login(body) {
    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body)
    });

    const resData = await res.json();
    return {body: resData, status: res.status}
}

export async function logout() {
    const res = await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include"
    });
    const resData = await res.json();
    return {body: resData.message, status: res.status}
}

//refresh
export async function refreshTokenLogin() {
    //grab refreshToken send it to user/refresh api route
    //from route send new accessToken
    const res = await fetch(`${API_URL}/refresh`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    });
    const resData = await res.json();
    return resData
}