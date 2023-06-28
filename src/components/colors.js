import React from 'react';
import {Menu, Select} from "antd";


const Colors = ({nodes, setNodes}) => {

    function updateNodesGroup(idsToUpdate, newGroup) {
        const updatedNodes = nodes.map(node => {
            if (idsToUpdate.includes(node.id)) {
                return {
                    ...node,
                    group: newGroup
                };
            }
            return node;
        });

        // If you want to update the 'allStates' array in-place, you can use the following line instead:
        // allStates = updatedStates;

        setNodes(updatedNodes);
    }

    function resetGroupById(id) {
        const updatedNodes = nodes.map(node => {
            if (node.id === id) {
                return {
                    ...node,
                    group: 0
                };
            }
            return node;
        });

        setNodes(updatedNodes);
    }

    const items = [
        {
            label: "Colors",
            key: 'colors-key',
            children: [
                {
                    label: <Select
                        mode="multiple"
                        allowClear
                        style={{
                            width: '100%',
                        }}
                        placeholder="Color 1"
                        maxTagCount="responsive"
                        defaultValue={[]}
                        onDeselect={(value) => {
                            resetGroupById(value)
                        }}
                        onChange={(value) => {
                            updateNodesGroup(value, 1)
                        }}
                        options={nodes.filter(state => state.group === 0 || state.group === 1).map(obj => {
                            return {value: obj.id, label: obj.label}
                        })}
                    />,
                    key: "color-01"
                },
                {
                    label: <Select
                        mode="multiple"
                        maxTagCount="responsive"
                        allowClear
                        style={{width: '100%'}}
                        placeholder="Color 2"
                        defaultValue={[]}
                        onChange={(value) => {
                            updateNodesGroup(value, 2)
                        }}
                        onDeselect={(value) => {
                            resetGroupById(value)
                        }}
                        options={nodes.filter(state => state.group === 0 || state.group === 2).map(obj => {
                            return {value: obj.id, label: obj.label}
                        })}
                    />,
                    key: "color-02"
                },
                {
                    label: <Select
                        mode="multiple"
                        maxTagCount="responsive"

                        allowClear
                        style={{
                            width: '100%',
                        }}
                        defaultValue={[]}
                        placeholder="Color 3"
                        onDeselect={(value) => {
                            resetGroupById(value)
                        }}
                        onChange={(value) => {
                            updateNodesGroup(value, 3)
                        }}
                        options={nodes.filter(state => state.group === 0 || state.group === 3).map(obj => {
                            return {value: obj.id, label: obj.label}
                        })}
                    />,
                    key: "color-03"
                }
            ],
            type: "group"
        },
    ];


    return (
        <Menu
            items={items}
        />
    );
};

export default Colors;
