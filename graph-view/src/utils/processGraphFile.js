export const processGraphFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
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

          console.log('Processed nodes: ', processedNodes);
          console.log('Processed links: ', processedLinks);
  
          const maxLinkWeight = Math.max(...processedLinks.map(link => link.weight));
          
          resolve({ processedNodes, processedLinks, maxLinkWeight });
        } catch (error) {
          reject(new Error('Failed to parse JSON file.'));
        }
      };
      reader.onerror = () => {
        reject(new Error('Failed to read file.'));
      };
      reader.readAsText(file);
    });
  };
  