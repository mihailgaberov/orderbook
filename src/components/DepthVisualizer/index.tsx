import React, { FunctionComponent } from 'react';

interface DepthVisualizerProps {
  depth: number;
  color: string;
}

const DepthVisualizer: FunctionComponent<DepthVisualizerProps> = ({ depth, color }) => {
  return <div style={{
    backgroundColor: `${color}`,
    height: "1.250em",
    width: `${depth}px`,
    position: "relative",
    top: 25,
    left: 0,
    zIndex: 1
  }}></div>;
};

export default DepthVisualizer;