import "../css/GalleryPage.css";
import { useState } from "react";
import { AdminContentPanel } from "./AdminContentPanel.jsx";

function ContentPanel() {
    return (
        <p className="no-content-msg">no content available</p>
    );
}

export function GalleryPage({ admin = true }) {
    const [buttonActive, setButtonActive] = useState("all");
    const [gallery, setGallery] = useState([]);

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
                {admin ? <AdminContentPanel gallery={gallery} setGallery={setGallery} /> : <ContentPanel />}
            </section>
        </main>
    );
}
