"use client";

import React, { useState } from "react";

function Instagram() {
  const [formData, setFormData] = useState({
    productOrMood: "",
    hashtags: "",
    tone: "Trendy",
    language: "English",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Instagram caption form:", formData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white shadow-xl rounded-xl">
      <h1 className="text-2xl font-semibold mb-6 text-center text-pink-600">📸 Generate Instagram Caption</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium">Describe the post</label>
          <textarea
            name="productOrMood"
            rows="3"
            value={formData.productOrMood}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="e.g. Fashion launch, Happy vibes"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Hashtags (optional)</label>
          <input
            type="text"
            name="hashtags"
            value={formData.hashtags}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="#style #vibes #ootd"
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
            <option>Trendy</option>
            <option>Funny</option>
            <option>Emotional</option>
            <option>Witty</option>
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
            placeholder="e.g. English, Hinglish"
          />
        </div>

        <div className="text-center">
          <button className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700">
            Generate Caption
          </button>
        </div>
      </form>
    </div>
  );
}

export default Instagram;
