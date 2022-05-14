import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Table from "./components/Table";
import Placeholder from "./components/Placeholder";

import "./App.css";
import "@progress/kendo-theme-default/dist/all.css";

function App() {
  const [tableState, setTableState] = useState({
    skip: 0,
    take: 25,
    sort: [],
    group: [],
  });

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Table tableState={tableState} setTableState={setTableState} />
          }
        />
        <Route path="/dud" element={<Placeholder />} />
      </Routes>
    </div>
  );
}

export default App;
