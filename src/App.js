import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Routes from "./routes";
import Layout from "./layouts";
import { Suspense } from "react";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
