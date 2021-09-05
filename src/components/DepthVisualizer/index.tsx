import React, { FunctionComponent } from 'react';
import { OrderType } from "../OrderBook";
import { MOBILE_WIDTH } from "../../constants";

interface DepthVisualizerProps {
  depth: number;
  orderType: OrderType;
  windowWidth: number;
}

const DepthVisualizerColors = {
  BIDS: "#113534",
  ASKS: "#3d1e28"
};

const DepthVisualizer: FunctionComponent<DepthVisualizerProps> = ({windowWidth, depth, orderType }) => {
  return <div data-testid="depth-visualizer" style={{
    backgroundColor: `${orderType === OrderType.BIDS ? DepthVisualizerColors.BIDS : DepthVisualizerColors.ASKS}`,
    height: "1.250em",
    width: `${depth}%`,
    position: "relative",
    top: 21,
    left: `${orderType === OrderType.BIDS && windowWidth > MOBILE_WIDTH ? `${100 - depth}%` : 0}`,
    marginTop: -24,
    zIndex: 1,
  }} />;
};

export default DepthVisualizer;