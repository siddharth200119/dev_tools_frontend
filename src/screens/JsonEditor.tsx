import React, { useEffect, useState } from 'react';
import JsonTextArea from '../components/JsonTextArea';
import Button from '../components/Button';

const JsonEditor: React.FC = () => {
    const [json, setJson] = useState<string>('');
    const [formattedJson, setFormattedJson] = useState<string>('');
    const [error, setError] = useState('');

    const formatJson = () => {
        try {
            const parsed = JSON.parse(json)
            setFormattedJson(JSON.stringify(parsed, null, 4));
            setError('')
        } catch (e) {
            if(json !== ''){
                setError(`Invalid JSON ${e}`);
            }else{
                setError("");
            }
        }
    }

    useEffect(()=>{
        formatJson();
    },[json]);

    return (
        <div className='flex flex-col grow py-5 px-10'>
            <div className='mb-5 flex flex-row'>
                <Button text='Preety Print' onClick={formatJson} styles={{size: "base", rounded: "lg", theme: "normal", hover: true, spacing: "mr-4"}}/>
                {/* <Button text='Visualize' onClick={formatJson} styles={{size: "base", rounded: "lg", theme: "normal", hover: true, spacing: "mr-4"}}/> */}
            </div>
            <div className='min-w-full flex flex-row grow'>
                <JsonTextArea json={json} setJson={setJson} readOnly={false}/>
                <div className='min-w-4'></div>
                <JsonTextArea json={formattedJson} setJson={()=>{}} readOnly={true}/>
            </div>
            <div>{error}</div>
        </div>
    );
};

export default JsonEditor;