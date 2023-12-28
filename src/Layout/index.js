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
    <>
      <Header />
      <div className="container">
      <Switch>
          <Route exact path="/decks/new" component={CreateDeck} />
          <Route exact path="/decks/:deckId" component={Deck} />
          <Route exact path="/decks/:deckId/study" component={Study} />
          <Route exact path="/decks/:deckId/edit" component={EditDeck} />
          <Route exact path="/decks/:deckId/cards/new" component={AddCard} />
          <Route exact path="/decks/:deckId/cards/:cardId/edit" component={EditCard}/>
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </>
  );
}

export default Layout;