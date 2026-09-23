import { useState } from "react";

export function AdminContentPanel({ gallery, setGallery }) {

    const [isAdding, setIsAdding] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [newImages, setNewImages] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);

    async function addImages(files) {
        const filteredFiles = Array.from(files ?? []).filter((file) => file.type.startsWith("image/"));
        setSelectedFiles([...filteredFiles]);//here
        if (selectedFiles.length === 0) return;

        try {
            const images = []
            for (const file of selectedFiles) {
                const newImage = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve({ name: file.name, src: reader.result });
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
                images.push(newImage);
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

    }

    function handleSubmit() {
        setGallery((currentGallery) => [...currentGallery, ...newImages]);
        setSelectedFiles([]);
        setNewImages([]);
        setIsAdding(false);
    }

    return (
        <>
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
                        single
                        onChange={(event) => addImages(event.target.files)}
                    />
                    <label htmlFor="gallery-photo-upload" className="gallery-upload-label">
                        <strong>DROP IMAGES HERE</strong>
                        <span>or select from your device</span>
                    </label>
                </div>
            )}
            {newImages.length > 0 && newImages.map((photo) => (
                <figure className="gallery-photo-card" key={`${photo.name}-${photo.src}`}>
                    <img src={photo.src} alt={photo.name} />
                    <figcaption>{photo.name}</figcaption>
                </figure>
            ))}
            {gallery.map((photo) => (
                <figure className="gallery-photo-card" key={`${photo.name}-${photo.src}`}>
                    <img src={photo.src} alt={photo.name} />
                    <figcaption>{photo.name}</figcaption>
                </figure>
            ))}
        </>
    );
}