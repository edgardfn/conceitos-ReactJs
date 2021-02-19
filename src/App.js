import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [ projects, setProjects ] = useState([])


  const carregarProjetos = () => {
    api.get('/projects').then(response => {
      setProjects(response.data)
    })
  }

  useEffect(() => {
    carregarProjetos()
  }, [])



  async function handleAddRepository() {
    const response = await api.post('/projects', {
      title: `Novo Projeto ${Date.now()}`,
      owner: "Edgard Finotti"
  })

  
  carregarProjetos()
  }

  async function handleRemoveRepository(id) {
    api.delete(`/projects/${id}`).then(response => {
      carregarProjetos()
    }).catch(erro => {
      alert(erro)
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {projects.map(project => 
          <li key={project.id}>
            {project.title}
            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
            </button>
          </li>
            
        )}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
