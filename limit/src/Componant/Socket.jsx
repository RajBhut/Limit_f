
import io, { Socket }  from "socket.io-client";
import { useEffect, useState } from "react";



const socket = io.connect("http://localhost:3001");

function SocketComponent() {
  const [msg ,  setmsg] = useState("");
  const[recivedmsg , setrecivedmsg] = useState();
  function sendmsg()
  {
    socket.emit("send msg" , msg)
    
  }
  useEffect(
    ()=>{

socket.on(  "recived msg" , (data)=>{
  setrecivedmsg(data)
}

)
    }
    ,[socket]
  )

return(<>
<input value={msg} onChange={(e)=> setmsg(e.target.value)} type="text" placeholder="Enter msg"/>
<button onClick={sendmsg}>send</button>
<p>{recivedmsg}</p>
  </>
)
 
}

export default SocketComponent;