const API_URL = "http://localhost:5000/gallery"

//get
export const getPhotos = async () => {
    const res = await fetch(`${API_URL}/`);
    if (!res.ok) throw new Error('failed to fetch gallery');
    return res.json();
}

//------------ADMIN----------\\
