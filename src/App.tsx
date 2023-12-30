import { Route, Routes } from "react-router-dom";
import Home from "./containers/Home/Home";
import Toolbar from "./components/Toolbar/Toolbar";
import AddNewTransaction from "./containers/AddTransaction/AddTransaction";
import AddCategory from "./containers/AddCategory/AddCategory";

function App() {
  return (
    <>
      <header>
        <Toolbar />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Home />} />
        <Route path="/add-transac" element={<AddNewTransaction />} />
        <Route path="/add-category" element={<AddCategory />} />
      </Routes>
    </>
  );
}

export default App;
