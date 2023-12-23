import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import { Home, Connection } from "./Pages/index";
import "./App.css";
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/connexion" element={<Connection />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
