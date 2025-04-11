'use client';

import { section } from 'framer-motion/client';
import React from 'react';

type Event = {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string; // Format ISO date string (YYYY-MM-DD)
};

const events: Event[] = [
  {
    id: 1,
    title: 'Event A',
    description: 'Deskripsi singkat untuk Event A.',
    image: '/images/event-a.jpg',
    date: '2025-04-15',
  },
  {
    id: 2,
    title: 'Event B',
    description: 'Deskripsi singkat untuk Event B.',
    image: '/images/event-b.jpg',
    date: '2025-05-10',
  },
  {
    id: 3,
    title: 'Event C',
    description: 'Deskripsi singkat untuk Event C.',
    image: '/images/event-c.jpg',
    date: '2025-06-20',
  },
  {
    id: 4,
    title: 'Event D',
    description: 'Deskripsi singkat untuk Event D.',
    image: '/images/event-d.jpg',
    date: '2025-07-05',
  },
];

const EventPage: React.FC = () => {
  return (
    
    <section id='event' className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-black mb-10">Upcoming Events</h1>

      {/* Grid Event */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition duration-300"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2 text-gray-800">{event.title}</h2>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <p className="text-gray-500 font-medium">
                {new Date(event.date).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventPage;
