import "../css/GalleryPage.css";
import { useState } from "react";


export function GalleryPage() {
    const [buttonActive, setButtonActive] = useState("all");
    const [galleryContent, setGalleryContent] = useState([]);

    return (
        <main className="galleryPage">
            <div className="galleryPage-header-wrap">
                <p className="galleryPage-label">GALLERY</p>
                <h1 className="galleryPage-title">The shop, framed for every visit.</h1>
                <p className="galleryPage-subtitle">A curated view of our space, light, and detail.Crafted to feel effortless and inviting.</p>
            </div>

            <div className="galleryPage-btn-wrap">
                <button className={buttonActive === "all" ? "filter-btn-active" : "filter-btn"}
                    onClick={() => setButtonActive("all")}>ALL</button>

                <button className={buttonActive === "interior" ? "filter-btn-active" : "filter-btn"}
                    onClick={() => setButtonActive("interior")}>INTERIOR</button>

                <button className={buttonActive === "exterior" ? "filter-btn-active" : "filter-btn"}
                    onClick={() => setButtonActive("exterior")}>EXTERIOR</button>

                <button className={buttonActive === "videos" ? "filter-btn-active" : "filter-btn"}
                    onClick={() => setButtonActive("videos")}>VIDEOS</button>
            </div>

            <section className="galleryPage-content-grid">
                {galleryContent.length > 0 ?
                    <p>display content</p>
                    :
                    <p className="no-content-msg">no content available</p>
                }
            </section>
        </main>
    );
}
