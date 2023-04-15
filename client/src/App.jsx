import { useState,useEffect,useRef } from 'react'
import './App.css'
import axios from 'axios';



function App() {
  const [inputValue, setInputValue] = useState("")
  const [object,setObject]= useState([{}])
  const [count,setCount]=useState(0);
  const refElement = useRef();



  const handleClick = (e)=>{
    setInputValue(e.target.value)

  }
  

  const deleteTodo =(dataToBeDeleted)=>{
      axios.delete(`http://localhost:3000/del/${dataToBeDeleted}`)
      console.log("Deleted",dataToBeDeleted)
      setCount(count - 1)
      refElement.current.focus()
  }

  useEffect(()=>{
      const obj =  axios.get('http://localhost:3000/').then((val)=>{
          setObject(val.data)
        // console.log(data)
      })
  },[count])
  // console.log("test",count) 

  const btn = ()=>{
    // console.log(inputValue)
    if(inputValue===""){
      return;
    }
    else{

        axios.post('http://localhost:3000/save',{
          work:inputValue
        })
        setCount(count + 1)
        refElement.current.value=''
        refElement.current.focus()
      }
    }
  return (
    <div className='main'>
      <h1 className='heading__text'>Enter TODO </h1>
      <input className='input__field' ref={refElement} type="text" onChange={handleClick}/>
      <button className='btn-1' onClick={btn}>Add</button>
      {
        object.map((data,key)=>{
          return <div className='todos' key={key}>{`${data.work} `}<button className='btn-2' onClick={()=>deleteTodo(data._id)}>close</button></div>
        })
      }
    </div>
  )
}

export default App
