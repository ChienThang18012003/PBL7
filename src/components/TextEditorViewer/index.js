import classNames from 'classnames/bind';
import styles from './TextEditorViewer.module.scss';

const cx = classNames.bind(styles);

function TextEditorViewer({ html }) {
    return (
        <div
            dangerouslySetInnerHTML={{ __html: html }}
            style={{ width: '94%', color: '#000', fontSize: '1.4rem', fontWeight: '500', padding: '10px', background: '#fff' }}
        />
    );
}

export default TextEditorViewer;
