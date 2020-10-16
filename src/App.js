import React ,{useState} from 'react';
import likeclick from './like-icon-filled.png';
import unlikeclick from './donot_like-icon.png';
import './App.css';
import axios from 'axios';

function App() {
    const axiosport = axios.create({
        baseURL: 'http://localhost:8080',
    }) ;  
const currentfriend = "Isha"; 
const currentitem="99";
const processunlikened = async () => {try {
    const  result =   await  axiosport.post(`/unlikened/${currentfriend}/${currentitem}`)
    setCounter(currentcount - 1);
    return result.data ;
  } catch(error) {

    if (JSON.stringify(error).includes(599))
       { alert ("Not Liked Yet ")}
    return error ;
     
  }

  };
const processlikened = async () => {try {
    const  result =   await  axiosport.post(`/likened/${currentfriend}/${currentitem}`)
    setCounter(currentcount + 1);
    return result.data ;
  } catch(error) {

    if (JSON.stringify(error).includes(529))
       { alert ("Already Liked")}
    return error ;
     
  }

  };
const handleClick =() => {
 processlikened();
    }
const handleClick2 = () => {processunlikened(); }

const [currentcount,setCounter] = useState(0);
  
  return (
    <div className="App">
     <button  onClick={handleClick} >
       <img src={likeclick}/>
      </button>
      Count is :{currentcount}
    
     <button  onClick={handleClick2} >
       <img src={unlikeclick}/>
      </button>
    </div>
   
        );
  
}

export default App;
