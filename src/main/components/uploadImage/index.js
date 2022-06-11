import ImageUploader from "react-image-upload";
import "react-image-upload/dist/index.css";

export default function ImageUpload(props) {
  return <ImageUploader onFileAdded={(img) => props.onUpload(img)} />;
}
