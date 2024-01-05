import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import NavBar from "../Layout/NavBar";

const Deck = () => {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState(null);

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const deckData = await readDeck(deckId);
        setDeck(deckData);
      } catch (error) {
        console.error("Error fetching deck:", error);
      }
    };

    fetchDeck();
  }, [deckId]);

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this deck?"
    );

    if (confirmDelete) {
      history.push("/");
    }
  };

  if (!deck) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <NavBar deck={deck} />
      {/* List Deck */}
      <div className="container-deck">
        <h2>{deck.name}</h2>
        <p>{deck.description}</p>

        <Link to={`/decks/${deck.id}/edit`} className="btn btn-secondary">
          <span
            className="oi oi-pencil"
            title="pencil"
            aria-hidden="true"
          ></span>
          Edit Deck
        </Link>
        <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
          <span className="oi oi-book" title="book" aria-hidden="true"></span>
          Study
        </Link>
        <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">
          <span className="oi oi-plus" title="plus" aria-hidden="true"></span>
          Add Cards
        </Link>
        <button onClick={handleDelete} className="btn btn-danger">
          <span className="oi oi-trash" title="trash" aria-hidden="true"></span>
          Delete
        </button>
      </div>

      {/* List all cards */}
      <div>
        <h3>Cards</h3>
        {deck.cards.map((card) => (
          <div key={card.id} className="container-card">
            <p>Question: {card.front}</p>
            <p>Answer: {card.back}</p>

            <Link
              to={`/decks/${deck.id}/cards/${card.id}/edit`}
              className="btn btn-secondary"
            >
              <span
                className="oi oi-pencil"
                title="pencil"
                aria-hidden="true"
              ></span>
              Edit Card
            </Link>
            <button
              onClick={() => handleDelete(card.id)}
              className="btn btn-danger"
            >
              <span
                className="oi oi-trash"
                title="trash"
                aria-hidden="true"
              ></span>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deck;
