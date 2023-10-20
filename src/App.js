import Homepage from "./Homepage";
import  "./App.css";
import Authentication from "./Authentication/Authentication";
import { useState , useEffect} from "react";
import { db, auth } from "./firebase";


function App() {
    
    const [username, setUsername] = useState('');
    const [user,setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
          if (authUser){
    
            console.log(authUser);
            setUser(authUser);
    
          }else{
            setUser(null);
          }
        })
        return () => {
          unsubscribe();
        }
      },[user, username]);

 
   return(

    <div>
    {user? (
        <Homepage />
      ): (
        < Authentication />      )}

</div>
// < Homepage />
// < Authentication />

    )
        

}

export default App;