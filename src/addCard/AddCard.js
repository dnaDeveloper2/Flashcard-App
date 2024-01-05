import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";
import NavBar from "../Layout/NavBar";
import CardForm from "../Layout/CardForm";

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
      <NavBar deck={AddCard} />

      <h2>{`React Router: Add Card - ${deck.name}`}</h2>

      <CardForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCancel={handleDone}
      />
    </div>
  );
};

export default AddCard;
