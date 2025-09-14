import { addEdge, applyEdgeChanges, applyNodeChanges, Background, Controls, ReactFlow, type Connection, type Edge, type EdgeChange, type Node, type NodeChange } from "@xyflow/react";
import { useCallback, useState } from "react";
 import '@xyflow/react/dist/style.css'
import { nodeTypes } from "./components/CustomNode";


export default function App() {


const initialNodes: Node[] = [
  {
    id: "1",
    type: "custom",
    position: { x: 100, y: 100 },
    data: { label: "Node 1", value: "", onChange: handleInputChange },
  },
  {
    id: "2",
    type: "custom",
    position: { x: 300, y: 100 },
    data: { label: "Node 2",  value: "", onChange: handleInputChange  },
  },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
];

  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  function handleInputChange(id: string, value: string) {
   setNodes((nds) => 
    nds.map((n) =>
    n.id === id ? { ...n, data: { ...n.data, value, onChange: handleInputChange }} : n
    )
  );
  }

  const addNode = () => {
    const id = (nodes.length + 1).toString();
    const newNode: Node = {
      id,
      type: "custom",
      position: { x: 100 + nodes.length * 120, y: 200 },
      data: { label: `Node ${id}`, value: "", onChange: handleInputChange }
    }
    setNodes((nds) => [...nds, newNode]);
  }

  const saveWorkflow = () => {
    const workflow = { nodes, edges } ;
    localStorage.setItem("workflow", JSON.stringify(workflow));
    alert("Workflow Saved")
  }

  const loadWorkflow = () => {
  const saved = localStorage.getItem("workflow");
  if(saved) {
    const parsed = JSON.parse(saved);

    const restoredNodes = parsed.nodes.map((n:Node) => ({
      ...n,
      data: { ...n.data, onChange: handleInputChange}
    }));

    setNodes(restoredNodes);
    setEdges(parsed.edges || []);

    alert("Workflow loaded");
  } else {
    alert("No workflow found")
  }
  }

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)), []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)), []
  );

  const onConnect = useCallback(
    (connection: Edge | Connection) => setEdges((eds) => addEdge(connection, eds)), []
  )

  return (
      <div style={{ width: "100vw", height: "100vh" }}>
      <div style={{ position: "absolute", top: 10, left: 10, zIndex: 10 }}>
        <button onClick={addNode} style={{ marginRight: 8 }}>
          ➕ Add Node
        </button>
        <button onClick={saveWorkflow} style={{ marginRight: 8 }}>
          💾 Save Workflow
        </button>
        <button onClick={loadWorkflow}>
          📥 Load Workflow
        </button>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView>
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  )
}