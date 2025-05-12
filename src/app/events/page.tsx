'use client';

import { useEffect, useState } from 'react';

// Define Event type for type safety
interface Event {
  id: string; // GraphQL IDs are typically strings
  name: string;
  startDate: string;
  endDate: string;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:8000/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        console.log('Fetched Events:', data); // For debugging
        setEvents(data?.data.events ? data.data.events : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p className="text-gray-500">Loading events...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Events List</h2>

      {events.length === 0 ? (
        <p className="text-gray-500">No events available.</p>
      ) : (
        <div className="mb-4">
          <label htmlFor="event-select" className="block mb-2 font-medium text-gray-700">
            Select an Event:
          </label>
          <select
            id="event-select"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={selectedEvent?.id || ''}
            onChange={(e) => {
              const selectedId = e.target.value; // Treat as string
              const event = events.find((ev) => ev.id === selectedId);
              setSelectedEvent(event || null);
            }}
            aria-label="Select an event"
          >
            <option value="">-- Select an event --</option>
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}