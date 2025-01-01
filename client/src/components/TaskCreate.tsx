import React, { useState } from 'react';
import Modal from 'react-modal';
import useTaskStore from '../stores/useTask';

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
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('ToDo');
  const [owner_id] = useState(1);
  const { addTask, getTasks, loading, error } = useTaskStore();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    // フォームのリセット
    setTitle('');
    setDescription('');
    setDueDate('');
    setStatus('ToDo');
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    await addTask({
      title,
      description,
      due_date: dueDate,
      status,
      owner_id,
    });
    // タスクを追加した後にタスクリストを再取得
    await getTasks();
    closeModal();
  }

  return (
    <div className="flex justify-end">
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded shadow"
      >
        タスク追加
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Task Create Modal"
      >
        <h2>タスク追加</h2>
        <button onClick={closeModal} className="absolute top-2 right-2 text-xl">
          &times;
        </button>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">タイトル</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">詳細</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows={4}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">期日</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">ステータス</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="ToDo">ToDo</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded shadow"
              disabled={loading}
            >
              追加
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="bg-white text-grey px-4 py-2 rounded shadow border"
            >
              キャンセル
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TaskCreate;
