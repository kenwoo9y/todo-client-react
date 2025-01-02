import React, { useState } from 'react';
import { Pencil } from 'lucide-react';
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

interface TaskEditProps {
  task: any;
}

Modal.setAppElement('#root');

const TaskEdit: React.FC<TaskEditProps> = ({ task }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    // タスク編集のロジックをここに追加
    closeModal();
  }

  return (
    <div>
      <button
        onClick={openModal}
        className="cursor-pointer fill-current text-black"
      >
        <Pencil />
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Task Edit Modal"
      >
        <h2>タスク編集</h2>
        <button onClick={closeModal} className="absolute right-2 top-2 text-xl">
          &times;
        </button>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold">タイトル</label>
            <input
              type="text"
              defaultValue={task.title}
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold">詳細</label>
            <textarea
              defaultValue={task.description}
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              rows={4}
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold">期日</label>
            <input
              type="date"
              defaultValue={task.due_date}
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold">ステータス</label>
            <select
              defaultValue={task.status}
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
              className="rounded bg-yellow-500 px-4 py-2 text-white shadow"
            >
              更新
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

export default TaskEdit;
