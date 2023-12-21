import React, { FunctionComponent } from "react";
import classnames from "classnames";

const ConnectionsCard: FunctionComponent<CardProps> = ({ onClick, card, index, isInactive, isFlipped, isDisabled }) => {
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
      <div className="card-face card-font-face">
        <div className="memory-card-2">{card.word}</div>
      </div>
      <div className="card-face-2 card-back-face">
        <div>{card.word}</div>
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

export default ConnectionsCard;