import React ,{useState,useEffect} from 'react';
import jdata from './Jsondata.json';
import likendclick from './like-icon-filled.png';
import unlikeclick from './donot_like-icon.png';
import './App.css';
import axios from 'axios';
import Select from 'react-select';

function App() {
    const axiosport = axios.create({
        baseURL: 'http://localhost:8080',
    }) ; 
  const [selectOptions,setSelectOptions]=useState([])
  const [id,setId]=useState("")
  const [name,setName]=useState("")
  const [currentfriend,setCurrentfriend]=useState("")
    const getOptions= ()=>{
    
//   for (var i = 0; i < jdata.length; i++) {
//     //console.log("looping friends"+JSON.stringify(jdata[i])+friends.join())
//     friends.push(jdata[i].favname);
    
  
//   //  console.log(friends.join()+"friends");
// }
      
  
      const options = jdata.map(d => ({
        "value" : d.age,
        "label" : d.nickname
  
      }))
     var noValue={};
     noValue.label="" 
     noValue.value="" 
    //noValue.label or noValue["label"]
    //this.setState({selectOptions: options})
      setSelectOptions(options)
  
    }
    useEffect(()=>{
      console.log("use effect executed");
     check();
     getOptions();
    },[]);
    const handleChange =(e)=>{
      //this.setState({id:e.value, name:e.label})
      setId(e.value)
      setName(e.label)
      setCurrentfriend(e.label)
     }



//const currentfriend =jdata[1].nickname;

const currentitem=99;
//console.log("name fetched:"+currentfriend)

const processunlikened = async () => {try {
   //console.log("Prcocessunlikend"+currentfriend)
  // "/check/:id/:user"
    const  result =   await  axiosport.post(`/unlike/${currentitem}/${currentfriend}`)
    setCounter(currentcount - 1);
    return result.data ;
  } catch(error) {

    if (JSON.stringify(error).includes(599))
       { alert ("Not Liked Yet ")}
    return error ;
     
  }
}
 
  const check = async () => {try {
    const  result =   await  axiosport.get(`/check/${currentitem}/${currentfriend}`)
      setCounter(1);
       return result.data;
    } catch(error) {
       setCounter(0)
      // if (JSON.stringify(error).includes(599))
      //    { alert ("Not Liked Yet ")}
      // return error ;
       
    }
  
    };
const processlikened = async () => {try {
    const  result =   await  axiosport.post(`/like/${currentitem}/${currentfriend}`)
    setCounter(currentcount + 1);
    return result.data ;
  } catch(error) {

    if (JSON.stringify(error).includes(529))
       { alert ("Already Liked")}
    return error ;
     
  }

}
const handleClick =() => {
 processlikened();
    }
const handleClick2 = () => {processunlikened(); }

const [currentcount,setCounter] = useState(0);
  
  return (
    <div className="App">
      <Select options={selectOptions} onChange={handleChange} />
      <p>You have selected <strong>{name}</strong> whose age is <strong>{id}</strong></p>

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
