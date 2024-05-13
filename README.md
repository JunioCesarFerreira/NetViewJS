# NetViewJS

**NetViewJS** é uma aplicação React para visualização de grafos a partir de arquivos JSON.

![NetViewJS Screenshot](https://github.com/JunioCesarFerreira/NetViewJS/blob/main/images/print.png)

## Características

- Carregue e visualize grafos a partir de arquivos JSON.
- Interativo utilizando a biblioteca d3.
- Aceita o seguinte formato de entrada:

```JSON
{
    "nodes": [
        {"id": "1", "label": "A"},
        {"id": "2", "label": "B"},
        {"id": "3", "label": "C"}
    ],
    "links": [
        {"source": "1", "target": "2", "weight": 1},
        {"source": "2", "target": "3", "weight": 2}
    ]
}
```


## Instalação

1. Clone o repositório:

```
git clone [https://github.com/JunioCesarFerreira/NetViewJS]
```

2. Navegue até a pasta do projeto e instale as dependências:

```
cd NetViewJS
npm install
```

3. Execute a aplicação:

```
npm start
```

A aplicação ficará disponível no endereço `http://localhost:3000`.

## Uso

1. Abra a aplicação no navegador.
2. Clique no botão de carregar arquivo e selecione o arquivo JSON com a estrutura do grafo.
3. Visualize o grafo carregado na interface.

## Contribuições

Contribuições são bem-vindas!

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.
