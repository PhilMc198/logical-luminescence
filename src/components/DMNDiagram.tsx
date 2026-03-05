import React, { useState } from 'react';

interface NodeData {
  id: string;
  title: string;
  description: string;
  position: { x: number; y: number };
}

const nodes: NodeData[] = [
  {
    id: 'pcc',
    title: 'Posterior Cingulate Cortex',
    description: 'Integrates attention with memory and perception. In AI systems, this parallels the attention mechanism that weights different inputs based on context.',
    position: { x: 50, y: 50 }
  },
  {
    id: 'mpfc',
    title: 'Medial Prefrontal Cortex',
    description: 'Facilitates self-referential processing. Similar to how AI models maintain context about their task and parameters.',
    position: { x: 50, y: 20 }
  },
  {
    id: 'angular',
    title: 'Angular Gyrus',
    description: 'Connects perception and spatial cognition. This mirrors AI\'s ability to create semantic associations across different data modalities.',
    position: { x: 75, y: 35 }
  },
  {
    id: 'hippocampus',
    title: 'Hippocampus',
    description: 'Central to memory formation. Like how AI systems encode experiences into model weights during training.',
    position: { x: 25, y: 35 }
  }
];

export default function DMNDiagram() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const activeNodeData = nodes.find(n => n.id === activeNode);

  return (
    <div className="my-12 p-8 bg-cosmic-blue/60 backdrop-blur-sm border border-neutral-teal/20 rounded-2xl">
      <h3 className="text-2xl font-display font-semibold text-neural-teal mb-6 text-center">
        The Default Mode Network
      </h3>
      
      <div className="relative w-full h-96 mb-6">
        {/* SVG Canvas */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Connection lines */}
          <line x1="50" y1="50" x2="50" y2="20" stroke="#2dd4bf" strokeWidth="0.3" opacity="0.3" />
          <line x1="50" y1="50" x2="75" y2="35" stroke="#2dd4bf" strokeWidth="0.3" opacity="0.3" />
          <line x1="50" y1="50" x2="25" y2="35" stroke="#2dd4bf" strokeWidth="0.3" opacity="0.3" />
          
          {/* Nodes */}
          {nodes.map((node) => (
            <g key={node.id}>
              <circle
                cx={node.position.x}
                cy={node.position.y}
                r={activeNode === node.id ? "6" : "5"}
                fill={activeNode === node.id ? "#f59e0b" : "#1a2847"}
                stroke={activeNode === node.id ? "#fbbf24" : "#2dd4bf"}
                strokeWidth={activeNode === node.id ? "0.5" : "0.3"}
                className="cursor-pointer transition-all duration-300"
                onClick={() => setActiveNode(node.id)}
                style={{
                  filter: activeNode === node.id ? 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.6))' : 'none'
                }}
              />
              <text
                x={node.position.x}
                y={node.position.y - 8}
                textAnchor="middle"
                fill="#cbd5e1"
                fontSize="3"
                className="pointer-events-none select-none"
              >
                {node.id.toUpperCase()}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Info Panel */}
      <div className="min-h-32 p-6 bg-cosmic-deep/60 rounded-xl border border-neural-teal/20">
        {activeNodeData ? (
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-golden-glow">
              {activeNodeData.title}
            </h4>
            <p className="text-slate-300 leading-relaxed">
              {activeNodeData.description}
            </p>
          </div>
        ) : (
          <p className="text-slate-400 text-center py-8">
            Click on each region to learn more about its role in AI-human cognition parallels.
          </p>
        )}
      </div>
    </div>
  );
}