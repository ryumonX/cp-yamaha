'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import API from '@/utils/axiosClient';
import {
  CalendarIcon,
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  GlobeAltIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

type Event = {
  id: number;
  title: string;
  description: string;
  location: string;
  image: string;
  date: string;
};

export default function EventDetail() {
  const params = useParams();
  const { id } = params;
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await API.get(`/event/${id}`);
        setEvent(response.data);
      } catch (err) {
        setError('Failed to load event data.');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEvent();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error || !event) return (
    <div className="text-center py-20">
      <div className="max-w-md mx-auto p-6 bg-red-50 rounded-lg">
        <p className="text-red-600 font-medium">{error || 'Event not found.'}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  const formattedDate = new Date(event.date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-full transition-all duration-200 mb-8"
      >
        <ArrowRightIcon className="w-4 h-4 transform rotate-180" />
        Kembali
      </button>


      {/* Header Section */}
      <div className="text-center mb-16 space-y-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-black">
          {event.title}
        </h1>
        <div className="inline-flex flex-wrap items-center justify-center gap-4 text-gray-600">
          <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full">
            <CalendarIcon className="w-5 h-5 text-blue-600" />
            <span className="text-lg font-medium">{formattedDate}</span>
          </div>
          <div className="flex items-center space-x-2 bg-red-50 px-4 py-2 rounded-full">
            <MapPinIcon className="w-5 h-5 text-red-600" />
            <span className="text-lg font-medium">{event.location}</span>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl mb-16 group">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent" />
        <img
          src={`http://localhost:4000${event.image}`}
          alt={event.title}
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              About the Event
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Additional Details */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="bg-blue-100 w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                <ArrowRightIcon className="w-5 h-5 text-blue-600" />
              </span>
              Event Highlights
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Networking opportunities with industry leaders</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Hands-on workshops and interactive sessions</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Exclusive access to event resources</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Contact Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                <EnvelopeIcon className="w-6 h-6 text-blue-600" />
              </span>
              Contact Information
            </h2>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <EnvelopeIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <a
                    href="mailto:info@acara.com"
                    className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
                  >
                    info@acara.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-50 p-2 rounded-lg">
                  <PhoneIcon className="w-5 h-5 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">WhatsApp</p>
                  <a
                    href="https://wa.me/6281234567890"
                    className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
                  >
                    +62 812-3456-7890
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-purple-50 p-2 rounded-lg">
                  <GlobeAltIcon className="w-5 h-5 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Registration</p>
                  <a
                    href="https://event.com/daftar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
                  >
                    event.com/daftar
                  </a>
                </div>
              </div>
            </div>

            <button className="w-full mt-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center">
              Register Now
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}