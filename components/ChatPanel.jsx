import React, { useState } from 'react';

export default function ChatPanel({ onClose }) {
  const [messages, setMessages] = useState([
    { id: 1, user: 'Rahul', text: 'Sir yeh concept clear ho gaya!' },
    { id: 2, user: 'Priya', text: 'Next topic kab start hoga?' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), user: 'Aap', text: input }]);
    setInput('');
  };

  return (
    <div className="w-full md:w-80 bg-zinc-900 text-white h-full p-4 flex flex-col border-l border-zinc-800">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-zinc-800">
        <h3 className="font-bold text-lg">Live Chat</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white text-xl font-bold">✕</button>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto space-y-3 text-sm pr-1">
        {messages.map((msg) => (
          <div key={msg.id} className="bg-zinc-800 p-2.5 rounded-lg">
            <span className="font-semibold text-indigo-400">{msg.user}: </span>
            <span className="text-gray-200">{msg.text}</span>
          </div>
        ))}
      </div>

      {/* Message Input Box */}
      <form onSubmit={sendMessage} className="mt-4 flex gap-2 pt-2 border-t border-zinc-800">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Send a message..."
          className="flex-1 bg-zinc-800 px-3 py-2 rounded-lg text-sm text-white outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-sm font-medium">
          Send
        </button>
      </form>
    </div>
  );
}
