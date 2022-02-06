import { BrowserRouter as Router } from "react-router-dom";
import CommercialScreen from "./components/CommercialScreen";

function App() {
    return (
        <div className="App">
            <Router>
                <CommercialScreen />
            </Router>
        </div>
    );
}

export default App;
