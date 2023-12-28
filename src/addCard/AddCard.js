import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";

const AddCard = () => {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [formData, setFormData] = useState({
    front: "",
    back: "",
  });

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createCard(deckId, formData);
      setFormData({
        front: "",
        back: "",
      });
    } catch (error) {
      console.error("Error creating card:", error);
    }
  };

  const handleDone = () => {
    history.push(`/decks/${deckId}`);
  };

  if (!deck) {
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
          <li className="breadcrumb-item active">Add Card</li>
        </ol>
      </nav>

      <h2>{`React Router: Add Card - ${deck.name}`}</h2>

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
          onClick={handleDone}
        >
          Done
        </button>
      </form>
    </div>
  );
};

export default AddCard;
