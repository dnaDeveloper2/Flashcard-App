import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Switch } from "react-router-dom";
import Home from "../home/Home";
import Study from "../study/Study";
import CreateDeck from "../createDeck/CreateDeck";
import Deck from "../deck/Deck";
import EditDeck from "../editDeck/EditDeck";
import AddCard from "../addCard/AddCard";
import EditCard from "../editCard/EditCard";


function Layout() {
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/decks/new" component={CreateDeck} />
          <Route path="/decks/:deckId/study" component={Study} />
          <Route path="/decks/:deckId/edit" component={EditDeck} />
          <Route path="/decks/:deckId/cards/new" component={AddCard} />
          <Route path="/decks/:deckId/cards/:cardId/edit" component={EditCard} />
          <Route path="/decks/:deckId" component={Deck} />
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default Layout;