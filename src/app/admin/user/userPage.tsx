'use client'
import { useState } from 'react';
import UserModal from './usermodal';
import dynamic from 'next/dynamic';

const UserTable = dynamic(() => import('./usertable'), {
  ssr: false,
});

export interface UserData {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
  }


const AdminPage = () => {
  const [data, setData] = useState<UserData[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Active' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

  const handleAdd = () => {
    setIsEditMode(false);
    setCurrentUser(null);
    setIsModalOpen(true);
  };

  const handleEdit = (user: UserData) => {
    setIsEditMode(true);
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setData(data.filter(user => user.id !== id));
    }
  };

  const handleSubmit = (formData: UserData) => {
    if (isEditMode && currentUser) {
      setData(data.map(user => 
        user.id === currentUser.id ? { ...formData } : user
      ));
    } else {
      
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
            <button 
              onClick={handleAdd}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
            >
              {/* Add button icon */}
              Add User
            </button>
          </div>
          
          <UserTable 
            data={data}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <UserModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            isEditMode={isEditMode}
            initialData={currentUser}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;