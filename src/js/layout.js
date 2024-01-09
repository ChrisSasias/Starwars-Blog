import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./views/home";
import CharacterDetail from "./views/CharacterDetail";
import PlanetDetail from "./views/PlanetDetail";
import StarshipDetail from "./views/StarshipDetail";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";



//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/CharacterDetail/:id" element={<CharacterDetail />} />
            <Route path="/PlanetDetail/:id" element={<PlanetDetail />} />
            <Route path="/StarshipDetail/:id" element={<StarshipDetail />} />
            <Route path="*" element={<h1>Not found!</h1>} />
          </Routes>

          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);