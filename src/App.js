import React, {useRef, useState} from "react";
import {Button, Col, Divider, Layout, Menu, Popover, Row, theme, Typography} from "antd";
import 'vis-network/styles/vis-network.css';
import Colors from "./components/colors";
import {BankOutlined, GithubOutlined, SettingOutlined} from "@ant-design/icons";
import SetterComponent from "./components/setterComponent";
import MyNetworkComponent from "./components/NetworkComponent";
import ConfigurationPanel from "./components/ConfigurationPanel";
import TermsAndConditionsModal from "./components/TermsAndConditionsModal";
import TourComponent from "./components/TourComponent";

const {Header, Content, Footer, Sider} = Layout;
const App = () => {
    const { Text } = Typography;

    const {
        token: {colorBgContainer},
    } = theme.useToken();
    const [allStates, setAllStates] = useState({});
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [termsModalVisible, setTermsModalVisible] = useState(false);

    const [options, setOptions] = useState({
        physics : false,
        layout: {
            hierarchical:  false
        },
        nodes: {
            shape: "dot",
            size: 20,
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
    });

    const ref_upload = useRef(null);
    const ref_init_state = useRef(null);
    const ref_black_list = useRef(null);
    const ref_colors = useRef(null);

    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }



    const items = [
        getItem(
            <a href="https://occamonics.com/" target="_blank" rel="noopener noreferrer">
                Occamonics
            </a>,
            'link-01',
            <BankOutlined/>,
        ),
        {
            type: 'divider',
        }, getItem(
            <a href="https://github.com/Occamonics/oda-yaml-visualiser" target="_blank" rel="noopener noreferrer">
                Source code
            </a>,
            'link-02',
            <GithubOutlined/>,
        ),
        {
            type: 'divider',
        },

    ];
    return (

        <Layout style={{background: colorBgContainer}} >
            <TermsAndConditionsModal setTermsModalVisible={setTermsModalVisible} termsModalVisible={termsModalVisible}/>
            <Sider theme={'light'} collapsible={false} collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <Menu items={items}  />
                <SetterComponent  setNodes={setNodes} setEdges={setEdges} allStates={allStates} setAllStates={setAllStates} ref_upload={ref_upload} ref_init_state={ref_init_state} ref_black_list={ref_black_list}/>
                <Colors nodes={nodes} setNodes={setNodes}/>
            </Sider>
            <Layout style={{background: colorBgContainer}}>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Row gutter={16}>
                        <Col span={8}>
                            {/* Content for the first column */}
                        </Col>
                        <Col span={8}>
                            <TourComponent ref_upload={ref_upload} ref_init_state={ref_init_state} ref_black_list={ref_black_list} ref_colors={ref_colors}/>
                        </Col>
                        <Col span={8}>
                            <Row justify="end">
                                <Col>
                                </Col>
                                <Col>
                                    <Popover placement="topRight" content={<ConfigurationPanel setOptions={setOptions}/>} trigger="click" justify="end">
                                        <Button icon={<SettingOutlined />} type={"primary"}/>
                                    </Popover>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                </Header>
                <Content>
                    <MyNetworkComponent _nodes={nodes} _edges={edges} options={options} allStates={allStates}/>
                </Content>
                <Footer style={{textAlign: 'center', background: colorBgContainer, position: 'absolute', bottom: 0, width:"80%" }} >
                    Occamonics ©2023 Created by <a
                    href="https://www.linkedin.com/in/ali-sbiaa/" target="_blank" rel="linked-dev"> Ali Sbiaa </a>
                    <Divider/>
                    <Text keyboard onClick={() => {
                        setTermsModalVisible(true)
                    }} style={{cursor:"pointer"}}> Terms and Conditions</Text>
                </Footer>
            </Layout>
        </Layout>
    );

}

export default App;
