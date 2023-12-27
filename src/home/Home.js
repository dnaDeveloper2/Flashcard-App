import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api/index";

const Home = () => {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const decksData = await listDecks();
        setDecks(decksData);
      } catch (error) {
        console.error("Error fetching decks:", error);
      }
    };

    fetchDecks();
  }, []);

  const handleDelete = async (deckId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this deck?"
    );
    if (confirmDelete) {
      try {
        await deleteDeck(deckId);
        setDecks((prevDecks) => prevDecks.filter((deck) => deck.id !== deckId));
      } catch (error) {
        console.error("Error deleting deck:", error);
      }
    }
  };

  return (
    <div>
      <Link to="/decks/new" className="btn btn-primary">
        <span className="oi oi-plus" title="plus" aria-hidden="true"></span>
        Create Deck
      </Link>
      {decks.map((deck) => (
        <div key={deck.id} className="container-deck">
          <h3>{deck.name}</h3>
          <p>{`${deck.cards.length} cards`}</p>
          <p>{`${deck.description}`}</p>
          <Link to={`/decks/${deck.id}`} className="btn btn-secondary">
            <span className="oi oi-eye" title="eye" aria-hidden="true"></span>{" "}
            View
          </Link>
          <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
            <span className="oi oi-book" title="book" aria-hidden="true"></span>
            Study
          </Link>
          <button
            onClick={() => handleDelete(deck.id)}
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
  );
};

export default Home;
