import '@testing-library/jest-dom/vitest';
import Modal from 'react-modal';

// テスト環境用のグローバルセットアップ
const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);
Modal.setAppElement('#root');