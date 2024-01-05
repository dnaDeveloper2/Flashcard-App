import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { listDecks, deleteDeck, readDeck } from "../utils/api/index";
import Card from "../study/Card";
import NavBar from "../Layout/NavBar";

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
      <NavBar deck={studyDeck} />
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
