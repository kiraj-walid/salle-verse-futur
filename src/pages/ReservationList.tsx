
import React, { useState } from 'react';
import { useToast } from '../contexts/ToastContext';
import Breadcrumb from '../components/Breadcrumb';
import { Calendar, Clock, X, Eye } from 'lucide-react';

// Mock data for reservations
const mockReservations = [
  {
    id: 1,
    roomName: 'Salle A101',
    date: '25/04/2025',
    timeSlot: '14:00 - 16:00',
    status: 'upcoming',
    location: 'Bâtiment Central',
  },
  {
    id: 2,
    roomName: 'Salle B201',
    date: '22/04/2025',
    timeSlot: '10:00 - 12:00',
    status: 'upcoming',
    location: 'Annexe 1',
  },
  {
    id: 3,
    roomName: 'Laboratoire F110',
    date: '28/04/2025',
    timeSlot: '08:30 - 10:30',
    status: 'upcoming',
    location: 'Annexe 2',
  },
  {
    id: 4,
    roomName: 'Amphithéâtre C1',
    date: '15/04/2025',
    timeSlot: '13:00 - 15:00',
    status: 'past',
    location: 'Bâtiment Central',
  },
  {
    id: 5,
    roomName: 'Salle D105',
    date: '10/04/2025',
    timeSlot: '16:00 - 18:00',
    status: 'past',
    location: 'Annexe 2',
  },
  {
    id: 6,
    roomName: 'Salle E302',
    date: '05/04/2025',
    timeSlot: '09:00 - 11:00',
    status: 'past',
    location: 'Annexe 1',
  },
];

type TabType = 'upcoming' | 'past';

const ReservationList: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('upcoming');
  const [reservations, setReservations] = useState(mockReservations);
  const { showToast } = useToast();

  // Filter reservations based on active tab
  const filteredReservations = reservations.filter(
    (reservation) => reservation.status === activeTab
  );

  // Handle reservation cancellation
  const handleCancelReservation = (id: number) => {
    // Open a confirm dialog
    if (window.confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
      // In a real app, you would call an API to cancel the reservation
      setReservations(reservations.map(res => 
        res.id === id ? { ...res, status: 'past' } : res
      ));
      showToast('Réservation annulée avec succès', 'success');
    }
  };

  // Handle viewing reservation details
  const handleViewDetails = (id: number) => {
    const reservation = reservations.find(res => res.id === id);
    if (reservation) {
      showToast(`Détails de la réservation pour ${reservation.roomName}`, 'info');
      // In a real app, this would open a modal or navigate to a details page
    }
  };

  return (
    <div className="space-y-6 fade-in">
      <Breadcrumb items={[{ label: 'Mes réservations', path: '/reservations' }]} />
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Mes réservations
        </h1>
        <p className="text-muted-foreground">Gérez vos réservations passées et à venir</p>
      </div>
      
      {/* Tabs */}
      <div className="tab-container">
        <button
          className={`tab ${activeTab === 'upcoming' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          À venir
        </button>
        <button
          className={`tab ${activeTab === 'past' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('past')}
        >
          Passées
        </button>
      </div>
      
      {/* Reservations List */}
      {filteredReservations.length > 0 ? (
        <div className="space-y-4">
          {filteredReservations.map((reservation) => (
            <div key={reservation.id} className="room-card flex flex-col md:flex-row md:items-center">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">{reservation.roomName}</h3>
                <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 mb-3">
                  <div className="flex items-center mr-4">
                    <Calendar size={16} className="mr-1" />
                    {reservation.date}
                  </div>
                  <div className="flex items-center mr-4">
                    <Clock size={16} className="mr-1" />
                    {reservation.timeSlot}
                  </div>
                  <div className="flex items-center">
                    <Eye size={16} className="mr-1" />
                    {reservation.location}
                  </div>
                </div>
              </div>
              <div className="flex space-x-2 mt-3 md:mt-0">
                <button
                  className="btn btn-outline flex items-center text-sm"
                  onClick={() => handleViewDetails(reservation.id)}
                >
                  <Eye size={16} className="mr-1" />
                  Détails
                </button>
                
                {activeTab === 'upcoming' && (
                  <button
                    className="btn flex items-center text-sm bg-red-500 text-white hover:bg-red-600"
                    onClick={() => handleCancelReservation(reservation.id)}
                  >
                    <X size={16} className="mr-1" />
                    Annuler
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <div className="text-4xl mb-4">📅</div>
          <h3 className="text-lg font-semibold mb-2">
            {activeTab === 'upcoming' 
              ? 'Aucune réservation à venir' 
              : 'Aucune réservation passée'}
          </h3>
          <p className="text-gray-500 mb-6">
            {activeTab === 'upcoming' 
              ? 'Vous n\'avez pas encore de réservations programmées.' 
              : 'Vous n\'avez pas d\'historique de réservations.'}
          </p>
          
          {activeTab === 'upcoming' && (
            <a 
              href="/rooms" 
              className="btn btn-primary"
            >
              Réserver une salle
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default ReservationList;
