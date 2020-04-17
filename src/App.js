import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import "./App.css";
import api from "./services/api";

function App() {
  const [projects, setProjets] = useState([]);

  useEffect(() => {
    api.get("projects").then((response) => {
      setProjets(response.data);
    });
  }, []);

  async function handleAddProject() {
    // setProjets([...projects, `Novo projeto ${Date.now()}`]);
    const response = await api.post("projects", {
      title: `Novo projeto ${Date.now()}`,
      owner: "Agnaldo Burgo Junior",
    });

    const project = response.data;

    setProjets([...projects, project]);
  }

  return (
    <>
      <Header title="Projects" />
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.title}</li>
        ))}
      </ul>
      <button type="button" onClick={handleAddProject}>
        Adicionar project
      </button>
    </>
  );
}

export default App;
