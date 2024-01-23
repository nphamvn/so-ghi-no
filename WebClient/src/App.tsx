import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Browser from "./Browser";
import CreateFolder from "./CreateFolder";
import ItemList from "./ItemList";
import CreateItem from "./CreateItem";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Browser} />
        <Route path="/CreateFolder" Component={CreateFolder} />
        <Route path="/Items" Component={ItemList} />
        <Route path="/Items/New" Component={CreateItem} />
        <Route path="/Items/:id" Component={CreateItem} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
