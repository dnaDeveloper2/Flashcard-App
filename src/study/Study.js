import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { listDecks, deleteDeck, readDeck } from "../utils/api/index";
import Card from "../study/Card";

const Study = () => {
  const [studyDeck, setStudyDeck] = useState([]);
  const [cards, setCards] = useState([]);
  const [cardIndex, setCardIndex] = useState(1);
  const { deckId } = useParams();

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const studyData = await readDeck(deckId);
        setStudyDeck(studyData);
        setCards(studyData.cards);
      } catch (error) {
        console.error("Error fetching decks:", error);
      }
    };

    fetchDecks();
  }, []);

  console.log(cards);
  return (
    <div>
      <div>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                <span
                  className="oi oi-home"
                  title="home"
                  aria-hidden="true"
                ></span>
                Home
              </Link>
            </li>
            <li className="breadcrumb-item active">{studyDeck.name}</li>
            <li className="breadcrumb-item active">Study</li>
          </ol>
        </nav>
      </div>
      <div>
        <h2>{`${studyDeck.name}: Study`}</h2>
      </div>
      <div>
        {cards.length > 0 ? (
          <Card cards={cards} />
        ) : (
          <p>No cards available for studying.</p>
        )}
      </div>
    </div>
  );
};
export default Study;
