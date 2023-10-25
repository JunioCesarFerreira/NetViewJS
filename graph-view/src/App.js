
import React, { useState, useCallback } from 'react';
import Graph from './components/Graph';
import GraphControlPanel from './components/GraphControlPanel';
import * as d3 from 'd3';

const App = () => {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [visualParams, setVisualParams] = useState({
    nodeSize: 5,
    linkDistance: 50,
    chargeStrength: -10,
    collisionRadius: 10,
    weightThreshold: 2,
    centerForce: 50,
  });
  const width = 800;
  const height = 600;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const graph = JSON.parse(e.target.result);
        const processedNodes = graph.nodes.map(node => ({
          id: node.id,
          label: node.label
        }));
  
        const processedLinks = graph.links.map(link => ({
          source: link.source,
          target: link.target,
          weight: link.weight
        }));
  
        console.log('Processed nodes: ', processedNodes); // Verifica os nós processados
        console.log('Processed links: ', processedLinks); // Verifica os links processados
  
        setNodes(processedNodes);
        setLinks(processedLinks);
        
        const maxLinkWeight = d3.max(processedLinks, link => link.weight);
        setVisualParams(prevParams => ({ ...prevParams, maxLinkWeight }));
      };
      reader.readAsText(file);
    }
  };

  const handleParamChange = useCallback((paramName, paramValue) => {
    setVisualParams(prevParams => ({
      ...prevParams,
      [paramName]: paramValue,
    }));
  }, []);

  return (
    <div className="graph-container">
      <h1>Network Graph</h1>
      <input type="file" onChange={handleFileChange} accept=".json" />
      <div>
        <Graph nodes={nodes} links={links} width={width} height={height} visualParams={visualParams} />
        <GraphControlPanel onParamChange={handleParamChange} visualParams={visualParams} maxWeight={visualParams.maxLinkWeight} />
      </div>
    </div>
  );
};

export default App;
