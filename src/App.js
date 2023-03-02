import React, { useState, useEffect } from "react";

import { uuid } from "uuidv4";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => setRepositories(response.data))
  }, []);

  async function handleAddRepository() {
    const data = {
      id: uuid(),
      title: `Projeto ${Date.now()}`,
      url: "localhost",
      techs: [React, Node],
      likes: 0
    }

    const response = await api.post('repositories', data);
    const repository = response.data
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
