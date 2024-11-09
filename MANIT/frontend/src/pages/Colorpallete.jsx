import React, { useState } from 'react';

const GREEN_COLOR = '#52e500';
const HOVER_GREEN = '#47c700';

function ColorPalette() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [theme, setTheme] = useState('');
  const [palette, setPalette] = useState([]);
  const [confidence, setConfidence] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false); // Added for managing loader display

  const handleImageUpload = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const analyzeImage = async () => {
    if (!selectedImage) {
      alert("Please upload an image first.");
      return;
    }

    setLoading(true);
    setIsAnalyzing(true); // Set analyzing state to true for the left section loader

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await fetch('http://127.0.0.1:5000/analyze-image', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setTheme(data.theme);
        setPalette(data.palette);
        setConfidence(data.confidence);

        generateImage(data.theme);
      } else {
        alert("Failed to analyze image.");
      }
    } catch (error) {
      console.error("Error analyzing image:", error);
    } finally {
      setLoading(false);
      setIsAnalyzing(false); // Set analyzing state to false when analysis is done
    }
  };

  const generateImage = async (theme) => {
    setIsGenerating(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: theme }),
      });

      if (response.ok) {
        const blob = await response.blob();
        setGeneratedImage(URL.createObjectURL(blob));
      } else {
        alert("Failed to generate image.");
      }
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Header Section */}
      <div className="pt-10 pb-8 px-6 border-b border-gray-800">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">
            AI Image Theme Classifier and Generator
          </h1>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer px-6 py-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-all"
              >
                Choose Image
              </label>
              {selectedImage && (
                <span className="ml-3 text-gray-400">
                  {selectedImage.name}
                </span>
              )}
            </div>
            
            <button
              onClick={analyzeImage}
              disabled={loading}
              style={{ backgroundColor: loading ? HOVER_GREEN : GREEN_COLOR }}
              className="px-6 py-2 rounded-full text-black transition-all hover:opacity-90 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Analyze Image'}
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Theme Analysis Results */}
          {isAnalyzing ? (
            <div className="bg-gray-900 rounded-lg p-8 flex items-center justify-center">
              <div className="loader"></div> {/* Loader animation for analyzing */}
            </div>
          ) : (theme && (
            <div className="bg-gray-900 rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-6">Analysis Results</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg text-gray-400">Detected Theme</h3>
                  <p className="text-xl font-medium" style={{ color: GREEN_COLOR }}>{theme}</p>
                </div>
                <div>
                  <h3 className="text-lg text-gray-400">Confidence</h3>
                  <p className="text-xl font-medium" style={{ color: GREEN_COLOR }}>{confidence}%</p>
                </div>
                <div>
                  <h3 className="text-lg text-gray-400">Color Palette</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {palette.map((color, index) => (
                      <div
                        key={index}
                        className="px-3 py-1 rounded-full text-sm"
                        style={{ backgroundColor: 'rgba(82, 229, 0, 0.1)', color: GREEN_COLOR }}
                      >
                        {color}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Generated Image Results */}
          {isGenerating ? (
            <div className="bg-gray-900 rounded-lg p-8 flex items-center justify-center">
              <div className="loader"></div> {/* Loader animation for image generation */}
            </div>
          ) : (generatedImage && (
            <div className="bg-gray-900 rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-6">Generated Image</h2>
              <div className="rounded-lg overflow-hidden">
                <img
                  src={generatedImage}
                  alt="Generated AI"
                  className="w-full h-auto"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ColorPalette;
