import './App.css';
import Display from "../src/Components/display"
import { drumPads } from './Data/drumPads';
import { pianoPads } from './Data/pianoPads';
import { BsToggleOn, BsToggleOff } from "react-icons/bs";
import { useState } from 'react';
import { GiDrumKit, GiGrandPiano} from "react-icons/gi";
function App() {
  const [ on, setOn ] = useState(true);
  const [drum, setDrum] = useState(true);
  return (
    <div className="App">
      {on ? <BsToggleOn onClick={()=> setOn(!on)} className="on"/> : <BsToggleOff onClick={()=> setOn(!on)} className="on"/> }
      <Display drumPads={drum ? drumPads : pianoPads} on = {on}/>
      <div> <GiDrumKit onClick={()=>setDrum(true)} className='drum'/>
      <GiGrandPiano  onClick={()=>setDrum(false)} className='drum'/> </div> 
    </div>
  );
}

export default App;
