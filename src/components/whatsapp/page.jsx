"use client";

import React, { useState } from "react";

function WhatsApp() {
  const [formData, setFormData] = useState({
    recipientName: "",
    context: "",
    tone: "Friendly",
    language: "English",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("WhatsApp message form:", formData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white shadow-xl rounded-xl">
      <h1 className="text-2xl font-semibold mb-6 text-center text-green-700">💬 Generate WhatsApp Message</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium">Recipient Name</label>
          <input
            type="text"
            name="recipientName"
            value={formData.recipientName}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Context</label>
          <textarea
            name="context"
            rows="3"
            value={formData.context}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="What's the message about?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Tone</label>
          <select
            name="tone"
            value={formData.tone}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          >
            <option>Friendly</option>
            <option>Professional</option>
            <option>Apologetic</option>
            <option>Casual</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Language</label>
          <input
            type="text"
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="e.g. English, Hindi"
          />
        </div>

        <div className="text-center">
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Generate WhatsApp Message
          </button>
        </div>
      </form>
    </div>
  );
}

export default WhatsApp;
