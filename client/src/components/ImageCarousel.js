import React, { useState } from 'react';

const ImageCarousel = ({ images, productName }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="image-carousel">
        <div className="main-image-container">
          <div className="main-image" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            backgroundColor: '#f8f9fa',
            color: '#6c757d',
            fontSize: '1.5rem',
            height: '400px'
          }}>
            No Image Available
          </div>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="image-carousel">
      <div className="main-image-container">
        <img
          src={images[currentImageIndex].image_url}
          alt={images[currentImageIndex].alt_text || productName}
          className="main-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/500x400?text=No+Image';
          }}
        />
        
        {images.length > 1 && (
          <>
            <button className="carousel-btn carousel-btn-left" onClick={prevImage}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="carousel-btn carousel-btn-right" onClick={nextImage}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="thumbnail-container">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.image_url}
              alt={image.alt_text || `${productName} ${index + 1}`}
              className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => selectImage(index)}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
