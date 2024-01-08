import './App.css';
import Cart from './Components/Cart';
import Checkout from './Components/Checkout';
import Navbar from './Components/Navbar';
import ProductList from './Components/ProductsList';
import { Routes, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar/>
     <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout/>} />
      </Routes>
    </div>
  );
}

export default App;
