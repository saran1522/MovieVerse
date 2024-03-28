import { useState } from "react";
export default function App({ handleUserRating, isAdded, watchedUserRating }) {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  return (
    <div className="star-rating">
      {isAdded ? (
        <p className="user-rating-message">
          you rated this movie {watchedUserRating} ⭐
        </p>
      ) : (
        <>
          <span>
            {Array.from({ length: 10 }, (_, i) => (
              <img
                key={i}
                src={
                  tempRating >= i + 1
                    ? "https://img.icons8.com/?size=512&id=XE152RjyKPsE&format=png"
                    : "https://img.icons8.com/?size=512&id=Cm7HB8vk6gh8&format=png"
                }
                alt="star"
                onClick={() => {
                  setRating(i + 1);
                  handleUserRating(i + 1);
                }}
                onMouseEnter={() => {
                  setTempRating(i + 1);
                }}
                onMouseLeave={() => {
                  setTempRating(rating);
                }}
              />
            ))}
          </span>
          <p>{tempRating}</p>
        </>
      )}
    </div>
  );
}
