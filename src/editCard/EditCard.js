import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api"; // Import your API functions
import NavBar from "../Layout/NavBar";
import CardForm from "../Layout/CardForm"

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
    const fetchDeckAndCard = async () => {
      try {
        const deckData = await readDeck(deckId);
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
      <h2>{`Edit Card ${cardId}`}</h2>
      <NavBar deck={deck} />
      <CardForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </div>
  
  );
};

export default EditCard;
