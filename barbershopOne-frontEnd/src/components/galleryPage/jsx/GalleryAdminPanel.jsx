import { useState } from "react";

export function GalleryAdminPanel({ gallery = [], setGallery }) {

    const [isAdding, setIsAdding] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [newImages, setNewImages] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const photoUrls = [...gallery, ...newImages].flatMap((photo) => {
        const urls = Array.isArray(photo.imageUrls) ? photo.imageUrls : [photo.imageUrls];
        return urls.filter((url) => typeof url === "string" && url.length > 0);
    });
    const displayedPhoto = photoUrls.includes(selectedPhoto) ? selectedPhoto : photoUrls[0];

    async function addImages(files) {
        const filteredFiles = Array.from(files ?? []).filter((file) => file.type.startsWith("image/"));
        if (filteredFiles.length === 0) return;

        try {
            const images = []
            for (const file of filteredFiles) {
                const newImage = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
                images.push({category: "interior", imageUrls: [newImage]});
            }
            setNewImages([...newImages, ...images]);

        } catch (err) {
            console.error("Could not read images", err);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);
        addImages(event.dataTransfer.files);
    };

    function handleOpenClose() {
        setIsAdding(!isAdding);
        setNewImages([]);
    }

    function handleSubmit() {
        setGallery((currentGallery) => [...currentGallery, ...newImages]);
        setNewImages([]);
        setIsAdding(false);
    }

    return (
        <div className={`gallery-admin-panel${isAdding ? " is-adding" : ""}`}>
            <div className="gallery-admin-actions">
                {isAdding && (
                    <button
                        className="gallery-submit-btn"
                        type="button"
                        onClick={() => handleSubmit()}
                    >
                        SUBMIT
                    </button>
                )}

                <button
                    className="gallery-add-btn"
                    type="button"
                    onClick={() => handleOpenClose()}
                >
                    {!isAdding ? "ADD PHOTOS" : "CLOSE"}
                </button>
            </div>

            {isAdding && (
                <div
                    className={`gallery-upload-zone${isDragging ? " is-dragging" : ""}`}
                    onDragEnter={(event) => {
                        event.preventDefault();
                        setIsDragging(true);
                    }}
                    onDragOver={(event) => event.preventDefault()}
                    onDragLeave={(event) => {
                        if (event.currentTarget === event.target) setIsDragging(false);
                    }}
                    onDrop={handleDrop}
                >
                    <input
                        id="gallery-photo-upload"
                        className="gallery-file-input"
                        type="file"
                        accept="image/*"
                        onChange={(event) => addImages(event.target.files)}
                    />
                    <label htmlFor="gallery-photo-upload" className="gallery-upload-label">
                        <strong>DROP IMAGES HERE</strong>
                        <span>or select from your device</span>
                    </label>
                </div>
            )}

            <div className="gallery-selected-photo">
                {displayedPhoto ? <img src={displayedPhoto} alt="Selected gallery photo" /> : null}
            </div>

            {photoUrls.length > 0 && (
                <div className="gallery-photo-thumbnails" aria-label="Gallery photos">
                    {photoUrls.map((photo, index) => (
                        <button
                            className={`gallery-photo-thumbnail${photo === displayedPhoto ? " is-selected" : ""}`}
                            type="button"
                            key={`${photo}-${index}`}
                            onClick={() => setSelectedPhoto(photo)}
                            aria-label={`Show gallery photo ${index + 1}`}
                            aria-pressed={photo === displayedPhoto}
                        >
                            <img src={photo} alt="" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}