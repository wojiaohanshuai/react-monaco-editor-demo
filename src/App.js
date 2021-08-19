import { useEffect, useRef } from 'react'
import MonacoEditor, { monaco } from 'react-monaco-editor';
import * as _monaco from 'monaco-editor';

let provider = {
  dispose: () => { },
};

function App() {
  const options = {
    selectOnLineNumbers: true,
    renderSideBySide: false,
    autoClosingBrackets: "never",
    lineNumbers: null,
  };

  let myField = 'my-field';
  let myKeyword = 'my-keyword';
  let myFunction = 'my-function';

  //设置含有custom-error等token class的主题
  monaco.editor.defineTheme('logTheme', {
    base: 'vs',
    inherit: false,
    rules: [{
      token: myField,
      foreground: "00b375",
      fontStyle: "bold"
    }, {
      token: myKeyword,
      foreground: "2153D4",
      fontStyle: "bold"
    }, {
      token: myFunction,
      foreground: "2153D4",
      fontStyle: "bold"
    }],
  });

  useEffect(
    () => () => {
      provider.dispose(); // 弹窗关闭后 销毁编辑器实例
    },
    []
  );

  const editorDidMountHandle = (editor, monaco) => {
    // monaco.languages.register({ id: 'log' });




    monaco.languages.setMonarchTokensProvider('plaintext', {
      tokenizer: {
        root: [{
          include: "@fields"
        }, {
          include: "@functions"
        }, {
          regex: /[{}()]/,
          action: {
            token: myKeyword
          }
        }, {
          regex: /\b(CASE|WHEN|THEN|ELSE|END)\b/,
          action: {
            token: myKeyword
          }
        }, {
          regex: /\b(DISTINCT)\b/,
          action: {
            token: myKeyword
          }
        }, {
          regex: /(\+|-|\*|\/)/,
          action: {
            token: myKeyword
          }
        }],

        fields: [{
          regex: "\\[(".concat(['id', 'name'].join("|"), ")\\]"),
          action: {
            token: myField,
            next: "@popall"
          }
        }],

        functions: [{
          regex: "(".concat(['ABS', 'CEIL'].join("|"), ")\\("),
          action: {
            token: myFunction,
            next: "@popall"
          }
        }]
      },
    });






    editor.focus();
  };

  return (
    <div className="App">
      <MonacoEditor
        theme="logTheme"
        width="100%"
        height="400px"
        language="plaintext"
        options={options}
        editorDidMount={editorDidMountHandle}
      />
    </div>
  );
}

export default App;
