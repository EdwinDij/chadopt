import { Routes, Route, BrowserRouter } from "react-router-dom";
// import Connection from "./Pages/Connection/Connection";
// import Home from "./Pages/Home/Home";
import Layout from "./Components/Layout/Layout";
import { Home, Connection } from "./Pages/index";
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/connect" element={<Connection />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
