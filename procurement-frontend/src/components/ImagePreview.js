import { Button } from "react-bootstrap";
const ImagePreview = ({ imagePreviews, removeImage }) => {
    return (
      <div className="mt-3 d-flex flex-wrap">
        {imagePreviews.map((src, index) => (
          <div key={index} className="me-2 mb-2 position-relative">
            <img
              src={src}
              alt={`Preview ${index}`}
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
            <Button
              variant="danger"
              size="sm"
              className="position-absolute top-0 end-0"
              onClick={() => removeImage(index)}
            >
              X
            </Button>
          </div>
        ))}
      </div>
    );
  };
  
  export default ImagePreview;
  