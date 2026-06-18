import { useState } from "react";
import Search from "./components/search";

const  App = () => {
  const [searchterm, setSearchterm] = useState('')
  return ( 
    <main>
      <div className="warpper">
        <header>
          <img src="./hero.png" alt="Hero Banner"/> 
          <h1> Find <span className="text-gradient"> Movies </span> You Like!</h1>
        </header>

        <Search searchterm={searchterm} setSearchterm={setSearchterm}/>
      </div>
    </main>
   );
}
 
export default App;