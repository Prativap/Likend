import React ,{useState,useEffect} from 'react';
import jdata from './Jsondata.json';
import likendclick from './like-icon-filled.png';
import unlikeclick from './donot_like-icon.png';
import './App.css';
import axios from 'axios';

function App() {
    const axiosport = axios.create({
        baseURL: 'http://localhost:8080',
    }) ; 
    useEffect(()=>{
      check()
    });
const currentfriend ="ish"
const currentitem=99;
console.log("Prcocessunlikend"+currentfriend)

const processunlikened = async () => {try {
   //console.log("Prcocessunlikend"+currentfriend)
  
    const  result =   await  axiosport.post(`/unlike/${currentfriend}/${currentitem}`)
    setCounter(currentcount - 1);
    return result.data ;
  } catch(error) {

    if (JSON.stringify(error).includes(599))
       { alert ("Not Liked Yet ")}
    return error ;
     
  }

  };
  const check = async () => {try {
    const  result =   await  axiosport.get(`/check/${currentfriend}/${currentitem}`)
      setCounter(1);
     // return result.data;
    } catch(error) {
      setCounter(0);
      // if (JSON.stringify(error).includes(599))
      //    { alert ("Not Liked Yet ")}
      // return error ;
       
    }
  
    };
const processlikened = async () => {try {
    const  result =   await  axiosport.post(`/like/${currentfriend}/${currentitem}`)
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
       <img src={likendclick}/>
      </button>
      Count is :{currentcount}
    
     <button  onClick={handleClick2} >
       <img src={unlikeclick}/>
      </button>
    </div>
   
        );
  
}

export default App;
