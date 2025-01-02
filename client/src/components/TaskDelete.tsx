import React, { useState } from 'react';
import { Trash } from 'lucide-react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    maxWidth: '400px',
    height: '30%',
    maxHeight: '200px',
  },
};

interface TaskDeleteProps {
  task: any;
  // onDelete: (taskId: number) => void;
}

Modal.setAppElement('#root');

const TaskDelete: React.FC<TaskDeleteProps> = ({ task /*, onDelete*/ }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleDelete() {
    // onDelete(task.index);
    closeModal();
  }

  return (
    <div>
      <button
        onClick={openModal}
        className="cursor-pointer fill-current text-black"
      >
        <Trash />
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Task Delete Modal"
      >
        <h2>タスク削除</h2>
        <p>このタスクを削除しますか？</p>
        <p className="font-bold">{task.title}</p>
        <br />
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleDelete}
            className="rounded bg-red-500 px-4 py-2 text-white shadow"
          >
            削除
          </button>
          <button
            onClick={closeModal}
            className="text-grey rounded border bg-white px-4 py-2 shadow"
          >
            キャンセル
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default TaskDelete;
