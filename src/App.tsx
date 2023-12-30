import { Route, Routes } from "react-router-dom";
import Home from "./containers/Home/Home";
import Toolbar from "./components/Toolbar/Toolbar";

function App() {
  return (
    <>
      <header>
        <Toolbar />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
