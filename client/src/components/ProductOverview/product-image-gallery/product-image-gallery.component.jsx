import React, { useContext, useState, useEffect } from 'react';
import ProductContext from '../../../context/products/ProductContext';

import './product-image-gallery.styles.scss';

const ProductImageGallery = () => {
  const productContext = useContext(ProductContext);
  const { currentStyle } = productContext;
  const [mainPhoto, setMainPhoto] = useState(null);

  useEffect(() => {
    if(currentStyle.photos) {
      setMainPhoto(currentStyle.photos[0])
    }
  }, [currentStyle.photos])

  const handleClick = (e) => {
    const currentIndex = Number(e.target.name);
    const selectedPhoto = currentStyle.photos[currentIndex];
    setMainPhoto(selectedPhoto);
  }

    return (
      <div className="product-image-gallery-container">

        <div className="product-image-gallery-thumbnail-container">
          {currentStyle.photos && currentStyle.photos.map((photo, index, key) => (
            <div key={index}>
              <img src={photo.thumbnail_url} className="image-gallery-thumbnail" onClick={handleClick} name={index} />
            </div>
          ))}
        </div>

        <div className="product-image-gallery-main">
            {mainPhoto && <img className="image-gallery-main" src={mainPhoto.url} />}
        </div>

      </div>
    );
}

export default ProductImageGallery