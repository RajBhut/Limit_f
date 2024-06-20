
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
   <input className=" border-2 rounded-md p-1 h-25 w-40 bg-slate-100 shadow-lg" type="text" placeholder="Room" value={room} onChange={e => setroom(e.target.value)} />
    <button className="
    bg-blue-500 rounded-lg w-30 h-19 p-1.5 shadow-md  hover:bg-slate-200 hover:text-black transition-all duration-100 m-10 text-white" onClick={joinroom}>Join Room</button>
   
   </div>
  <div className="flex flex-col items-center justify-center h-screen bg-gray-200 shadow-md rounded-md">
  
    
   

    <p>{recivedmsg}</p>
   
      </div> <div className="w-screen flex align-middle items-center"> 
      <input className="focus:shadow-xl border-2 rounded-md p-1 h-25 mt-2 mr-1 bg-blue-100 shadow-lg w-3/4 h-15" value={msg} onChange={(e) => setmsg(e.target.value)} type="text" placeholder="Enter msg" />
       <button className="    bg-green-500 rounded-full  w-30 h-19 p-2 shadow-md  active:bg-lime-200 active:text-black transition-all duration-100  text-white" onClick={sendmsg}>send</button>
      </div>
  </>
  )

}

export default SocketComponent;