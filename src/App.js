import React, {useState, useEffect} from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    api.get("repositories").then(res => {
      setRepos(res.data);
    });
  }, []);

  async function handleAddRepository() {
    const suffix = Date.now();
    
    const res = await api.post("repositories", {
      title: `Novo repo ${suffix}`,
      url: `http://github.com/lemouta/novorepo-${suffix}`,
      techs: ["React", "Express", "Webpack", "Babel"]
    });

    setRepos([...repos, res.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    
    setRepos(repos.filter(repo => repo.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map(repo => (
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
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
