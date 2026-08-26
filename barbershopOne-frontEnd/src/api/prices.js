const API_URL = "http://localhost:5000/prices"


//get
export const getPrices = async () => {
    const res = await fetch(`${API_URL}/`);
    if (!res.ok) throw new Error('failed to fetch prices');
    return res.json();
}
