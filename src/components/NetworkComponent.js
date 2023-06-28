import React, {useEffect, useRef, useState} from 'react';
import {Network} from 'vis-network/standalone';
import {DataSet} from 'vis-data/standalone';

import 'vis-network/styles/vis-network.css';
import {Modal} from "antd";
import yaml from 'js-yaml';

const MyNetworkComponent = ({_nodes, _edges, options, allStates}) => {
    const networkContainer = useRef(null);
    let network = null;

    const [modalVisible, setModalVisible] = useState(false);
    const [clickedNodeLabel, setClickedNodeLabel] = useState('');
    const [yamlData, setYamlData] = useState('');


    const handleDoubleClick = (params) => {
        if (params.nodes.length > 0) {
            const nodeId = params.nodes[0];
            const node = network.body.data.nodes.get(nodeId);
            setClickedNodeLabel(node.label);
            const convertedYaml = yaml.dump(allStates[node.label]);
            setYamlData(convertedYaml);
            setModalVisible(true);
        }
    };

    const handleModalClose = () => {
        setModalVisible(false);
        setClickedNodeLabel('')
    };


    useEffect(() => {
        // Create the nodes and edges for your network visualization
        const nodes = new DataSet(_nodes);

        const edges = new DataSet(_edges);


        // Create the network
        network = new Network(networkContainer.current, {nodes, edges}, options);
        network.on('doubleClick', handleDoubleClick);

        // Clean up the network when the component unmounts
        return () => {
            if (network !== null) {
                network.off('doubleClick', handleDoubleClick);
                network.destroy();
                network = null;
            }
        };
    }, [_nodes, options]);

    return <>
        <Modal visible={modalVisible} onCancel={handleModalClose} width={600}>
            <pre style={{backgroundColor: 'lavender'}}>{clickedNodeLabel}</pre>
            <pre>
                {
                    yamlData.split('\n').map((line, index) => (
                        <div key={index} style={line.includes('component:') ? {backgroundColor: 'yellow'} : {}}>
                            {line}
                        </div>))
                }
            </pre>
        </Modal>
        <div ref={networkContainer} style={{height: "85vh"}}/>
    </>
};

export default MyNetworkComponent;
