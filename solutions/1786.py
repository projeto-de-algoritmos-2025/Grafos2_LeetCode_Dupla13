from heapq import *

class Solution(object):

    @staticmethod
    def adj(edges, n):
        graph = [[] for _ in range(n)]
        for u, v, w in edges:
            graph[u-1].append((v-1, w))
            graph[v-1].append((u-1, w))
        return graph

    @staticmethod
    def dijkstra(graph, n, dist):
        heap = [(0, n-1)]
        while heap:
            d, u = heappop(heap)
            if d != dist[u]:
                continue
            for v, w in graph[u]:
                if dist[v] > dist[u] + w:
                    dist[v] = dist[u] + w
                    heappush(heap, (dist[v], v))

    @staticmethod
    def dfs(graph, dist, index, memo, n):
        if index == n - 1:
            return 1
        if index in memo:
            return memo[index]

        res = 0
        for nei, _ in graph[index]:
            if dist[index] > dist[nei]:
                res = (res + Solution.dfs(graph, dist, nei, memo, n)) % (10**9 + 7)

        memo[index] = res
        return res

    def countRestrictedPaths(self, n, edges):
        graph = Solution.adj(edges, n)
        dist = [float("inf")] * n
        dist[n-1] = 0
        Solution.dijkstra(graph, n, dist)
        return Solution.dfs(graph, dist, 0, {}, n)
