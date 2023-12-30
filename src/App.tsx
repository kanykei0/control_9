import { Route, Routes } from "react-router-dom";
import Home from "./containers/Home/Home";
import Toolbar from "./components/Toolbar/Toolbar";
import AddNewTransaction from "./containers/AddTransaction/AddTransaction";
import AddCategory from "./containers/AddCategory/AddCategory";
import CategoriesList from "./containers/CategoriesList/CategoriesList";
import EditCategory from "./containers/EditCategory/EditCategory";
// import EditTransaction from "./containers/EditTransaction/EditTransaction";

function App() {
  return (
    <>
      <header>
        <Toolbar />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<CategoriesList />} />
        <Route path="/add-transac" element={<AddNewTransaction />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/edit-category/:id" element={<EditCategory />} />
        {/* <Route path="/edit-transaction/:id" element={<EditTransaction />} /> */}
      </Routes>
    </>
  );
}

export default App;
