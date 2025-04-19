
import React, { useState } from 'react';
import { useToast } from '../contexts/ToastContext';
import { useAuth } from '../contexts/AuthContext';
import Breadcrumb from '../components/Breadcrumb';
import { Calendar, Clock, Check, X } from 'lucide-react';

// Mock data for reservations
const mockReservations = [
  {
    id: 1,
    roomName: 'Salle A101',
    date: '25/04/2025',
    timeSlot: '14:00 - 16:00',
    status: 'en attente',
    location: 'Bâtiment Central',
    professor: 'Dr. Martin',
  },
  {
    id: 2,
    roomName: 'Salle B201',
    date: '22/04/2025',
    timeSlot: '10:00 - 12:00',
    status: 'confirmé',
    location: 'Annexe 1',
    professor: 'Dr. Dubois',
  },
  {
    id: 3,
    roomName: 'Laboratoire F110',
    date: '28/04/2025',
    timeSlot: '08:30 - 10:30',
    status: 'annulé',
    location: 'Annexe 2',
    professor: 'Dr. Bernard',
  },
];

type ReservationStatus = 'en attente' | 'confirmé' | 'annulé';
type TabType = 'en attente' | 'confirmé' | 'annulé';

const ReservationList: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('en attente');
  const [reservations, setReservations] = useState(mockReservations);
  const { showToast } = useToast();
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';

  const filteredReservations = reservations.filter(
    (reservation) => reservation.status === activeTab
  );

  const handleUpdateStatus = (id: number, newStatus: ReservationStatus) => {
    if (!isAdmin) {
      showToast("Vous n'avez pas les droits pour effectuer cette action", 'error');
      return;
    }

    setReservations(reservations.map(res => 
      res.id === id ? { ...res, status: newStatus } : res
    ));
    
    const statusMessage = {
      'confirmé': 'confirmée',
      'annulé': 'annulée',
      'en attente': 'mise en attente'
    }[newStatus];
    
    showToast(`Réservation ${statusMessage} avec succès`, 'success');
  };

  return (
    <div className="space-y-6 fade-in">
      <Breadcrumb items={[{ label: 'Mes réservations', path: '/reservations' }]} />
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          {isAdmin ? 'Gestion des réservations' : 'Mes réservations'}
        </h1>
        <p className="text-muted-foreground">
          {isAdmin ? 'Gérez les demandes de réservation' : 'Consultez vos réservations'}
        </p>
      </div>
      
      <div className="tab-container">
        <button
          className={`tab ${activeTab === 'en attente' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('en attente')}
        >
          En attente
        </button>
        <button
          className={`tab ${activeTab === 'confirmé' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('confirmé')}
        >
          Confirmées
        </button>
        <button
          className={`tab ${activeTab === 'annulé' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('annulé')}
        >
          Annulées
        </button>
      </div>
      
      {filteredReservations.length > 0 ? (
        <div className="space-y-4">
          {filteredReservations.map((reservation) => (
            <div key={reservation.id} className="room-card flex flex-col md:flex-row md:items-center">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">{reservation.roomName}</h3>
                <p className="text-sm text-gray-600 mb-1">
                  {isAdmin ? `Demandé par : ${reservation.professor}` : ''}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 mb-3">
                  <div className="flex items-center mr-4">
                    <Calendar size={16} className="mr-1" />
                    {reservation.date}
                  </div>
                  <div className="flex items-center mr-4">
                    <Clock size={16} className="mr-1" />
                    {reservation.timeSlot}
                  </div>
                  <div>
                    {reservation.location}
                  </div>
                </div>
              </div>
              {isAdmin && reservation.status === 'en attente' && (
                <div className="flex space-x-2 mt-3 md:mt-0">
                  <button
                    className="btn btn-success flex items-center text-sm"
                    onClick={() => handleUpdateStatus(reservation.id, 'confirmé')}
                  >
                    <Check size={16} className="mr-1" />
                    Confirmer
                  </button>
                  <button
                    className="btn btn-danger flex items-center text-sm"
                    onClick={() => handleUpdateStatus(reservation.id, 'annulé')}
                  >
                    <X size={16} className="mr-1" />
                    Annuler
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <h3 className="text-lg font-semibold mb-2">
            Aucune réservation {activeTab}
          </h3>
          <p className="text-gray-500">
            {activeTab === 'en attente' 
              ? 'Aucune réservation en attente de traitement.' 
              : activeTab === 'confirmé'
              ? 'Aucune réservation confirmée.'
              : 'Aucune réservation annulée.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ReservationList;
