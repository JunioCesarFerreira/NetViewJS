import React, { useRef, useEffect } from 'react';
import './Graph.css';
import * as d3 from 'd3';

const Graph = ({ nodes, links, width, height, visualParams }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const markerWidth = 13

    // Filtrar links baseados no Weight Threshold antes de renderizar
    const filteredLinks = links.filter(link => link.weight >= visualParams.weightThreshold);

    const simulation = d3.forceSimulation(nodes)
      .alphaDecay(0.1)
      .force("link", d3.forceLink(filteredLinks).id(d => d.id).distance(visualParams.linkDistance))
      .force("charge", d3.forceManyBody().strength(visualParams.chargeStrength))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(visualParams.collisionRadius));

    svg.selectAll('*').remove();
    
    // Adiciona um grupo para todos os elementos e aplica o zoom a este grupo.
    const g = svg.append("g")
        .attr("class", "everything");
    
    // Definindo os marcadores de seta
    g.append('defs').append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '-0 -5 10 10')
      .attr('refX', 0)
      .attr('refY', 0)
      .attr('orient', 'auto')
      .attr('markerWidth', markerWidth)
      .attr('markerHeight', 13)
      .attr('xoverflow', 'visible')
      .append('svg:path')
      .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
      .attr('fill', '#999'); // Cor da seta

    // Calcula a quantidade de links para cada nó usando os links filtrados
    let linkCount = {};
    filteredLinks.forEach(link => {
      linkCount[link.source.id] = (linkCount[link.source.id] || 0) + 1;
      linkCount[link.target.id] = (linkCount[link.target.id] || 0) + 1;
    });
  
    // Mapeia essa quantidade para um tamanho de nó desejado e use visualParams.nodeSize como multiplicador
    const nodeSizeScale = d3.scaleLinear()
      .domain([d3.min(Object.values(linkCount))-1, d3.max(Object.values(linkCount))])
      .range([visualParams.nodeSize, 3 * visualParams.nodeSize]);
    

	  // Criação de elementos gráficos dentro do grupo...
	  const link = g.append("g")
		  .attr("class", "links")
		  .selectAll("line")
		  .data(filteredLinks)
		  .enter()
		  .append("line")
		  .attr("class", "link")
      .attr('marker-end', 'url(#arrowhead)');
  
	  const node = g.append("g")
		  .attr("class", "nodes")
		  .selectAll("circle")
		  .data(nodes)
		  .enter()
		  .append("circle")
		  .attr("class", "node")
      .attr("r", d => nodeSizeScale(linkCount[d.id] || 0));

    const nodeLabels = g.append("g")
		  .attr("class", "node-labels")
		  .selectAll("text")
		  .data(nodes)
		  .enter()
		  .append("text")
		  .attr("x", d => d.x)
		  .attr("y", d => d.y)
		  .text(d => d.label)
		  .attr("dy", "-1em")
      .attr("fill", "#ecf0f1")  // Cor do texto
      .style("font-size", "10px");  // Tamanho do texto
	
    const linkLabels = g.append("g")
		  .attr("class", "link-labels")
		  .selectAll("text")
		  .data(filteredLinks)
		  .enter()
		  .append("text")
		  .attr("x", d => (d.source.x + d.target.x) / 2)
		  .attr("y", d => (d.source.y + d.target.y) / 2)
		  .text(d => d.weight.toString())
		  .attr("dy", "-0.5em")
      .attr("fill", "#ecf0f1")  // Cor do texto
      .style("font-size", "10px");  // Tamanho do texto
    
    // Adiciona comportamento de zoom ao SVG.
    const zoom = d3.zoom()
      .scaleExtent([0.1, 4])
      .on("zoom", (event) => {
        g.attr("transform", event.transform); // Aplica o zoom ao grupo principal.
      });

    svg.call(zoom);
    
    // Funções de arrastar
    const dragStart = (event, d) => {
      if (!event.active) simulation.alphaDecay(0.01).restart();
      d.fx = d.x;
      d.fy = d.y;
    };
  
    const dragged = (event, d) => {
      d.fx = event.x;
      d.fy = event.y;
    };
  
    const dragEnd = (event, d) => {
      if (!event.active) simulation.alphaTarget(0.1);
      d.fx = null;
      d.fy = null;
    };
  
    // Aplicando o drag aos nós
    const drag = d3.drag()
      .on("start", dragStart)
      .on("drag", dragged)
      .on("end", dragEnd);
  
    node.call(drag);
  
    // Atualização da posição dos nós e arestas durante a simulação
    simulation.on("tick", () => {
        link
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => {
            // Ajusta a posição x2 para que a seta pare antes de tocar o nó de destino
            const dx = d.target.x - d.source.x;
            const dy = d.target.y - d.source.y;
            const gamma = Math.atan2(dy, dx); // Ângulo entre os nós
            // Distância para subtrair do comprimento do link
            const distanceToSubtract = markerWidth + nodeSizeScale(linkCount[d.target.id] || 0);
            // Calcula a nova posição x2
            return d.target.x - Math.cos(gamma) * distanceToSubtract;
          })
          .attr("y2", d => {
            // Ajusta a posição y2 da mesma forma que a x2
            const dx = d.target.x - d.source.x;
            const dy = d.target.y - d.source.y;
            const gamma = Math.atan2(dy, dx); // Ângulo entre os nós
            const distanceToSubtract = markerWidth + nodeSizeScale(linkCount[d.target.id] || 0);
            // Calcula a nova posição y2
            return d.target.y - Math.sin(gamma) * distanceToSubtract;
          });
    
        node
          .attr("cx", d => d.x)
          .attr("cy", d => d.y);
          
        // Atualizando a posição dos rótulos dos nós
        nodeLabels
          .attr("x", d => d.x)
          .attr("y", d => d.y);
        nodeLabels.attr('visibility', visualParams.showNodeLabels ? 'visible' : 'hidden');
    
        // Atualizando a posição dos rótulos das arestas
        linkLabels
          .attr("x", d => (d.source.x + d.target.x) / 2)
          .attr("y", d => (d.source.y + d.target.y) / 2);
        linkLabels.attr('visibility', visualParams.showLinkLabels ? 'visible' : 'hidden');
    });
  }, [nodes, links, width, height, visualParams]);

  return (
    <svg ref={svgRef} width={width} height={height}></svg>
  );
};

export default Graph;
