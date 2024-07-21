
import React, { useState, useCallback } from 'react';
import Graph from './components/Graph';
import GraphControlPanel from './components/GraphControlPanel';
import { processGraphFile } from './utils/processGraphFile';

const App = () => {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);

  const [visualParams, setVisualParams] = useState({
    nodeSize: 5,
    linkDistance: 150,
    chargeStrength: -10,
    collisionRadius: 30,
    weightThreshold: 0,
    centerForce: 50,
    showNodeLabels: false,
    showLinkLabels: false
  });
  const width = 850;
  const height = 450;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      processGraphFile(file).then(({ processedNodes, processedLinks, maxLinkWeight }) => {
        setNodes(processedNodes);
        setLinks(processedLinks);
        setVisualParams(prevParams => ({ ...prevParams, maxLinkWeight }));
      }).catch(err => {
        console.error("Failed to process graph file:", err);
      });
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
      <div>
        <input type="file" onChange={handleFileChange} accept=".json" />
      </div>
      <div>
        <Graph nodes={nodes} links={links} width={width} height={height} visualParams={visualParams} />
        <GraphControlPanel onParamChange={handleParamChange} visualParams={visualParams} />
      </div>
    </div>
  );
};

export default App;
