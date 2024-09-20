import React, { useState } from 'react';
import './App.css'; // Importa o CSS

function App() {
  // Estados para capturar os valores dos inputs
  const [bugDescription, setBugDescription] = useState('');
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');
  const [selectedOption, setselectedOption] = useState(null);
  const [secondOptions, setsecondOptions] = useState([]);
  const [finalselection, setfinalselection] = useState(null);
  const [rating, setrating] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');

  const handleRating = (value) => {
    setrating(value);
  };
  
  const handleOptionClick = (option) => {
    setselectedOption(option);
    if(option === "Compiler") {
      setsecondOptions(["GCC", "LVM", "MSVC"]);
    }
    else if(option === "Operating System"){
      setsecondOptions(["x86_64", "aarch64", "ppc64le"]);
    }
    else if(option === "Language"){
      setsecondOptions(["C", "C++", "Python"]);
    }
    setfinalselection(null);
  };
 
  const handleSecondOptionClick = (option) =>{
    setfinalselection(option);
  }

  // Função que será chamada quando o formulário for enviado
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita o recarregamento da página

    // Monta o objeto JSON com os valores dos inputs
    const jsonData = {
      bugDescription: bugDescription,
      persona: selectedOption,
    };
    // setTimeout(() =>
    // setResponseMessage("Error in static member function 'static constexpr std::char_traits::char_type* std::char_traits::copy(char_type*, const char_type*, std::size_t)'** This context points to an error in the `std::char_traits` class, specifically in the `copy` function, which is a static member function. The error message mentions a problem with `__builtin_memcpy`, which is a GCC built-in function. **Context 4: std::map static_copy;** This context shows a definition of a `std::map` with a pointer to `int` as the key type and a custom struct `sysDLoc` as the value type. The `resetStdMap` function is defined to swap the contents of this map with a temporary, empty map. Now, considering the provided code snippets and error messages, here are some potential issues: 1. **Incompatible GCC versions**: The code was built with an older version of GCC (9.3.0), but some of the error messages reference newer versions of GCC (12.1.0 and 12.2.0). This might indicate that the code is not compatible with the newer GCC versions. 2. **std::string and std::char_traits issues**: The error messages suggest problems with the `std::string` and `std::char_traits` classes, which are part of the C++ Standard Library. These issues might be related to the way string literals are handled or copied. 3. **Pointer aliasing and restrict warnings**: The bogus restrict warning might be related to pointer aliasing issues, which can occur when the compiler is unsure about the relationships between pointers. To address these issues, I would recommend: 1. **Update the GCC version**: Try building the code with a newer version of GCC to see if the issues persist. 2. **Review string handling**: Verify that string literals are handled correctly, and consider using `std::string` constructors or `std::string::assign` instead of direct assignments. 3. **Check pointer aliasing**: Review the code to ensure that pointers are not aliased in a way that could trigger restrict warnings. If you'd like me to help with specific code changes or provide more detailed explanations, please let me know!"), 100); 

    try {
      // Envia o JSON para o backend usando uma requisição POST
      const res = await fetch('http://localhost:1115/api/save-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData), // Transforma o objeto em uma string JSON
      });

      // Recebe a resposta do backend
      const message = await res.text();
      setResponseMessage(message); // Exibe a mensagem de resposta
    } catch (err) {
      console.error('Erro ao enviar os dados para o backend:', err);
    }
    const res = await fetch('http://localhost:8080/api/save-response', {
      method: 'POST',
      headers: {
        'Content-Type': 'rating',
      },
      body: rating,
    });
  }


  return (
    <div className="App">
      <h1>Bug Tracker</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Insert your Bug:
          <textarea
            value={bugDescription}
            onChange={(e) => setBugDescription(e.target.value)}
          />
        </label>


        <div className='persona-container'>
              Filters:
              <div className='button-group'>
              <button type="button" onClick={() => handleOptionClick("Compiler")}
              style={{
                backgroundColor: selectedOption === "Compiler" ? "#ff6400" : "black",
              }}
              >Compiler</button>
              <button type="button" onClick={() => handleOptionClick("Operating System")}
              style={{
                backgroundColor: selectedOption === "Operating System" ? "#ff6400" : "black",
              }}
              >
                Operational System
              </button>
              <button type="button" onClick={() => handleOptionClick("Language")}
              style={{
                backgroundColor: selectedOption === "Language" ? "#ff6400" : "black",
              }}
              >
                Language
              </button>
              </div>
        </div>

        {selectedOption && (
          <div className='input-row'>
            {secondOptions && secondOptions.map((option) => (
              <button key={option} type='button' onClick={() =>
                handleSecondOptionClick(option)}
                style={{
                  backgroundColor: finalselection === option ? "#ff6400" : "black",
                }}
                >
                {option}
              </button>
            ))}

          </div>
        )}
        <button type="submit">Send</button>
        {responseMessage && (
          <div className='answer-container'>
              <h3>Answer</h3>
            <div className='response-container'>
              {responseMessage}
            </div>
            <div className='answer-container'>
              <h3>Reference</h3>
              <div className='response-container'
              style={{color: 'blue'}}
              >
              852557438_e1fc9fc859c841609b423544b3c6b4f2-190924-1059-2918.pdf
              </div>
            </div>
            <div>
          How accurate were this answer?
          <div>
            {[...Array(10).keys()].map((i) => (
              <button
                key={i+1}
                onClick={() =>
                handleRating(i+1)}
                style={{
                  margin: "5px",
                  backgroundColor: rating === i + 1 ? "green" : "gray",
                  color: "white",
                }}
                >
                  {i + 1}
                </button>
            ))}
          </div>
        </div>
          </div>
        )}
        
      </form>

      {responseMessage && (
        <div className="response-container">
          <h2>Resposta:</h2>
          <p>{responseMessage}</p>
        </div>
      )}
    </div>
  );
}

export default App;
