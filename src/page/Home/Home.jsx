import React from "react";
import { Link } from "react-router-dom";
import InterestProducts from "../../Components/InterestProducts/InterestProducts.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import InputReview from "../../Components/Testimonios/InputReview.jsx";

const Home = () => {
  return (
    <div>
      <div className="mb-5 justify-center">
      <InterestProducts />
      </div>
      <div>
        <div className='mb-10'>
          <div className='mb-4'>
            <InputReview />
          </div>
        </div>
      </div>
      <Link to={"/dashboard"}>
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
        Admin
        </button>
      </Link>
      <Footer />
    </div>
  );
};

export default Home;
