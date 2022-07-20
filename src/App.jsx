import "./App.css";
import { Feed } from "./Feed";
import Metascraper from "scrape-meta";

console.log(Metascraper);
function App() {
  return (
    <div className="App m-4 mt-6 md:m-8">
      <Feed />
      <div className="card"></div>
    </div>
  );
}

export default App;
