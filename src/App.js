import {useEffect, useRef} from 'react'
import MonacoEditor from 'react-monaco-editor';
import * as _monaco from 'monaco-editor';

let provider = {
  dispose: () => {},
};

function App() {
 // 编辑器实例
 const editorInstance = useRef();
 const monacoInstance = useRef();
    const options = {
      selectOnLineNumbers: true,
      renderSideBySide: false,
    };


  useEffect(
    () => () => {
      provider.dispose(); // 弹窗关闭后 销毁编辑器实例
    },
    []
  );

  const editorDidMountHandle = (editor, monaco) => {
    monacoInstance.current = monaco;
    editorInstance.current = editor;
    // 提示项设值
    provider = monaco.languages.registerCompletionItemProvider('plaintext', {
      provideCompletionItems() {
        const suggestions = [];
        [
          'CASEWHEN(expression1, value1, expression2, value2, ..., else_value)',
          'CONCAT(str1, str2, ...)',
          'ISNULL (expression, defaultValue)',
          'DATEDIFF_YEAR(startdate,enddate)',
          'DATEDIFF_MONTH(startdate,enddate)',
          'DATEDIFF_DAY(startdate,enddate)',
          'SUM(expression)',
          'AVG(expression)',
          'MAX(expression)',
          'MIN(expression)',
          'COUNT(expression)',
          'DISTINCTCOUNT(expression)',
          'DISTINCTAVG(expression)',
          'DISTINCTSUM(expression)',
          'NOW()',
        ].forEach((item) => {
          suggestions.push(
            // 添加contact()函数
            {
              label: item, // 显示名称
              kind: monaco.languages.CompletionItemKind.Function, // 这里Function也可以是别的值，主要用来显示不同的图标
              insertText: item, // 实际粘贴上的值
              detail: item
            }
          );
        });
        return {
          suggestions, // 必须使用深拷贝
        };
      },
      quickSuggestions: false, // 默认提示关闭
      // triggerCharacters: ['$', '.', '='], // 触发提示的字符，可以写多个
    });
    editor.focus();
  };

  return (
    <div className="App">
        <MonacoEditor
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
