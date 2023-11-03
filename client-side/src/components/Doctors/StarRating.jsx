import React from 'react';


const StarRating = ({ rating }) => {
  const maxStars = 5;
  const stars = [];

  for (let i = 1; i <= maxStars; i++) {
    if (i <= rating) {
      // Filled star
      stars.push(
        <span key={i} className="text-yellow-500 text-xl">
          ★
        </span>
      );
    } else {
      // Empty star
      stars.push(
        <span key={i} className="text-gray-400 text-xl">
          ★
        </span>
      );
    }
  }

  return <div className="flex">{stars}</div>;
};

export default StarRating;

