import Home from "./components/Home";
import Alunos from "./components/Alunos";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <h1>Cadastro de períodos</h1>
      <BrowserRouter>
        <Nav variant="tabs">
          <Nav.Link as={Link} to="/">
            Página Inicial
          </Nav.Link>
          <Nav.Link as={Link} to="/alunos">
            Cadastro de períodos
          </Nav.Link>
         
        </Nav>

        <Routes>
          <Route path="/" index element={<Home />}></Route>
          <Route path="/alunos" element={<Alunos />}></Route>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
