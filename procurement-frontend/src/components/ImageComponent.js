import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ImageComponent = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <>
      {images.length > 0 ? (
        <div className="d-flex align-items-center">
          <img 
            src={images[currentIndex]} 
            alt={`image ${currentIndex + 1}`} 
            className="img-thumbnail" 
            style={{ height: '50px', width: '50px', marginRight: '10px' }} 
          />
          <div>
            <button 
              className="btn btn-link p-0" 
              onClick={handlePrevious} 
              disabled={currentIndex === 0}
              aria-label="Previous"
            >
              <FaChevronLeft />
            </button>
            <button 
              className="btn btn-link p-0" 
              onClick={handleNext} 
              disabled={currentIndex === images.length - 1}
              aria-label="Next"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      ) : (
        <p>No images available</p>
      )}
    </>
  );
};

export default React.memo(ImageComponent);
