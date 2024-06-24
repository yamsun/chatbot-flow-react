import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
} from 'reactflow';
import 'reactflow/dist/style.css';

import Sidebar from './Sidebar';
import CustomNode from './CustomNode'; // Import Custom Node Component
import './index.css';
import Topbar from './Topbar';
import SettingsPanel from './SettingsPanel';

const initialNodes = [
  {
    id: '1',
    type: 'message', // Specify the custom node type
    data: { label: 'Sample message' },
    position: { x: 250, y: 20 },
    sourcePosition: 'right',
    targetPosition: 'left',
  },
  {
    id: '2',
    type: 'message', // Specify the custom node type
    data: { label: 'Click to edit' },
    position: { x: 550, y: 120 },
    sourcePosition: 'right',
    targetPosition: 'left',
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2',  markerEnd: { type: 'arrowclosed', color:"#666" } },
];
const nodeTypes = { 'message': CustomNode };


const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);

  // Load from localStorage on component mount, but only if not already set
useEffect(() => {
  const savedNodes = JSON.parse(localStorage.getItem('reactFlowNodes'));
  const savedEdges = JSON.parse(localStorage.getItem('reactFlowEdges'));

  if (savedNodes && savedNodes.length > 0) {
    setNodes(savedNodes);
  } else {
    setNodes(initialNodes);
  }

  if (savedEdges && savedEdges.length > 0) {
    setEdges(savedEdges);
  } else {
    setEdges(initialEdges);
  }
}, [initialNodes, initialEdges]); // Add initialNodes and initialEdges to dependencies if they can change


   // Function to generate random ID
   const generateRandomId = () => `node_${Math.random().toString(36).substr(2, 9)}`;



  const onConnect = useCallback(
    (params) => {
      // Check if the source node already has an outgoing edge
      const sourceNodeId = params.source;
      const existingEdge = edges.find(
        (edge) => edge.source === sourceNodeId
      );

      if (existingEdge) {
        // Only allow one edge per source handle
        alert("There can only be one edge originating from a source handle")
        return;
      }

      // Allow the connection if there's no existing edge
      // setEdges((prevEdges) => addEdge(...params, prevEdges));
      setEdges((prevEdges) =>
        addEdge({ ...params, markerEnd: { type: 'arrowclosed', color: '#666' }, }, prevEdges)
      );
    },
    [edges, setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      const position = reactFlowInstance.project({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: generateRandomId(),
        type: 'message', // Specify the custom node type
        sourcePosition: 'right',
        targetPosition: 'left',
        position,
        data: { label: 'Your message here' },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes],
  );

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  const updateNodeLabel = (newLabel) => {
    if (selectedNode) {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === selectedNode.id
            ? {
                ...n,
                data: { ...n.data, label: newLabel },
              }
            : n
        )
      );
      setSelectedNode(null)
      setIsSettingsPanelOpen(false); 
    }
  };

  const handleSave = useCallback(() => {
    // Check if there are more than one nodes
    if (nodes.length > 1) {
      // Check if any node has empty target handles
      const nodesWithEmptyTargets = nodes.filter((node) =>
        edges.every((edge) => edge.source !== node.id)
      );

      if (nodesWithEmptyTargets.length > 1) {
        alert('Error: More than one node has empty target handles.');
        return;
      }

      // Perform save logic here if conditions are met
      console.log('Saving...');
        // Save nodes and edges to localStorage
      localStorage.setItem('reactFlowNodes', JSON.stringify(nodes));
      localStorage.setItem('reactFlowEdges', JSON.stringify(edges));
      alert('Your progress has been saved and will be automatically stored for you. It will be restored whenever you return.')
    } else {
      // Perform save logic if there's only one node
      console.log('Saving...');
        // Save nodes and edges to localStorage
      localStorage.setItem('reactFlowNodes', JSON.stringify(nodes));
      localStorage.setItem('reactFlowEdges', JSON.stringify(edges));
      alert('Your progress has been saved and will be automatically stored for you. It will be restored whenever you return.')

    }
  }, [nodes, edges]);

  return (
    <div className='screen'>
      <Topbar handleSave={handleSave}/>
      <div className="dndflow">
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes.map(node => ({
                ...node,
                data: {
                  ...node.data,
                  selected: node.id === selectedNode?.id,
                },
              }))}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onNodeClick={onNodeClick}
              nodeTypes={nodeTypes} // Register the custom node types
            >
              <Controls />
              <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
          </div>
          {(selectedNode|| isSettingsPanelOpen) 
            ? 
          <SettingsPanel selectedNode={selectedNode} updateNodeLabel={updateNodeLabel} setSelectedNode={setSelectedNode} setIsSettingsPanelOpen={setIsSettingsPanelOpen}/> 
            : 
          <Sidebar setIsSettingsPanelOpen={setIsSettingsPanelOpen}/>}
          {/* {selectedNode && (
            <div>
              <input
                type="text"
                value={selectedNode.data.label}
                onChange={(e) => updateNodeLabel(e.target.value)}
              />
            </div>
          )} */}
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default DnDFlow;
