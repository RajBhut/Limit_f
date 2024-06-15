
import io, { Socket } from "socket.io-client";
import { useEffect, useState } from "react";



const socket = io.connect("http://localhost:3001");

function SocketComponent() {
  const [msg, setmsg] = useState("");
  const [recivedmsg, setrecivedmsg] = useState();
  const [room, setroom] = useState();

  function joinroom() {
    if (room)
      socket.emit("join room", room);
    else
      alert("please enter room");
  }
  function sendmsg() {
    socket.emit("send msg", { massage: msg, room: room })

  }
  useEffect(
    () => {

      socket.on("receive msg", (data) => {
        setrecivedmsg(data)
      }

      )
    }
    , [socket]
  )

  return (<>
   <div className="top-2">
   <input className="h-25 w-40 bg-slate-100 shadow-lg" type="text" placeholder="room" value={room} onChange={e => setroom(e.target.value)} />
    <button className="
    bg-blue-500 rounded-lg w-30 h-19  m-10 text-white p-1" onClick={joinroom}>join room</button>
   
   </div>
  <div className="flex flex-col items-center justify-center h-screen bg-gray-200 shadow-md rounded-md">
  
    
   

    <p>{recivedmsg}</p>
   
      </div> <div className="w-screen flex align-middle items-center"> 
      <input className="w-3/4 h-15" value={msg} onChange={(e) => setmsg(e.target.value)} type="text" placeholder="Enter msg" />
       <button onClick={sendmsg}>send</button>
      </div>
  </>
  )

}

export default SocketComponent;