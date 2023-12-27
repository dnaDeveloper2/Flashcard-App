import React, { useEffect, useState } from "react";
import { Link, useParams, useRouteMatch, useHistory } from 'react-router-dom'
import { deleteDeck, deleteCard, readDeck } from "../utils/api";

function Deck() {
  const [deckInfo, setDeckInfo] = useState([]);
  const params = useParams();
  const { url } = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    const getDeck = async () => {
      const response = await readDeck(params.deckId);
      setDeckInfo(response);
    }
    getDeck();
  }, [params]);

  const deleteDeckButton = async (event) => {
    if (window.confirm('Delete this deck? You will not be able to recover it.')) {
      await deleteDeck(params.deckId)
      history.push('/')
    }
  }

  const cards = deckInfo.cards && deckInfo.cards.map((card, i) => {
    const deleteButton = async (event) => {
      if (window.confirm('Delete this card? You will not be able to recover it.')) {
        await deleteCard(card.id)
        history.push(url)
      }
    }
    return (
      <div key={i} className="card">
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>{card.front}</p>
            <footer className="blockquote-footer">{card.back}</footer>
          </blockquote>
        </div>
        <Link to={`${url}/cards/${card.id}/edit`}>
          <button type='button' className='btn btn-secondary'>Edit</button>
        </Link>
        <button type='button' className='btn btn-danger' onClick={deleteButton}>Delete</button>
      </div>
    );
  });
  
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <Link to={'/'}>
            <li className="breadcrumb-item">Home</li>
          </Link>
          <li className="breadcrumb-item active" aria-current="page">/ {deckInfo.name}</li>
        </ol>
      </nav>
      <h2>{deckInfo.name}</h2>
      <p>{deckInfo.description}</p>
      <Link to={`${url}/edit`}>
        <button type="button" className="btn btn-secondary mr-2">Edit</button>
      </Link>
      <Link to={`${url}/study`}>
        <button type="button"className="btn btn-primary mr-2">Study</button>
      </Link>
      <Link to={`${url}/cards/new`}>
        <button type="button" className="btn btn-primary mr-5">Add Cards</button>
      </Link>
        <button type="button" className="btn btn-danger" onClick={deleteDeckButton}>Delete</button>
      <h1>Cards</h1>
        {cards}
    </div>
  )
}

export default Deck