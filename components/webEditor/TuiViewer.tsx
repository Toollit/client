import '@toast-ui/editor/dist/toastui-editor.css';
import { Viewer } from '@toast-ui/react-editor';
import 'prismjs/themes/prism.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import Prism from 'prismjs';

interface Props {
  content: string;
}

/**
 * @props content - contendHtml 정보를 넘겨주어야 한다.
 */
const TuiViewer = ({ content }: Props) => {
  return (
    <>
      {content && (
        <Viewer
          initialValue={content || ''}
          plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
        />
      )}
    </>
  );
};

export default TuiViewer;
