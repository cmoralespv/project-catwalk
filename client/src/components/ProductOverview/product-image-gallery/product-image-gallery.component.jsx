import React, { useContext, useState, useEffect, useRef } from 'react';
import ProductContext from '../../../context/products/ProductContext';

import leftArrow from '../../../../assets/backArrow.svg';
import rightArrow from '../../../../assets/forwardArrow.svg';
import upArrow from '../../../../assets/upArrow.svg';
import downArrow from '../../../../assets/downArrow.svg';

import './product-image-gallery.styles.scss';

const ProductImageGallery = () => {
  const productContext = useContext(ProductContext);
  const { currentStyle } = productContext;
  const [mainPhoto, setMainPhoto] = useState(null);
  const [page, setPage] = useState(0);
  const [length, setLength] = useState(0);
  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if(currentStyle.photos) {
      setMainPhoto(currentStyle.photos[0])
      setLength(currentStyle.photos.length - 1);
    }
  }, [currentStyle.photos])

  const handleClick = (e) => {
    // const currentIndex = Number(e.target.name);
    // const selectedPhoto = currentStyle.photos[currentIndex];
    // setMainPhoto(selectedPhoto);
    const currentIndex = Number(e.target.name);
    setPage(currentIndex);
  }

  const handlePageChange = (e) => {
    if (e.target.name === "back") {
      if (page === 0) {
        setPage(length);
      } else {
        setPage(page - 1)
      }
    } else {
      if (page === length) {
        setPage(0)
      } else {
        setPage(page + 1)
      }
    }
  }

  const handleLoad = () => {
    if (ref.current.clientHeight) {
      setHeight(ref.current.clientHeight)
    }
  }

  const handleScroll = (height) => {
    ref.current.scrollTop -= height
  }

    return (
      <div className="product-image-gallery-container">

        <div className="product-image-gallery-thumbnail-container" >
          <img src={upArrow} style={{ height: '25px', width: '25px'}} onClick={() => handleScroll(height/2)}/>
          <div className="product-image-gallery-thumbnail-display" ref={ref} onLoad={handleLoad}>
            {currentStyle.photos && currentStyle.photos.map((photo, index, key) => (
              <div key={index}>
                <img src={photo.thumbnail_url} className={ page === index ? "image-gallery-thumbnail active" : "image-gallery-thumbnail" } onClick={handleClick} name={index} />
              </div>
            ))}
          </div>
          <img src={downArrow} style={{ height: '25px', width: '25px'}} onClick={() => handleScroll(-1 * (height/2))}/>
        </div>

        <div className="product-image-gallery-main">
            <img src={leftArrow} className="left-arrow" onClick={handlePageChange} name="back" value={page}/>
            {mainPhoto && currentStyle.photos.map((photo, index) => {
              if (page === index) {
                return (
                  <img className="image-gallery-main" src={photo.url} />
                )
              }
            })}

             {/* {mainPhoto && <img className="image-gallery-main" src={mainPhoto.url} />} */}
            <img src={rightArrow} className="right-arrow" onClick={handlePageChange} name="front" value={page}/>
        </div>

      </div>
    );
}

export default ProductImageGallery