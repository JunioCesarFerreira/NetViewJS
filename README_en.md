# NetViewJS

🌍 *[Portuguese](README.md) ∙ [**English**](README_en.md)*

**NetViewJS** is a React application for graph visualization from JSON files.

![NetViewJS Screenshot](./images/print.png)

[**Available on Github.IO**](https://juniocesarferreira.github.io/NetViewJS/)

## Features

- Load and visualize graphs from JSON files.
- Interactive using the d3 library.
- Accepts the following input format:

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

## Installation

1. Clone the repository:

```
git clone [https://github.com/JunioCesarFerreira/NetViewJS]
```

2. Navigate to the project folder and install the dependencies:

```
cd NetViewJS/graph-view
npm install
```

3. Run the application:

```
npm start
```

The application will be available at `http://localhost:3000`.

## Usage

1. Open the application in your browser.
2. Click the load file button and select the JSON file with the graph structure.
3. Visualize the loaded graph in the interface.

![NetViewJS Screenshot](./images/print.gif)

## Using the Dockerfile

You can also use Docker to build and run the application. Follow the steps below:

1. Build the Docker image:

```
docker build -t netviewjs .
```

2. Run the Docker container:

```
docker run -p 80:80 netviewjs
```

The application will be available at `http://localhost`.

## Contributions

Contributions are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.