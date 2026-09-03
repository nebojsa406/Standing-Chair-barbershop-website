const API_URL = "http://localhost:5000/location"

//get
export const getLocation = async () => {
    const res = await fetch(`${API_URL}/`);
    if (!res.ok) throw new Error('failed to fetch location');
    return res.json();
}


//------------ADMIN----------\\