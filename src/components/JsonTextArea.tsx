import { useEffect, useRef } from "react";

type JsonTextAreaProps = {
    json: string,
    setJson: Function,
    readOnly: boolean
};

const JsonTextArea: React.FC<JsonTextAreaProps> = ({ json, setJson, readOnly }) => {

    const line_indexes = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        if (line_indexes.current) {
            const lines = json.split('\n').length;
            line_indexes.current.innerHTML = Array.from({ length: lines }, (_, i) => i + 1)
                .join('<br>');
        }
    }, [json])

    return (
        <div className="grow flex overflow-auto">
            <div className='grow relative border-gray-200 border-solid border-2 py-2 pl-10'>
                <div className="absolute flex justify-center top-0 left-0 py-2 min-w-8 mr-2 bg-gray-100 text-gray-700 min-h-full" ref={line_indexes}></div>
                <textarea
                    className='w-full h-full focus:outline-none resize-none'
                    value={json}
                    onChange={(e) => setJson(e.target.value)}
                    readOnly={readOnly}
                />
            </div>
        </div>
    )
}

export default JsonTextArea;