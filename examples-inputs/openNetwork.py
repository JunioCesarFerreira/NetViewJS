import networkx as nx
import json

G = nx.Graph()

filename = "celegansneural"

with open(filename, 'r') as file:
    for line in file:
        if not line.startswith("%"):
            source, target, capacity = line.split()
            source = int(source)
            target = int(target)
            capacity = int(capacity)
            G.add_edge(source, target, capacity=capacity)
            
# Converte Rede Complexa para o formato JSON utilizado no graph-view.
data = {
    "nodes": [{"id": n, "label": n} for n in G.nodes],
    "links": [{"source": u, "target": v, "weight": w['capacity']} for u, v, w in G.edges(data=True)]
}

with open(filename + ".json", "w") as json_file:
    json.dump(data, json_file)