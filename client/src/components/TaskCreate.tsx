import React, { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '800px',
    height: '80%',
    maxHeight: '600px',
  },
};

Modal.setAppElement('#root');

const TaskCreate: React.FC = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    // タスク追加のロジックをここに追加
    closeModal();
  }

  return (
    <div className="flex justify-end">
      <button onClick={openModal} className="bg-blue-500 text-white px-4 py-2 rounded shadow">
        タスク追加
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Task Create Modal"
      >
        <h2>タスク追加</h2>
        <button onClick={closeModal} className="absolute top-2 right-2 text-xl">&times;</button>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">タイトル</label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">詳細</label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows={4}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">期日</label>
            <input
              type="date"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">ステータス</label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="ToDo">ToDo</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded shadow">
              追加
            </button>
            <button type="button" onClick={closeModal} className="bg-white text-grey px-4 py-2 rounded shadow border">
              キャンセル
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TaskCreate;
