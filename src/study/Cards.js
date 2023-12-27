import React, { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom'
import { listCards, readDeck } from "../utils/api";


function Cards() {
  const [cardList, setCardList] = useState([])
  const [currentCard, setCurrentCard] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flip, setFlip] = useState(false)
  const history = useHistory();
  const [deckInfo, setDeckInfo] = useState([]);
  const { deckId } = useParams();
  const length = deckInfo.cards && deckInfo.cards.length

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller
     const getDeck = async () => {
       try {
         const response = await readDeck(deckId, signal);
         setDeckInfo(response);
       } catch(e) {
         console.log(e)
       }
      
    }
    getDeck();
    return () => {
      controller.abort()
    }
  }, [deckId])


  useEffect(() => {
    const getCardList = async () => {
      const response = await listCards(deckId)
      setCardList(response);
      setCurrentCard(response[0])
    }
    getCardList();
  }, [deckId])
  
  function nextCard () {
    if (currentIndex < cardList.length-1) {
      const nextIndex = currentIndex + 1
      setCurrentIndex(nextIndex)
      setCurrentCard(cardList[nextIndex]);
      setFlip(false)
    }

    if (currentIndex === cardList.length-1) {
      if (window.confirm("Restart cards? Click 'cancel' to return to the home page.")) {
        setCurrentIndex(0);
        setCurrentCard(cardList[0]);
        setFlip(false);
      } else {
        history.push('/')
      }
    }
  }

  return (
    <div>
      <div className="card" style={{width: "18rem"}}>
        <div className="card-body">
          <h5>Card {currentIndex+1} of {length}</h5>
          <p className="card-text">{ flip ? currentCard.back : currentCard.front }</p>
          <button type='button' onClick={() => setFlip(!flip)}>Flip</button>
          { flip && <button onClick={nextCard}>Next</button> }
        </div>
      </div>
    </div>
  )
}

export default Cards