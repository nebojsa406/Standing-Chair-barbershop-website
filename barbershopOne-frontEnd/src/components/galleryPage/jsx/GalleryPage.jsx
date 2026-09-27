import "../css/GalleryPage.css";
import { useState, useEffect } from "react";
import { GalleryAdminPanel } from "./GalleryAdminPanel.jsx";
import { GalleryPanel } from "./GalleryPanel.jsx";
import { getPhotos } from "../../../api/gallery.js";

export function GalleryPage({ admin = false }) {
    const [buttonActive, setButtonActive] = useState("all");
    const [gallery, setGallery] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const photos = await getPhotos();
                setGallery(Array.isArray(photos) && photos.length > 0 ? photos : []);
            } catch (err) {
                console.log("failed to fetch photos from gallery!", err.message);
            }
        })()
    }, [])

    return (
        <main className="galleryPage">
            <div className="galleryPage-header-wrap">
                <p className="galleryPage-label">GALLERY</p>
                <h1 className="galleryPage-title">The shop, framed for every visit.</h1>
                <p className="galleryPage-subtitle">A curated view of our space, light, and detail.Crafted to feel effortless and inviting.</p>
            </div>

            <div className="galleryPage-btn-wrap">
                <button className={buttonActive === "all" ? "filter-btn-active" : "filter-btn"} onClick={() => setButtonActive("all")}>
                    ALL
                </button>

                <button className={buttonActive === "interior" ? "filter-btn-active" : "filter-btn"} onClick={() => setButtonActive("interior")}>
                    INTERIOR
                </button>

                <button className={buttonActive === "exterior" ? "filter-btn-active" : "filter-btn"} onClick={() => setButtonActive("exterior")}>
                    EXTERIOR
                </button>

            </div>

            <section className="galleryPage-content-grid">
                {admin ? <GalleryAdminPanel gallery={gallery} setGallery={setGallery} /> : <GalleryPanel gallery={gallery} />}
            </section>
        </main>
    );
}
