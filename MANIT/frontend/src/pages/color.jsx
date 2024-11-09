import React, { useState } from 'react';

const ArtAnalyzer = () => {
  const [theme, setTheme] = useState('');
  const [palette, setPalette] = useState([]);

  const analyzeArtwork = async () => {
    const artworkInput = document.getElementById('artworkInput');
    if (!artworkInput.files[0]) {
      alert('Please upload an image.');
      return;
    }

    const formData = new FormData();
    formData.append('file', artworkInput.files[0]);

    // Send the artwork to the backend for analysis
    try {
      const response = await fetch('/analyze', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (result.theme && result.palette) {
        setTheme(result.theme);
        setPalette(result.palette);
      } else {
        alert('Error analyzing artwork. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error analyzing artwork. Please try again.');
    }
  };

  const displayColorPalette = (palette) => {
    return palette.map((color, index) => (
      <div key={index} className="colorBox" style={{ backgroundColor: color }}></div>
    ));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Art Analyzer and Color Palette Generator</h1>
      <div style={styles.innerContainer}>
        <h2>Upload Your Artwork</h2>
        <input type="file" id="artworkInput" accept="image/*" style={styles.input} />
        <button onClick={analyzeArtwork} style={styles.button}>
          Analyze Artwork
        </button>

        <div style={styles.result}>
          {/* The theme and color palette results will be displayed here */}
          {theme && <h3>Detected Theme: {theme}</h3>}
        </div>

        <div style={styles.colorPalette}>
          {/* Color palette boxes will be displayed here */}
          {displayColorPalette(palette)}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    margin: '50px',
  },
  header: {
    color: '#4CAF50',
  },
  innerContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
  },
  input: {
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  buttonHover: {
    backgroundColor: '#45a049',
  },
  result: {
    marginTop: '20px',
  },
  colorPalette: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
  colorBox: {
    width: '50px',
    height: '50px',
    margin: '5px',
    borderRadius: '5px',
  },
};

export default ArtAnalyzer;
