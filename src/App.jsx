import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookingProvider } from "./context/BookingContext";
import Header from "./Component/Header";
import Home from "./Component/Home";
import SearchBar from "./Component/SearchBar";
import FilterPanel from "./Component/FilterPanel";
import PackageList from "./Component/PackageList";
import PackageDetail from "./Component/PackageDetail";
import BookingCart from "./Component/BookingCart";
import TravelerForm from "./Component/TravelerForm";
import Payment from "./Component/Payment";
import Checkout from "./Component/Checkout";
import Footer from "./Component/Footer";

function App() {
  return (
    <BrowserRouter>
      <BookingProvider>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/packages"
            element={
              <>
                <SearchBar />
                <FilterPanel />
                <PackageList />
              </>
            }
          />

          <Route path="/package/:id" element={<PackageDetail />} />
          <Route path="/booking" element={<TravelerForm />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>

        <BookingCart />
        <Footer />
      </BookingProvider>
    </BrowserRouter>
  );
}

export default App;