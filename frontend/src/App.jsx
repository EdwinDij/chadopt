import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import { Home, Connection } from "./Pages/index";
import "./App.css";
import { AuthProvider } from "./useAuth";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/connexion" element={<Connection />} />
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
