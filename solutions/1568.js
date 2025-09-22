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

            // Retorne 1 se ao mudar um pedaço de terra para água, ocasiona a falta de conexão da ilha. 
            if (countSCCIslands(grid) !== 1) {
            grid[r][c] = 1;
            return 1;
            }
            grid[r][c] = 1; 
        }
        }
    }

    // Caso contrário, retorne 2;
    return 2;
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

    // adcionar aresta dirigira
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

// DFS para coletar os vértices de um componente fortemente conexo 
const dfsCollect = (v, visited, graph, component) => {
    visited[v] = true;
    component.push(v);

    for (let u of graph.adj[v]) {
        if (!visited[u]) {
        dfsCollect(u, visited, graph, component);
        }
    }
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
    for (let i = order.length - 1; i >= 0; i--) {
        let v = order[i];
        if (!visited[v]) {
        let component = [];
        dfsCollect(v, visited, gr, component);
        sccs.push(component);
        }
    }

    return { sccs, pre, pos };
}

// Função que conta SCCs que têm células de terra (1)
const countSCCIslands = (grid) => {
    const rows = grid.length, cols = grid[0].length;
    const V = rows * cols;
    const graph = new Graph(V);

    const id = (r, c) => r * cols + c;
    const dirs = [[1,0],[-1,0],[0,1],[0,-1]];

    // construção do grafo
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
        if (grid[r][c] === 1) {
            for (let [dr, dc] of dirs) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1) {
                graph.addEdge(id(r, c), id(nr, nc));
            }
            }
        }
        }
    }

    const { sccs } = SCC(graph);
    let count = 0;

    // conta apenas SCCs que têm pelo menos 1 célula de terra
  
    for (let comp of sccs) {
        if (comp.some(v => grid[Math.floor(v / cols)][v % cols] === 1)) {
        count++;
        }
    }

    return count;
}