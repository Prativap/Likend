import React ,{useState,useEffect} from 'react';
import jdata from './Jsondata.json';
import './App.css';
import axios from 'axios';

function App() {
    const axiosport = axios.create({
        baseURL: 'http://localhost:9090',
    }) ; 
    const getServerMessage=async()=>{try{
     const result=await axiosport.get("/ifly")
    // alert(JSON.stringify(result))
      setServerMessage(result.data)
    }catch (error){
      setServerMessage("couldn't get result from server"
      + JSON.stringify(error))
    }

  }

    const [server_message,setServerMessage]=useState("I am a very good girl");
   // setServerMessage("I am a very good girl")
    useEffect(() => {
      // Update the document title using the browser API
      getServerMessage();
    });

  return (
    <div className="App">
      Local Messagae : Ish flies !
      <br/>
      {server_message}
      
    </div>
   
        );
  
}

export default App;
