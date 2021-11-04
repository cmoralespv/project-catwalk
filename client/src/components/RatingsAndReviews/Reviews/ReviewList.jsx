import React, { useState, useContext, useEffect } from 'react';
import ReviewContext from '../../../context/reviews/ReviewContext';
import Review from './Review.jsx';
import Sorter from './Sorter.jsx';


const ReviewList = () => {
  const reviewContext = useContext(ReviewContext);
  const data = reviewContext.reviews.results;
  const [reviews, setReviews] = useState([]);
  const [hasData, setHasData] = useState(false);
  const [visibleReviewsCount, setVisibleReviewsCount] = useState(2);

  let moreReviews;
  let sorted = [...reviews];
  const sort = (event) => {
    let sortBy;

    if (event) {
      sortBy = event.target.value.toUpperCase();
    } else {
      sortBy = 'RELEVANCE';
    }
    const result = {};
    result['RELEVANCE'] = () => {
      console.log('Has data');
    };
    result['HELPFULNESS'] = () => {


      sorted.sort((a, b) => b.helpfulness - a.helpfulness);
      console.log(sorted);
      console.log(reviews);
      setReviews(sorted);
    };

    result['NEWEST'] = () => {
      sorted.sort((a, b) => (new Date(b.date))-(new Date(a.date)));
      setReviews(sorted);
    }

    result[sortBy]();

  };


  const clickMore = () => {
    if (visibleReviewsCount + 2 <= reviews.length) {
      setVisibleReviewsCount(visibleReviewsCount + 2);


    } else if (visibleReviewsCount + 1 <= reviews.length) {
      setVisibleReviewsCount(visibleReviewsCount + 1);

    }
  };


  if (visibleReviewsCount === reviews.length) {
    moreReviews = null;
  } else {
    moreReviews = (<button className = 'review-button' onClick = {clickMore} >More Reviews</button>);
  }
  useEffect(() => {
    if (data){
      setReviews(data);
      setHasData(true);

    }

  }, [data]);
  useEffect(() => {
    if (hasData) {
      sort(null);
    }
  }, [hasData])

  return (
    <div className = 'reviews-container'>
      <h3>Reviews</h3>
      <Sorter sort = {sort}/>
      <div className = 'review-list-wrapper'>
      <ul className = 'reviews-list'>
        {reviews.map((review, index) => {
          if (index < visibleReviewsCount) {
            return (<Review review = {review} key = {`Review-${index}`}/>)
          }
        })}
      </ul>
      </div>
      <div className = 'review-button-container'>
        {moreReviews}
        <button className = 'review-button'>Add Review  +</button>
      </div>
    </div>
  );
};

export default ReviewList;