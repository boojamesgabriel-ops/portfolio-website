export type GraphNode = {
    id: string;
    label: string;
    type: "person" | "skill" | "project" | "tool";
    position: [number, number, number];
};

export type GraphLink = {
    source: string;
    target: string;
};

export const graphNodes: GraphNode[] = [
    {id: "james", label: "James Gabriel", type: "person", position: [0, 0, 0] },
    {id: "next", label: "Next.js", type: "skill", position: [-2, 1, 0] },
    {id: "r3f", label: "React Three Fiber", type: "skill", position: [2, 1, -1] },
    {id: "ai", label: "OpenAI API", type: "tool", position: [1, -1.5, 1] },
    {id: "portfolio", label: "Portfolio", type: "project", position: [-1.5, -1, -1] }, 
];

export const graphLinks: GraphLink[] = [
    { source: "james", target: "next" },
    { source: "james", target: "r3f" },
    { source: "james", target: "ai" },
    { source: "james", target: "portfolio" },
    { source: "portfolio", target: "next" },
    { source: "portfolio", target: "r3f" },
]