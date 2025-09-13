import { useCallback, useState } from 'react'
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Controls, Background } from "@xyflow/react"
import "@xyflow/react/dist/style.css"

const initailNodes = [
  { 
    id: 'n1', 
    position: { x: 0, y: 0 },
    data: { label: "Node1" },
    type: "input"
  },
  {
    id: "n2",
    position: { x: 0, y: 100 },
    data: { label: 'Node2' },
  },
];


const initialEdges = [
  { 
    id: "n1-n2", 
    source: "n1", 
    target:"n2", 
    label: "Connects With",
    type: "step"
  }];

function App() {
  const [nodes,setNodes] = useState(initailNodes);
  const [edges,setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((edgeSnapshots) => applyEdgeChanges(changes,edgeSnapshots)),
  )

  const onConnect = useCallback(
    (params) => setEdges((edgeSnapshots) => addEdge(params,edgeSnapshots)),
  )


  return (
    <>
    <div style={{ width: "100vw", height: "100vh"}}>
     <ReactFlow
     nodes={nodes}
     edges={edges}
     onNodesChange = {onNodesChange}
     onEdgesChange={onEdgesChange}
     onConnect={onConnect}
     fitView
     >
     <Controls/>
     <Background/>
     </ReactFlow>
    </div>
     
    </>
  )
}

export default App
