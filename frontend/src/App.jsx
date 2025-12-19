import React, { useState } from 'react'
import axios from "axios"

const App = () => {
  const [userinput, setUserinput] = useState("")
  const [message, setMessage] = useState([])

  const inputHander = async () => {
    if (!userinput.trim()) return

    const userMess = {
      role: "user",
      text: userinput
    }

    setMessage(prev => [...prev, userMess])
    setUserinput("")

    try {
      const { data } = await axios.post(
        "http://localhost:2000/api/stm",
        { userId: "nani9014", prompt: userMess.text }
      )

      if (!data.success) {
        console.error(data.message)
        return
      }

      const aiMess = {
        role: "ai",
        text: data.reply.reply,      // ✅ FIX HERE
        episode: data.reply.episode // optional metadata
      }

      setMessage(prev => [...prev, aiMess])

    } catch (err) {
      console.error("API Error:", err)
    }
  }

  return (
    <div className='bg-gradient-to-r from-purple-400 to-blue-500 min-h-screen flex justify-center items-center'>
      <div className='h-[450px] w-[450px] bg-white rounded-lg overflow-hidden flex flex-col'>
        
        {/* Header */}
        <div className='bg-purple-500 text-xs py-3'>
          <h1 className='text-center font-medium text-white'>
            Short Memory<br />Chatbot
          </h1>
        </div>

        {/* Chat body */}
        <div className='bg-white flex-1 overflow-y-auto space-y-3 px-3'>
          {message.map((msg, index) => (
            <div
              key={index}
              className={`mt-3 rounded-md text-xs py-2 px-3 shadow max-w-[80%]
                ${msg.role === "user"
                  ? "mr-auto bg-purple-400 text-white"
                  : "ml-auto bg-gray-100 text-black"}
              `}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input area */}
        <div className='flex gap-2 p-2'>
          <input
            type="text"
            placeholder='type message...'
            value={userinput}
            onChange={(e) => setUserinput(e.target.value)}
            className='placeholder:text-center w-full px-3 rounded-lg outline-none focus:ring-1 focus:ring-purple-400 bg-white'
          />
          <button
            onClick={inputHander}
            className='px-3 py-3 text-white font-semibold bg-purple-500 rounded-md'
          >
            send
          </button>
        </div>

      </div>
    </div>
  )
}

export default App
