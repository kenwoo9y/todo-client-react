import React from 'react';

export const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">About This ToDo App</h1>

      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Features</h2>
          <ul className="mb-4 list-disc pl-6">
            <li>Simple and intuitive task management</li>
            <li>Easy task creation, editing, and deletion</li>
            <li>Task completion tracking</li>
            <li>User-friendly interface</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Technical Details</h2>
          <p className="mb-4">
            This application is built using the following technologies:
          </p>
          <ul className="list-disc pl-6">
            <li>React - A JavaScript library for building user interfaces</li>
            <li>TypeScript - For type-safe JavaScript development</li>
            <li>Tailwind CSS - A utility-first CSS framework</li>
          </ul>
        </section>
      </div>
    </div>
  );
};
