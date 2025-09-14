import { Handle, Position } from "@xyflow/react";

type CustomNodeData = {
    label: string;
    value: string;
    onChange: (id: string, value: string) => void;
}

export function CustomNode({id,data}: {id:string,data: CustomNodeData}) {
    return (
        <div
        style={{ padding: 10, border: "1px solid #999", borderRadius: 5 , background: "#fff"}}
        >
        <strong>{data.label}</strong>
        <input 
        style={{ marginTop: 5, width: "100%"}}
        type="text"
        value={data.value}
        onChange={(e) => data.onChange(id,e.target.value)}
        />
        <Handle type="target" position={Position.Left}/>
        <Handle type="source" position={Position.Right}/>
        </div>
    )
}

export const nodeTypes = { custom: CustomNode }