'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import API from '@/utils/axiosClient';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Event = {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
};

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
      className="group cursor-pointer bg-black rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 shadow-xl hover:shadow-red-900/50 relative"
    >
      <div className="relative overflow-hidden">
        <img
          src={`http://localhost:4000${event.image}`}
          alt={event.title}
          className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-105 opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>
      <div className="p-6 space-y-4">
        <h2 className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-red-500">
          {event.title}
        </h2>
        <p className="text-gray-300 line-clamp-3">{event.description}</p>
        <div className="flex items-center text-red-500 font-medium">
          <span className="mr-2">📅</span>
          {formattedDate}
        </div>
      </div>
      <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
        Event
      </div>
    </div>
  );
};

const EventPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await API.get('/event');
        setEvents(response.data);
      } catch (error) {
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse text-2xl font-bold text-red-500">
          Loading Events...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-500 text-xl bg-black p-8 rounded-xl border border-red-600">
          ⚠️ {error}
        </div>
      </div>
    );
  }

  return (
    <section id="event" className="scroll-mt-24 min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center relative pb-4">
          Upcoming Events
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-red-600 rounded-full"></span>
        </h1>

        {events.length > 0 ? (
          <div>
            {events.length > 4 ? (
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
              >
                {events.map((event) => (
                  <SwiperSlide key={event.id}>
                    <EventCard event={event} />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400">No upcoming events found</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventPage;
