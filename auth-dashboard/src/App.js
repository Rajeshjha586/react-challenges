import { AuthProvider } from "./components/AuthProvider";
import { Main } from "./components/Main";
import { NavBar } from "./components/NavBar";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <Main />
    </AuthProvider>
  );
}

export default App;
