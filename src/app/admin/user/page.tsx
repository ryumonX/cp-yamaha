'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import API from '@/utils/axiosClient';
import UserModal from './usermodal';
import Sidebar from '@/components/UI/admin-sidebar';

const UserTable = dynamic(() => import('./userTable'), { ssr: false });

export interface UserData {
  id: number;
  username: string;
  password?: string;
  name: string;
}

const UserPage = () => {
  const [data, setData] = useState<UserData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get('/users');
      setData(res.data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

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

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await API.delete(`/users/${id}`);
        fetchUsers();
      } catch (err) {
        console.error('Failed to delete user:', err);
      }
    }
  };

  const handleSubmit = async (formData: UserData) => {
    if (!formData.username || (!isEditMode && !formData.password) || !formData.name) {
      alert('All fields are required!');
      return;
    }

    try {
      if (isEditMode && currentUser) {
        await API.put(`/users/${currentUser.id}`, formData);
      } else {
        const { id, ...createData } = formData;
        await API.post('/users', createData);
      }

      window.location.reload();
    } catch (err) {
      console.error('Failed to save user:', err);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
    <Sidebar />

    <div className="flex-1 p-6 max-w-screen-xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
            <button
              onClick={handleAdd}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
            >
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

export default UserPage;
