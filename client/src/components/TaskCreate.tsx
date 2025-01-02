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
        className="rounded bg-blue-500 px-4 py-2 text-white shadow"
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
        <button onClick={closeModal} className="absolute right-2 top-2 text-xl">
          &times;
        </button>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold">タイトル</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold">詳細</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              rows={4}
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold">期日</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold">ステータス</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
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
              className="rounded bg-blue-500 px-4 py-2 text-white shadow"
              disabled={loading}
            >
              追加
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="text-grey rounded border bg-white px-4 py-2 shadow"
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
