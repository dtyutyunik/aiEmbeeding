import React, { useState } from "react";
import "../style/style.css";

const Embedding = () => {
  const [wordOne, setWordOne] = useState("");
  const [wordTwo, setWordTwo] = useState("");
  const [result, setResult] = useState("");
  const [prompt, setPrompt] = useState("");
  const [responseok, setResponseok] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!wordOne) {
      setError("Please enter a prompt!");
      setPrompt("");
      setResult("");

      return;
    }

    const response = await fetch("/api/embedding", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text1: wordOne, text2: wordTwo }),
    });

    try {
      if (response.ok) {
        setResponseok(true);
        const data = await response.json();
        console.log(data);
        setPrompt(`Similarity between ${wordOne} and ${wordTwo}.`);
        setResult(data.similarity);
        setWordOne("");
        setWordTwo("");
        setError("");
      } else {
        setResponseok(false);
        throw new Error("An error occurred");
      }
    } catch (error) {
      console.log(error);
      setResult("");
      setError("An error occurred while submitting the form.", error);
    }
  };

  return (
    <div className="container">
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="form-group row">
          <div className="col-sm-5 mt-2">
            <div className="form-floating">
              <textarea
                className="form-control custom-input"
                id="floatingInput"
                placeholder="Enter a value"
                value={wordOne}
                onChange={(e) => setWordOne(e.target.value)}
              />

              <label htmlFor="floatingInput">Input</label>
            </div>
          </div>
          <div className="col-sm-5 mt-2">
            <div className="form-floating">
              <textarea
                className="form-control custom-input"
                id="floatingInput"
                placeholder="Enter a value"
                value={wordTwo}
                onChange={(e) => setWordTwo(e.target.value)}
              />

              <label htmlFor="floatingInput">Input</label>
            </div>
          </div>
          <div className="col-sm-2 mt-2">
            <button type="submit" className="btn btn-primary custom-button">
              Submit
            </button>
          </div>
        </div>
      </form>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {prompt && <div className="alert alert-secondary mt-3">{prompt}</div>}
      {result && <div className="alert alert-success mt-3">{result}</div>}
    </div>
  );
};

export default Embedding;
