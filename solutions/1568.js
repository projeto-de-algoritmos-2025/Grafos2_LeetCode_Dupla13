let minDays = (grid) => {

    // Declaração de variáveis
    const rows = grid.length;
    const cols = grid[0].length;

    // Retorne 0 se o grid estiver desconectado no primeiro momento.
    if (countSCCIslands(grid) !== 1) return 0;

    // Percorrer o laço para remover cada célula de terra (1)
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
        if (grid[r][c] === 1) {
            grid[r][c] = 0; 

    
};

// variáveis globais
let time;       
let pre, pos;  

// estrutura do grafo
class Graph {

    // constructor
    constructor(V) {
        this.V = V;
        this.adj = Array.from({ length: V }, () => []);
    }

    // adcionar aresta dirigida
    addEdge(v, w) {
        this.adj[v].push(w);
    }

    // cria cópia do grafo e reverta as arestas
    getReverse() {
        const g = new Graph(this.V);
        for (let v = 0; v < this.V; v++) {
            for (let u of this.adj[v]) {
                g.addEdge(u, v);
            }
        }
        return g;
    }
}

// Função da numeração da DFS
const dfsNumbering = (v, visited, graph, order) => {
    visited[v] = true;
    pre[v] = time++;  

    for (let u of graph.adj[v]) {
        if (!visited[u]) {
        dfsNumbering(u, visited, graph, order);
        }
    }

    pos[v] = time++;  
    order.push(v);     
}

// Algoritmo para buscar SCCs 
const SCC = (graph) => {
    const V = graph.V;
    let visited = Array(V).fill(false);
    let order = [];
    time = 0;
    pre = Array(V).fill(-1);
    pos = Array(V).fill(-1);

    // 1ª DFS: coleta ordem + pre/pos
    for (let v = 0; v < V; v++) {
        if (!visited[v]) {
        dfsNumbering(v, visited, graph, order);
        }
    }

    // Reverta o grafo
    const gr = graph.getReverse();

    // 2ª DFS: usa ordem reversa de pos[v]
    visited.fill(false);
    let sccs = [];
    
}

// Contar as células de terra

    
}