import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api"; // Import your API functions

const EditCard = () => {
  const history = useHistory();
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState(null);
  const [card, setCard] = useState(null);
  const [formData, setFormData] = useState({
    front: "",
    back: "",
  });

  useEffect(() => {
    const abortController = new AbortController();
    const fetchDeckAndCard = async () => {
      try {
        const deckData = await readDeck(deckId, abortController.signal);
        const cardData = await readCard(cardId);
        setDeck(deckData);
        setCard(cardData);
        // Pre-fill the form with existing card data
        setFormData({
          front: cardData.front,
          back: cardData.back,
        });
      } catch (error) {
        console.error("Error fetching deck and card:", error);
      }
    };

    fetchDeckAndCard();
    return ()=> abortController.abort;
  }, [deckId, cardId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update the card with the new data
      await updateCard({ ...card, ...formData });
      // Redirect to the Deck screen
      history.push(`/decks/${deckId}`);
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };

  const handleCancel = () => {
    // Redirect to the Deck screen
    history.push(`/decks/${deckId}`);
  };

  if (!deck || !card) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active">{`Edit Card ${cardId}`}</li>
        </ol>
      </nav>

      <h2>{`Edit Card ${cardId}`}</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="front" className="form-label">
            Front
          </label>
          <textarea
            placeholder="Enter the front of the card"
            className="form-control"
            id="front"
            name="front"
            value={formData.front}
            onChange={handleChange}
            rows="5"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="back" className="form-label">
            Back
          </label>
          <textarea
            placeholder="Enter the back of the card"
            className="form-control"
            id="back"
            name="back"
            value={formData.back}
            onChange={handleChange}
            rows="5"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditCard;
