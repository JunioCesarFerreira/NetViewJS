
import React, { useState } from 'react';
import Graph from './components/Graph';

const App = () => {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const width = 800;
  const height = 600;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = JSON.parse(e.target.result);
        const processedNodes = data.graph.vertices.map(vertex => ({
          id: vertex.id,
          label: vertex.label
        }));
  
        const processedLinks = data.graph.edges.map(edge => ({
          source: edge.source,
          target: edge.target,
          weight: edge.weight
        }));

        setNodes(processedNodes);
        setLinks(processedLinks);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="graph-container">
      <h1>Network Graph</h1>
      <input type="file" onChange={handleFileChange} accept=".json" />
      <div>
        <Graph nodes={nodes} links={links} width={width} height={height} />
      </div>
    </div>
  );
};

export default App;
