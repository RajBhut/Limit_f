
import io from "socket.io-client";
import { useState, useEffect } from "react";
import './personal.css';
const socket = io.connect("http://localhost:3001");  // Assuming server runs on port 3001

export default function Personal() {
  const [msg, setmsg] = useState("");
  
  const [room, setRoom] = useState("");
const[typing , settyping] = useState("");
  const [clients, setClients] = useState([]);
const [chat , setchat] = useState([]);
  function joinRoom() {
    if (room) {
      socket.emit("join personal", room); // Consistent event name
    } else {
      alert("Please enter a room");
    }
  }

  function sendMessage() {
   settyping("");
    socket.emit("personal msg", { message: { chat : msg , sender : 'me' , time : Date.now()}, room: room });
   
    setchat((old)=> [...old , {chat : msg , sender : 'me' , time : Date.now()}]);
  }

  useEffect(() => {
    settyping("");
    socket.on("updateClients", (clients) => {
      setClients(clients);
    });
socket.on("typing" , ()=>{
  settyping("typing");
})
    socket.on("personal msg", (data) => {
      
     
      setchat((old) => [...old , data]);
      
    });
    return () => {
      socket.off("updateClients");
      socket.off("personal msg");
    };
  }, []);

    return (<>
        <div className="top-2">
            <input className=" border-2 rounded-md p-1 h-25 w-40 bg-slate-100 shadow-lg"  placeholder="Room" value={room} onChange={e => setRoom(e.target.value)} />
            <button className="
    bg-blue-500 rounded-lg w-30 h-19 p-1.5 shadow-md  hover:bg-slate-200 hover:text-black transition-all duration-100 m-10 text-white" onClick={joinRoom}>Join Room</button>

        </div>
        {typing}
        <div className="flex flex-col items-center justify-center h-screen bg-gray-200 shadow-md rounded-md">

        {
  chat.map((data, index) => {
   
    return (
      <div key={index} id={`${data.sender === 'me' ? "sender" : "reciver"}`} className="shadow-md">
        {data.chat}
      </div>
    );
  })
}

        {/* <p>Recived: {receivedMsg.map((data, index) => (
        <p className="bg-orange-200" key={index}>
          {data}
        </p>
      ))}</p>
            
      <p>Sent: {sentMsg.map((data, index) => (
        <p className="bg-orange-200" key={index}>
          {data}
        </p>
      ))}</p> */}



</div>
            <form onSubmit={ (e) => {
              e.preventDefault();sendMessage()}}>
         <div className="w-screen flex align-middle items-center">
            <input  onFocus={
              socket.emit("typing", {room : room})
            } className="focus:shadow-xl border-2 rounded-md p-1 h-25 mt-2 mr-1 bg-blue-100 shadow-lg w-3/4 h-15" value={msg} onChange={(e) => setmsg(e.target.value)} type="text" placeholder="Enter msg" />
            <button type="submit" className="    bg-green-500 rounded-full  w-30 h-19 p-2 shadow-md  active:bg-lime-200 active:text-black transition-all duration-100  text-white" >send</button>
       
        </div></form>
    </>
    )

}

