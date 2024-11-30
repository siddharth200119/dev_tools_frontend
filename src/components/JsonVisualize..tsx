import React, { useEffect, useState } from "react";
import { ArcherContainer, ArcherElement } from 'react-archer';

type JsonVisualizeProps = {
    json: string;
};

type Node = {
    id: string;
    targets: string[];
    content?: React.ReactNode;
    level: number
    mid_level?: boolean
};

const JsonVisualize: React.FC<JsonVisualizeProps> = ({ json }) => {
    const [groupedNodes, setGroupedNodes] = useState<Record<number, Node[]>>([]);
    function processData() {
        try {
            const parsed = JSON.parse(json);
            let nodes:Node[] = [];
            processNodes(parsed, nodes, null, 0);
            let grouped_nodes:Record<number, Node[]> = groupNodesByLevel(nodes);
            processNodes(parsed, nodes, null, 0);
            setGroupedNodes(grouped_nodes);

        } catch (e) { }
    }

    function processNodes(json: Record<string, any> | any[] | any, nodes: Node[], prevNode: Node | null, level: number) {
        let nodeId = `${Date.now()}-${Math.random()}`;
        const node: Node = { id: nodeId, targets: [], content: "", level }
        if (prevNode !== null) {
            prevNode.targets.push(node.id);
        } else {
            node.id = "Root"
        }
        nodes.push(node);
        if (Array.isArray(json)) {
            for(const index in json){
                processNodes(json[index], nodes, node, level+1)
            }
        } else if (typeof json === "object") {
            let content = "";
            for (const key in json) {
                if (typeof json[key] === "object") {
                    if (prevNode !== null) {
                        const nodeId = `${Date.now()}-${Math.random()}`;
                        prevNode.targets.push(nodeId);
                        const mid_node: Node = { id: nodeId, targets: [], content: <div>{key}</div>, level: level, mid_level: true }
                        nodes.push(mid_node)
                        processNodes(json[key], nodes, mid_node, level + 1);
                    } else {
                        node.content += `${key} \n`
                        processNodes(json[key], nodes, node, level + 1);
                    }
                } else {
                    content += `${key}: ${json[key]} \n`;
                    node.content = <div>{content}</div>
                }
            }
        }else{
            node.content = <div>{json}</div>
        }
    }

    useEffect(() => {
        processData();
    }, [json]);

    const groupNodesByLevel = (nodes: Node[]) => {
        return nodes.reduce((groups: Record<number, Node[]>, node) => {
            groups[node.level] = groups[node.level] || [];
            if(node.content !== undefined && node.content !== null && typeof node.content === "object"){
                console.log(typeof node.content)
                groups[node.level].push(node);
            }
            return groups;
        }, {});
    };
    return (
        <div className="flex items-start justify-start w-full h-full">
            <ArcherContainer strokeColor="red">
                {Object.keys(groupedNodes).map((level) => (
                    <>
                        <div
                            key={level}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            {groupedNodes[Number(level)].map((node) => (
                                <ArcherElement
                                    key={node.id}
                                    id={node.id}
                                    relations={node.targets.map((target) => ({
                                        targetId: target,
                                        targetAnchor: 'top',
                                        sourceAnchor: 'bottom',
                                        style: {},
                                    }))}
                                >
                                    <div style={{ margin: '0 10px', padding: '10px', border: '1px solid black' }}>
                                        {node.content}
                                        {node.mid_level? "mid":""}
                                    </div>
                                </ArcherElement>
                            ))}
                        </div>
                        {groupedNodes[Number(level)].length !== 0? <div className="min-h-14"></div> : null}
                    </>
                ))}
            </ArcherContainer>
        </div>
    );
};

export default JsonVisualize;