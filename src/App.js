import React, {useState, useEffect} from "react";

import "./styles.css";
import api from './services/api';

function App() {
  async function handleAddRepository() {
    // Adicionar um repositório a sua API: Deve ser capaz de adicionar um novo item na sua API através de um botão com o texto Adicionar
    // e, após a criação, deve ser capaz de exibir o nome dele após o cadastro.
    api.post('repositories', {
      title: `novo projeto ${Date.now()}`,
      url: 'http://github.com/',
      techs: ''
  })
  }

  async function handleRemoveRepository(id) {
    // Remover um repositório da sua API: Para cada item da sua lista, deve possuir um botão com o texto Remover que, 
    // ao clicar, irá chamar uma função para remover esse item da lista do seu frontend e da sua API.
    api.delete(`/repositories/`+id);
  }

  const [repositories, setRepositories] = useState ([]);

  useEffect(()=>{
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
},[handleAddRepository,handleRemoveRepository]) 
  
  return (
    <div>
      <ul data-testid="repository-list">
       {repositories.map(repository => <li key = {repository.id}> {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
