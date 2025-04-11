'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

type Event = {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
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

// Komponen Kartu Event
const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/event/${event.id}`);
  };

  const formattedDate = new Date(event.date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-gray-800 bg-opacity-90 shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition duration-300"
    >
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 text-white">
        <h2 className="text-xl font-bold mb-2">{event.title}</h2>
        <p className="text-gray-300 mb-3">{event.description}</p>
        <p className="font-medium text-red-400">{formattedDate}</p>
      </div>
    </div>
  );
};

// Komponen Utama
const EventPage: React.FC = () => {
  return (
    <section id="event" className="bg-white min-h-screen max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Upcoming Events
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
};

export default EventPage;
