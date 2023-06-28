import React, {useEffect, useState} from 'react';

import {Menu, Select} from 'antd';
import UploadYaml from "./uploadYaml";
import {getFilteredStates} from "../utils/utils";


const SetterComponent = ({setEdges, setNodes, allStates, setAllStates, ref_upload, ref_init_state, ref_black_list}) => {
    //  static

    // dynamic
    const [filteredStates, setFilteredStates] = useState({});

    const [initState, setInitState] = useState(null);
    const [blacklist, setBlackList] = useState([]);

    const handleChange = (value) => {
        setBlackList(value);
    };


    useEffect(() => {
        try {
            if (!initState) {
                setFilteredStates({});
            } else {
                setFilteredStates(getFilteredStates(initState, allStates, blacklist));
            }
        } catch (e) {
            setFilteredStates({});
            console.log(e);
        }
    }, [initState, blacklist, allStates]);

    useEffect(() => {
        let nodes = Object.keys(filteredStates).map((key, index) => {
            return {id: key, label: key, group: 0}; //+ " -- " + value.component}
        });
        let edges = Object.keys(filteredStates).map((key) => {
            // value.transitions
            const next_state = filteredStates[key]?.transitions?.next ?? null;
            const actions = filteredStates[key]?.transitions?.actions ?? null;
            let result = [];
            if (next_state) {
                result = [
                    {from: key, to: next_state, label: 'next'}
                ]
            }

            if (actions) {
                Object.entries(actions).forEach(([key_1, value_1]) => {
                    result.push({from: key, to: value_1, label: key_1})
                });
            }
            return result;
        }).flat();

        setNodes(nodes);
        setEdges(edges);
    }, [filteredStates]);


    const items = [
        {
            label: "Init",
            key: "init-key",
            type: "group",
            children: [
                {
                    key: "init-00",
                    label: <UploadYaml setAllStates={setAllStates} ref_upload={ref_upload}/>
                },

                {
                    key: "init-01",
                    label: <div ref={ref_init_state}>
                        <Select
                            showSearch
                            placeholder="Init state"
                            optionFilterProp="children"
                            style={{
                                width: '100%',
                            }}
                            onChange={(value) => {
                                setInitState(value);
                            }}
                            // onSearch={onSearch}
                            options={Object.keys(allStates).map(key => {
                                return {value: key, label: key}
                            })}

                        />
                    </div>
                },
                {
                    key: "init-02",
                    label:
                        <div ref={ref_black_list}>
                            <Select
                                mode="multiple"
                                maxTagCount="responsive"
                                allowClear
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Black list"
                                defaultValue={[]}
                                onChange={handleChange}
                                options={Object.keys(allStates).map((key, index) => {
                                    return {label: key, value: key};
                                })}
                            />
                        </div>
                }
            ]
        }
    ]

    return (
        <Menu

            items={items}
        />
    );
};

export default SetterComponent;
