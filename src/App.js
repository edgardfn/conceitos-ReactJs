import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [ projects, setProjects ] = useState([])


  useEffect(() => {
    api.get('/repositories').then(response => {
      setProjects(response.data)
    })
  }, [])



  async function handleAddRepository() {

    const response = await api.post('/repositories', {
      title: `Novo Projeto ${Date.now()}`,
      url:"https://github.com/edgardfn/conceitos-reactJs",
      techs: "ReactJs"
    })

    const repositorio = response.data
    
    setProjects([...projects, repositorio])
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then(response => {
      const novosProjetos = projects.filter((project => {
        if(project.id === id) {
          return false
        }
        return true
      }))

      setProjects(novosProjetos)
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
