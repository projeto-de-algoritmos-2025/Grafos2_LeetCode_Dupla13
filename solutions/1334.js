let findTheCity = (n, edges, distanceThreshold) => {

    // Montagem do grafo
    let graph = new Graph(n);
    for (let [u, v, w] of edges) {
        graph.addEdge(u, v, w);
    }

    // Inicialização de elementos no grafo
    let resultCity = -1;
    let minReachable = Infinity;

    // Percurso do Dijkstra em cada cidade
    for (let i = 0; i < n; i++) {
        let dist = dijkstra(graph, i);

        // Contar quantas cidades são alcançáveis
        let reachable = 0;
        for (let j = 0; j < n; j++) {
            if (i !== j && dist[j] <= distanceThreshold) {
                reachable++;
            }
        }

        // Escolher cidade segundo as regras
        if (reachable <= minReachable) {
            minReachable = reachable;
            resultCity = i; 
        }
    }

    return resultCity;
};

// estrutura do grafo
class Graph {

    // constructor
    constructor(V) {
        this.V = V;
        this.adj = Array.from({ length: V }, () => []);
    }

    // adicionar aresta não-dirigida
    addEdge(v, w, peso) {
        this.adj[v].push([w, peso]);
        this.adj[w].push([v, peso]); 
    }
}

// Algoritmo de Djikstra com heap
let dijkstra = (graph, s) => {

    // Declaração e atribuição de valores
    const V = graph.V;
    const dist = Array(V).fill(Infinity);
    const visited = Array(V).fill(false);

    dist[s] = 0;
    PQinit(V);
    PQinsert(s, dist);

    while (!PQempty()) {

        let u = PQdelmin(dist);

        if (visited[u]) {
            continue;
        } 
        visited[u] = true;

        // Relaxa as arestas de u
        for (let [v, w] of graph.adj[u]) {
            if (dist[v] > dist[u] + w) {
                dist[v] = dist[u] + w;
                PQinsert(v, dist); 
            }
        }
    }

    return dist;
}

// Operações da fila de prioridades 

// Variáveis globais da seção
let pq = [];
let n = 0;

// Inicialização
let PQinit = (maxN) => {
    pq = new Array(maxN + 1);
    n = 0;
}

// Tá vazio?
let PQempty = () => {
    return n === 0;
}

// Troca de posições
let exch = (i, j) => {
    [pq[i], pq[j]] = [pq[j], pq[i]];
}

// Inserção 
let PQinsert = (v, dist) => {
    pq[++n] = v;
    shiftUp(n, dist);
}

// Remoção 
let PQdelmin = (dist) => {
    exch(1, n);
    heapify(1, n - 1, dist);
    return pq[n--];
}

// Shift-up 
let shiftUp = (k, dist) => {
    while (k > 1 && dist[pq[Math.floor(k / 2)]] > dist[pq[k]]) {
        exch(k, Math.floor(k / 2));
        k = Math.floor(k / 2);
    }
}

// Heapify 
let heapify = (k, m, dist) => {
    while (2 * k <= m) {
        let j = 2 * k;
        if (j < m && dist[pq[j]] > dist[pq[j + 1]]) j++;
        if (dist[pq[k]] <= dist[pq[j]]) break;
        exch(k, j);
        k = j;
    }
}