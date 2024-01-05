import React from "react";
import { Route,Switch, Link} from "react-router-dom";
import { useParams } from "react-router-dom";

function NavBar({ deck = {  }, did = {  } } ) {
const params = useParams();
const cardId = params.cardId;

return (
    <Switch>
      <Route exact path="/decks/new">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link className = "oi oi-home" to="/">Home </Link>
              {'  /  '}
              <p>Create Deck</p>
            </li>
          </ol>
        </nav>
      </Route>
      <Route exact path="/decks/:deckId">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link className = "oi oi-home" to="/" >Home </Link> 
              {'  /  '}
              <p>{deck.name}</p>
            </li>
          </ol>
        </nav>
      </Route>
      <Route exact path="/decks/:deckId/study">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link className = "oi oi-home" to="/"> Home </Link>
              {'  /  '}
              <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
              {'  /  '}
              <p> Study</p>
           
            </li>
          </ol>
        </nav>
      </Route>
      <Route exact path="/decks/:deckId/cards/new">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link className = "oi oi-home" to="/">Home </Link>
              {'  /  '}
              <p>{deck.name}</p>
            </li>
          </ol>
        </nav>
      </Route>
      <Route exact path="/decks/:deckId/edit">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link className = "oi oi-home" to="/">Home </Link>
              {'  /  '}
              <Link to= {`/decks/${did}`}>{deck} </Link>
              {'  /  '}
              <p> Edit Deck </p>
            </li>
          </ol>
        </nav>
      </Route>
      <Route exact path="/decks/:deckId/cards/:cardId/edit">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link className = "oi oi-home" to="/">Home </Link>
              {'  /  '}
              <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
              <p>/ Edit Card {cardId} </p>
            </li>
          </ol>
        </nav>
      </Route> 
    </Switch>
  );
}
export default NavBar;