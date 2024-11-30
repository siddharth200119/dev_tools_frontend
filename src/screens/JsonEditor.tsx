import React, { useEffect, useState } from 'react';
import JsonTextArea from '../components/JsonTextArea';
import Button from '../components/Button';
import JsonVisualize from '../components/JsonVisualize.';

const JsonEditor: React.FC = () => {
    const [json, setJson] = useState<string>('');
    const [formattedJson, setFormattedJson] = useState<string>('');
    const [error, setError] = useState('');
    type Action = "preetify" | "visualize";
    const [currentAction, setAction] = useState<Action>("preetify");

    const formatJson = () => {
        try {
            const parsed = JSON.parse(json);
            setFormattedJson(JSON.stringify(parsed, null, 4));
            setError('');
        } catch (e) {
            if (json !== '') {
                setError(`Invalid JSON: ${e}`);
            } else {
                setError('');
            }
        }
    };

    useEffect(() => {
        formatJson();
    }, [json]);

    const renderActionComponent = () => {
        switch (currentAction) {
            case "preetify":
                return (
                    <JsonTextArea
                        json={formattedJson}
                        setJson={() => { }}
                        readOnly={true}
                    />
                );
            case "visualize":
                return(
                    <JsonVisualize json={json}/>
                )
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col grow max-w-full min-h-full py-5 px-10">
            <div className="mb-5 flex flex-row">
                <Button
                    text="Preety Print"
                    onClick={() => setAction("preetify")}
                    styles={{ size: "base", rounded: "lg", theme: "normal", hover: true, spacing: "mr-4" }}
                />
                <Button text='Visualize' onClick={() => setAction("visualize")} styles={{ size: "base", rounded: "lg", theme: "normal", hover: true, spacing: "mr-4" }} />
            </div>
            <div className="min-w-full max-w-full flex flex-col lg:flex-row grow lg:max-h-[37rem]">
                <div className="grow flex w-full lg:w-1/2 lg:max-w-[50%] lg:max-h-full max-h-96 overflow-auto">
                    <JsonTextArea json={json} setJson={setJson} readOnly={false} />
                </div>
                <div className="min-h-4 lg:min-w-4"></div>
                <div className="grow flex w-full lg:w-1/2 lg:max-w-[50%] lg:max-h-full max-h-96 overflow-auto">
                    {renderActionComponent()}
                </div>
            </div>
            <div>{error}</div>
        </div>
    );
};

export default JsonEditor;
