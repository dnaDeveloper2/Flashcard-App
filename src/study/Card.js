import { useState } from "react";
import { useHistory, Link } from "react-router-dom";

const Card = ({ cards }) => {
  const [isFront, setIsFront] = useState(true);
  const [cardIndex, setCardIndex] = useState(0);
  const history = useHistory();

  const handleNext = () => {
    if (cardIndex === cards.length - 1) {
      const confirmRestart = window.confirm("Do you want to restart the deck?");
      if (confirmRestart) {
        setIsFront(true);
        setCardIndex(0);
      } else {
        history.push("/");
      }
    } else {
      setIsFront(!isFront);
      setCardIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleFlip = () => {
    setIsFront(!isFront);
  };

  if (cards.length < 3) {
    return (
      <div className="container-deck">
        <h3> Not Enough Cards. </h3>
        <p>
          {" "}
          You need at least 3 cards to study. There are {cards.length} in this
          deck.
        </p>
        <Link to="/decks/new" className="btn btn-primary">
          Create Deck
        </Link>
      </div>
    );
  } else {
    return (
      <div className="container-deck">
        <h2>{`Card: ${cardIndex + 1} of ${cards.length}`}</h2>
        {cards &&
          (isFront ? (
            <p>{`${cards[cardIndex].front}`}</p>
          ) : (
            <p>{`${cards[cardIndex].back}`}</p>
          ))}
        <button className="btn btn-secondary" onClick={handleFlip}>
          Flip
        </button>
        {!isFront && (
          <button className="btn btn-primary" onClick={handleNext}>
            Next
          </button>
        )}
      </div>
    );
  }
};

export default Card;
