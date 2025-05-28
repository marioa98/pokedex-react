import type { FunctionComponent } from "react";
import { Route, Routes } from "react-router-dom";
import Pokedex from "../views/Pokedex/Pokedex";

const AppRouter: FunctionComponent = () => (
  <Routes>
    <Route index element={<Pokedex />} />
  </Routes>
)

export default AppRouter;