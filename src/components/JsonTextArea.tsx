import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { EditorView } from "@codemirror/view";

type JsonTextAreaProps = {
  json: string;
  setJson: Function;
  readOnly: boolean;
};

const JsonTextArea: React.FC<JsonTextAreaProps> = ({ json, setJson, readOnly }) => {
  const onChange = React.useCallback((val: string) => {
    setJson(val);
  }, []);

  return (
    <div className="grow flex w-full lg:w-full lg:max-h-full max-h-96 overflow-auto">
      <CodeMirror
        className="h-full min-w-full max-w-full"
        basicSetup={{
          lineNumbers: true,
          foldGutter: true,
        }}
        value={json}
        height="100%"
        extensions={[
          javascript({ jsx: true }),
          EditorView.lineWrapping,
        ]}
        onChange={onChange}
        editable={!readOnly}
      />
    </div>
  );
};

export default JsonTextArea;
