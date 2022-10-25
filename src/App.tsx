import "./App.css";
import NavBar from "./components/hook/NavBar/NavBar";
import { StyledEngineProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";

//Pages
import PAGES from "./router/pages";
import General from "./pages/editor/general/General";
import Home from "./pages/editor/home/Home";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <div className="App">
        <Routes>
          <Route path={PAGES.entryApp} element={<NavBar />}>
            <Route path={PAGES.editHome} element={<Home />} />
            <Route path={PAGES.editGeneral} element={<General />} />
          </Route>
        </Routes>
      </div>
    </StyledEngineProvider>
  );
}

export default App;
