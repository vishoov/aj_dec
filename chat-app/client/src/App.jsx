import { io } from 'socket.io-client';
//io is the server reference
import './App.css'
import { useEffect, useState, useMemo } from 'react';

function App() {
  const [socketId, setsocketId] = useState("")
  const [message, setMessage] = useState("")
  const [messages, setMessagges]= useState([]);
  const [reciever, setReceiver] = useState("")
  const socket = useMemo(()=>io('http://localhost:3000/'), [])

  useEffect(()=>{
    socket.on("connect", ()=>{
      console.log("socket connected to the server")
      console.log(socket.id)
      setsocketId(socket.id)

    })


    socket.on('forward', (data)=>{
        setMessagges((prev)=>[...prev, data])
    })

    return ()=>{
      socket.off('connect')
      //this handles the graceful disconnection
    }
  }, [])

  const handleSubmit = (e)=>{
    //this sends the message out
    e.preventDefault()
      socket.emit('message', { message, reciever })
      console.log(`message sent: ${message}, to ${reciever}`)
  }


  return (
    <>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f4f8',
        fontFamily: 'Arial, sans-serif',
        color: '#333',
        padding: '20px',
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          color: '#007BFF',
          marginBottom: '20px',
        }}>
          Welcome to the best chat application in the world
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: '#555',
          marginBottom: '30px',
        }}>
          Your Socket ID: {socketId}
        </p>
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '400px',
        }}>
          <input 
            type='text' 
            onChange={(e) => setMessage(e.target.value)} 
            placeholder='Please enter your message' 
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '1rem',
              border: '1px solid #ccc',
              borderRadius: '5px',
              marginBottom: '15px',
              outline: 'none',
            }}
          />
               <input 
            type='text' 
            onChange={(e) => setReceiver(e.target.value)} 
            placeholder='Please enter reciever id' 
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '1rem',
              border: '1px solid #ccc',
              borderRadius: '5px',
              marginBottom: '15px',
              outline: 'none',
            }}
          />
          <button 
            type='submit' 
            style={{
              padding: '10px 20px',
              fontSize: '1rem',
              color: '#fff',
              backgroundColor: '#007BFF',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#007BFF'}
          >
            Send Message
          </button>
        </form>

            {messages.map((msg, index)=>{
              return <p key={index} >{msg}</p>
            })}


      </div>
    </>
  )
}

export default App
