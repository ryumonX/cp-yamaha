'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import API from '@/utils/axiosClient';
import EventModal from './eventModal';
import Sidebar from '@/components/UI/admin-sidebar';

const EventTable = dynamic(() => import('./eventTable'), { ssr: false });

export interface eventData {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  image?: string;
  imageFile?: any;
}

const EventPage = () => {
  const [data, setData] = useState<eventData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<eventData | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await API.get('/event');
      setData(res.data);
    } catch (err) {
      console.error('Failed to fetch events:', err);
    }
  };

  const handleAdd = () => {
    setIsEditMode(false);
    setCurrentEvent(null);
    setIsModalOpen(true);
  };

  const handleEdit = (event: eventData) => {
    setIsEditMode(true);
    setCurrentEvent(event);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await API.delete(`/event/${id}`);
        fetchEvents();
      } catch (err) {
        console.error('Failed to delete event:', err);
      }
    }
  };

  const handleSubmit = async (formData: eventData) => {
    if (!formData.title || !formData.imageFile) {
      alert('Title and image are required!');
      return;
    }

    try {
      const form = new FormData();
      form.append('title', formData.title);
      form.append('description', formData.description);
      form.append('location', formData.location);
      form.append('date', formData.date);
      form.append('image', formData.imageFile);

      if (isEditMode && currentEvent) {
        await API.put(`/event/${currentEvent.id}`, form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        await API.post('/event', form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }

      window.location.reload();
    } catch (err) {
      console.error('Failed to save event:', err);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6 max-w-screen-xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Event Management</h1>
            <button
              onClick={handleAdd}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
            >
              Add Event
            </button>
          </div>

          <EventTable
            data={data}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <EventModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            isEditMode={isEditMode}
            initialData={currentEvent}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default EventPage;
