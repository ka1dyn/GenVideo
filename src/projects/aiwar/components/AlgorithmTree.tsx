import React from 'react';

interface Props {
  progress: number;
  color?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
}

// @gallery: <AlgorithmTree progress={1} color="#99B898" width={400} height={300} strokeWidth={2} />
export const AlgorithmTree: React.FC<Props> = ({ 
  progress, 
  color = '#99B898', 
  width = 400, 
  height = 300, 
  strokeWidth = 2 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  const drawBranch = (x1: number, y1: number, x2: number, y2: number, index: number, delayRatio: number) => {
    // Delay animation based on depth/ratio
    const branchP = Math.max(0, Math.min(1, (p - delayRatio) * 2));
    const len = Math.hypot(x2 - x1, y2 - y1);
    return (
      <line 
        key={index} x1={x1} y1={y1} x2={x2} y2={y2} 
        stroke={color} strokeWidth={strokeWidth} 
        strokeDasharray={len} strokeDashoffset={len * (1 - branchP)} 
      />
    );
  };

  const branches = [];
  let index = 0;
  
  // Starting point left
  const startX = 40;
  const startY = height / 2;
  
  // depth 1
  branches.push(drawBranch(startX, startY, 120, height/2 - 60, index++, 0));
  branches.push(drawBranch(startX, startY, 120, height/2 + 60, index++, 0));
  
  // depth 2
  branches.push(drawBranch(120, height/2 - 60, 200, height/2 - 100, index++, 0.15));
  branches.push(drawBranch(120, height/2 - 60, 200, height/2 - 20, index++, 0.15));
  branches.push(drawBranch(120, height/2 + 60, 200, height/2 + 20, index++, 0.15));
  branches.push(drawBranch(120, height/2 + 60, 200, height/2 + 100, index++, 0.15));
  
  // depth 3 (all converge to one point on the right)
  const endX = 320;
  const endY = height / 2;
  branches.push(drawBranch(200, height/2 - 100, endX, endY, index++, 0.3));
  branches.push(drawBranch(200, height/2 - 20, endX, endY, index++, 0.3));
  branches.push(drawBranch(200, height/2 + 20, endX, endY, index++, 0.3));
  branches.push(drawBranch(200, height/2 + 100, endX, endY, index++, 0.3));

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {branches}
      {p > 0.8 && <circle cx={endX} cy={endY} r={5} fill="#E84A5F" opacity={(p-0.8)*5} />}
    </svg>
  );
};
