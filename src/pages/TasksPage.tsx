// src/pages/TasksPage.tsx
import React from 'react';
import TaskList from '../components/TaskList';

interface TasksPageProps {
  onTaskComplete: (taskId: string) => void;
}

const TasksPage: React.FC<TasksPageProps> = ({ onTaskComplete }) => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Complete Tasks to Earn NDT</h2>
      {/* Display message */}
      <div style={{
        marginBottom: '20px',
        padding: '10px',
        borderRadius: '5px',
        backgroundColor: '#f8d7da',
        color: '#721c24',
        border: '1px solid #f5c6cb',
        textAlign: 'center',
      }}>
        Hey! the more task you complete, the more $NDT you will earn.
      </div>
      <TaskList onTaskComplete={onTaskComplete} />
    </div>
  );
};


export default TasksPage;
