import { BrowserRouter as Router } from "react-router-dom";
import  AuthProvider  from "./main/libs/contexts/authContext";

import Main from "./main";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </Router>
  );
}

export default App;
