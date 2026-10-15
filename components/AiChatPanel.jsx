import React, { useState } from 'react';

export default function AiChatPanel({ onClose }) {
  const [chats, setChats] = useState([
    { sender: 'ai', text: 'Hello! Main aapka AI Guru hoon. Is lecture ke baare mein kuch bhi poochiye.' }
  ]);
  const [question, setQuestion] = useState('');

  const handleAskAI = (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    // User ka sawaal add karo
    const newChats = [...chats, { sender: 'user', text: question }];
    setChats(newChats);
    setQuestion('');

    // Simulate AI response (Aap yahan apni AI API call kar sakte hain)
    setTimeout(() => {
      setChats([...newChats, { sender: 'ai', text: 'Yeh ek bohot accha sawaal hai! Is topic ka mukhya uddeshya...' }]);
    }, 1000);
  };

  return (
    <div className="w-full md:w-80 bg-zinc-900 text-white h-full p-4 flex flex-col border-l border-zinc-800">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-zinc-800">
        <h3 className="font-bold text-lg flex items-center gap-2">🤖 Ask AI Assistant</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white text-xl font-bold">✕</button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto space-y-3 text-sm pr-1">
        {chats.map((c, idx) => (
          <div key={idx} className={`p-2.5 rounded-lg ${c.sender === 'ai' ? 'bg-indigo-950/50 border border-indigo-900/50' : 'bg-zinc-800 ml-4'}`}>
            <p className="text-gray-200">{c.text}</p>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <form onSubmit={handleAskAI} className="mt-4 flex gap-2 pt-2 border-t border-zinc-800">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask AI a doubt..."
          className="flex-1 bg-zinc-800 px-3 py-2 rounded-lg text-sm text-white outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-sm font-medium">
          Ask
        </button>
      </form>
    </div>
  );
}
