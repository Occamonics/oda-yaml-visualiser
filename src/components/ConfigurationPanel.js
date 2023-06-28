import React, {useEffect, useState} from 'react';
import {Slider, Space, Switch, Tooltip} from "antd";
import {Modal} from 'antd';

const ConfigurationPanel = ({setOptions}) => {
    const [direction, setDirection] = useState(false);
    const [physics, setPhysics] = useState(false);
    const [nodesSize, setNodesSize] = useState(20);


    useEffect(() => {
        setOptions({
            physics,
            // layout: direction ? {hierarchical: {direction: 'LR'}} : null,
            layout: {
                hierarchical: direction ? {direction: 'LR'} : false
            },
            nodes: {
                shape: "dot",
                size: nodesSize,
                font: {
                    color: "#000",
                },
                borderWidth: 2,
            },
            edges: {
                arrows: {
                    to: {enabled: true, scaleFactor: 1},
                },
            },
        })
    }, [direction, physics, nodesSize]);

    return (
        <Space direction="vertical">
            <Tooltip title="The layout engine positions the nodes in a hierarchical fashion">
                <Switch
                    checked={direction}
                    checkedChildren="Hierarchical"
                    unCheckedChildren="Maze"
                    onChange={() => {
                        setDirection(!direction);
                    }}
                />
            </Tooltip>
            <Tooltip title="The simulation moving the nodes and edges to their final positions, also governs stabilization">
                <Switch
                    checked={physics}
                    checkedChildren="Motion"
                    unCheckedChildren="Static"
                    onChange={() => {
                        setPhysics(!physics);
                    }}
                />
            </Tooltip>

            <Tooltip title="The size of the nodes">
                <Slider
                    min={10}
                    max={50}
                    onChange={newValue => {
                        setNodesSize(newValue);
                    }}
                    value={typeof nodesSize === 'number' ? nodesSize : 20}
                />
            </Tooltip>

        </Space>
    );
};

export default ConfigurationPanel;
