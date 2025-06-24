"use client";

import React, { useState } from "react";

function Instagram() {
  const [formData, setFormData] = useState({
    productOrMood: "",
    hashtags: "",
    tone: "Trendy",
    language: "English",
  });

  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOutput("");
    setLoading(true);

    const { productOrMood, hashtags, tone, language } = formData;

    const useEmojis = true;
    const captionLength = "Short";

    const prompt = `
      Write a ${tone.toLowerCase()} and engaging Instagram caption in ${language}.
      Context: ${productOrMood || "some mood or product"}.
      Preferred length: ${captionLength}.
      ${useEmojis ? "Use relevant emojis to make it pop." : "No emojis required."}
      ${hashtags.trim()
        ? `Include these hashtags: ${hashtags}`
        : "Also add 5-7 trending and relevant hashtags related to the caption."}
    `;

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct:free",
          messages: [
            {
              role: "system",
              content: "You are a creative Instagram caption writer that generates trendy captions with relevant hashtags and emojis.",
            },
            {
              role: "user",
              content: prompt.trim(),
            },
          ],
        }),
      });

      const data = await res.json();
      if (!data.choices || !data.choices[0]) {
        setOutput("❌ Failed to generate caption. Try again.");
      } else {
        setOutput(data.choices[0].message.content.trim());
      }
    } catch (error) {
      console.error(error);
      setOutput("❌ Error reaching OpenRouter.");
    }

    setLoading(false);
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
            required
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
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
          >
            {loading ? "Generating..." : "Generate Caption"}
          </button>
        </div>
      </form>

      {output && (
        <div className="mt-6 p-4 bg-gray-50 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-pink-600">🎀 Your Caption:</h3>
          <p className="whitespace-pre-wrap">{output}</p>
        </div>
      )}
    </div>
  );
}

export default Instagram;
