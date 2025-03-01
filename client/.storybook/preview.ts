import type { Preview } from '@storybook/react';
import '../src/index.css'; // または tailwind のスタイルが定義されているファイル
import Modal from 'react-modal';

// Storybookのグローバル設定
if (typeof document !== 'undefined') {
  const rootElement = document.createElement('div');
  rootElement.id = 'root';
  document.body.appendChild(rootElement);
  Modal.setAppElement(rootElement);
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
