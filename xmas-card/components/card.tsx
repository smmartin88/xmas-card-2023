import React, { FunctionComponent } from "react";
import classnames from "classnames";

const Card: FunctionComponent<CardProps> = ({ onClick, card, index, isInactive, isFlipped, isDisabled }) => {
  const handleClick = () => {
    !isFlipped && !isDisabled && onClick(index);
  };

  return (
    <div
      className={classnames("card", {
        "is-flipped": isFlipped,
        "is-inactive": isInactive
      })}
      onClick={handleClick}
    >
      <div className="card-face-memory card-font-face">
        <div className="memory-card"></div>
      </div>
      <div className="card-face-memory card-back-face">
        <img src={card.image}/>
      </div>
    </div>
  );
};

interface CardProps {
  onClick: any,
  card: any,
  index: any,
  isInactive: any
  isFlipped: any
  isDisabled: any
}

export default Card;