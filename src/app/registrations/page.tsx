'use client';

import { useState } from 'react';

// Define Registration type for type safety
interface Registration {
    id?: string; // Optional, as it may not exist
    contact: {
        firstName: string;
        lastName: string;
        primaryEmail?: string; // Optional, as it may not exist
        contactPhoneNumbers?: {
            mobile?: string;
        };
        organizationName?: string; // Optional, as it may not exist
        jobTitle?: string; // Optional, as it may not exist
    };
}

export default function Registrations() {
    const [eventId, setEventId] = useState<string>('');
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchRegistrations = async () => {
        if (!eventId.trim()) {
            setError('Please enter a valid event ID');
            return;
        }

        setLoading(true);
        setError(null);
        setRegistrations([]);

        try {
            const response = await fetch(`http://localhost:8000/registrations/${eventId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch registrations');
            }
            const data = await response.json();
            console.log('Fetched Registrations:', data); // For debugging
            setRegistrations(Array.isArray(data?.data?.event?.registrations) ? data.data.event.registrations : []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetchRegistrations();
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            fetchRegistrations();
        }
    };

    return (
        <div className="container-3xl p-4 max-w-[1320px] mx-auto">
            <h2 className="text-2xl font-bold mb-4">Event Registrations</h2>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="mb-4">
                <label htmlFor="event-id" className="block mb-2 font-medium text-gray-700">
                    Enter Event ID:
                </label>
                <div className="flex gap-2">
                    <input
                        id="event-id"
                        type="text"
                        value={eventId}
                        onChange={(e) => setEventId(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter event ID"
                        className="flex-grow p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        aria-label="Event ID"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
                    >
                        {loading ? 'Loading...' : 'Fetch'}
                    </button>
                </div>
            </form>

            {/* Error Message */}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* Registration List */}
            {registrations.length > 0 ? (
                <div>
                    <h3 className="text-xl font-bold mb-2">Registrations ({registrations.length})</h3>
                    <ul className="flex flex-wrap items-center space-y-2">
                        {registrations.map((reg, index) => (
                            <li key={reg.id || index} className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900/50 dark:even:bg-gray-950 p-2 m-2 w-full flex items-center justify-between rounded">
                                <strong>
                                {index + 1}.  {reg.contact.firstName} {reg.contact.lastName}
                                </strong>
                                <span className='p-2'>{reg.contact.primaryEmail || 'N/A'}</span>
                                <span className='p-2'>{reg.contact.jobTitle || 'N/A'}</span>
                                <span className='p-2'>{reg.contact.organizationName || 'N/A'}</span>

                                {reg.contact.contactPhoneNumbers?.mobile && (
                                    <span className='p-2'>
                                        {reg.contact.contactPhoneNumbers.mobile}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                !loading && !error && eventId && <p className="text-gray-500">No registrations found for this event.</p>
            )}
        </div>
    );
}