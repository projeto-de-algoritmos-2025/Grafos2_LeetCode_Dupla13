/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} distanceThreshold
 * @return {number}
 */
let findTheCity = (n, edges, distanceThreshold) => {   

};

// estrutura do grafo
class Graph {

    // constructor
    constructor(V) {
        this.V = V;
        this.adj = Array.from({ length: V }, () => []);
    }

    // adicionar aresta dirigida
    addEdge(v, w) {
        this.adj[v].push(w);
        this.adj[w].push(v);
    }
}

// Algoritmo de Djikstra com heap
let dijkstra = () => {
    /*Maintain a set of explored nodes S for which we have determined
    the shortest path distance d(u) from s to u.
    Initialize S = { s }, d(s) = 0.
    Repeatedly choose unexplored node v which minimizes
    add v to S, and set d(v) = (v).*/
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

// Verificar se a fila estiver vazia 
let PQempty = () => {
    return n === 0;
}

// Mudança de índice na fila
let exch = (i, j) => {
    [pq[i], pq[j]] = [pq[j], pq[i]];
}

// Insere na fila
let PQinsert = (v, dist) => {
    pq[++n] = v;
    fixUp(n, dist);
}

// Heapify
let PQdelmin = (dist) => {
    exch(1, n);
    fixDown(1, n - 1, dist);
    return pq[n--];
}

// Shift-up
let fixUp = (k, dist) => {
    while (k > 1 && dist[pq[Math.floor(k / 2)]] > dist[pq[k]]) {
        exch(k, Math.floor(k / 2));
        k = Math.floor(k / 2);
    }
}

// Shift-down
let fixDown = (k, m, dist) => {
    while (2 * k <= m) {
        let j = 2 * k;
        if (j < m && dist[pq[j]] > dist[pq[j + 1]]) j++;
        if (dist[pq[k]] > dist[pq[j]]) break;
        exch(k, j);
        k = j;
    }
}

