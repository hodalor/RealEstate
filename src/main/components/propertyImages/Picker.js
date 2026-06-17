import { useEffect, useMemo, useState } from "react";

export default function PropertyImagePicker({
  files = [],
  existingImages = [],
  coverImageIndex = 0,
  onFilesChange,
  onCoverChange,
}) {
  const [previewUrls, setPreviewUrls] = useState([]);

  const hasNewFiles = Array.isArray(files) && files.length > 0;
  const displayItems = useMemo(() => {
    if (hasNewFiles) {
      return files.map((file, index) => ({
        key: `${file.name || "image"}-${index}`,
        label: file.name || `Image ${index + 1}`,
        source: file,
      }));
    }

    return (existingImages || []).map((image, index) => ({
      key: `${image}-${index}`,
      label: `Current image ${index + 1}`,
      source: image,
    }));
  }, [existingImages, files, hasNewFiles]);

  useEffect(() => {
    if (!hasNewFiles) {
      setPreviewUrls(displayItems.map((item) => item.source));
      return undefined;
    }

    const nextUrls = displayItems.map((item) => URL.createObjectURL(item.source));
    setPreviewUrls(nextUrls);

    return () => {
      nextUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [displayItems, hasNewFiles]);

  return (
    <div className="col-sm-12">
      <input
        type="file"
        className="form-control"
        accept="image/*"
        multiple
        onChange={(e) => onFilesChange(Array.from(e.target.files || []))}
      />
      <small style={{ fontSize: "12px", marginLeft: "10px" }}>
        Upload one or more images. At least one image is required. Select a thumbnail to use on the frontend.
      </small>

      {displayItems.length ? (
        <div className="property-upload-grid">
          {displayItems.map((item, index) => (
            <button
              type="button"
              key={item.key}
              className={`property-upload-thumb ${coverImageIndex === index ? "active" : ""}`}
              onClick={() => onCoverChange(index)}
            >
              <img src={previewUrls[index]} alt={item.label} />
              <span className="property-upload-thumb-label">
                {coverImageIndex === index ? "Frontend cover" : "Set as cover"}
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
