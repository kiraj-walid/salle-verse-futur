
import React, { useState } from 'react';
import { useToast } from '../contexts/ToastContext';
import { useAuth } from '../contexts/AuthContext';
import Breadcrumb from '../components/Breadcrumb';
import { Calendar, Clock, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Use shadcn/ui button

// Mock data des réservations
const mockReservations = [
  {
    id: 1,
    roomName: 'Salle A101',
    date: '25/04/2025',
    startHour: '14:00',
    endHour: '16:00',
    status: 'en attente',
    location: 'Bâtiment Central',
    professor: 'Dr. Dupont',
  },
  {
    id: 2,
    roomName: 'Laboratoire B201',
    date: '22/04/2025',
    startHour: '10:00',
    endHour: '12:00',
    status: 'confirmé',
    location: 'Annexe 1',
    professor: 'Dr. Dupont',
  },
  {
    id: 3,
    roomName: 'Salle Multimedia C305',
    date: '28/04/2025',
    startHour: '08:30',
    endHour: '11:30',
    status: 'en attente',
    location: 'Bâtiment Principal',
    professor: 'Dr. Dupont',
  },
  {
    id: 4,
    roomName: 'Laboratoire de Physique D110',
    date: '30/04/2025',
    startHour: '13:00',
    endHour: '16:00',
    status: 'confirmé',
    location: 'Annexe 2',
    professor: 'Dr. Dupont',
  },
  {
    id: 5,
    roomName: 'Salle de Conférence E201',
    date: '02/05/2025',
    startHour: '09:00',
    endHour: '12:00',
    status: 'annulé',
    location: 'Bâtiment Administratif',
    professor: 'Dr. Dupont',
  }
];

type ReservationStatus = 'en attente' | 'confirmé' | 'annulé';
type TabType = 'en attente' | 'confirmé' | 'annulé';

// Petite fonction pour un tag coloré par statut
const StatusBadge: React.FC<{ status: ReservationStatus }> = ({ status }) => {
  let color = '';
  let label = '';
  switch (status) {
    case 'confirmé':
      color = 'bg-green-100 text-green-800 border-green-300';
      label = 'Confirmée'; break;
    case 'en attente':
      color = 'bg-yellow-100 text-yellow-800 border-yellow-300';
      label = 'En attente'; break;
    case 'annulé':
      color = 'bg-red-100 text-red-800 border-red-300';
      label = 'Annulée'; break;
    default:
      label = status;
  }
  return (
    <span className={`border px-2 py-0.5 rounded text-xs font-medium ${color}`}>{label}</span>
  );
};

const ReservationList: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('en attente');
  const [reservations, setReservations] = useState(mockReservations);
  const { showToast } = useToast();
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';

  // Pour admin : filtrage par status d'onglet, pour prof : toutes ses réservations non triées
  const filteredReservations = isAdmin
    ? reservations.filter((reservation) => reservation.status === activeTab)
    : reservations.filter((reservation) => reservation.professor === user?.name);

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
    <div className="space-y-6 p-4">
      <Breadcrumb items={[{ label: 'Réservations', path: '/reservations' }]} />
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          {isAdmin ? 'Gestion des réservations' : 'Mes réservations'}
        </h1>
        <p className="text-muted-foreground">
          {isAdmin ? 'Gérez les demandes de réservation des professeurs' : 'Consultez vos réservations'}
        </p>
      </div>
      {isAdmin && (
        <div className="flex space-x-2 border-b">
          <button
            className={`px-4 py-2 ${activeTab === 'en attente' ? 'border-b-2 border-primary font-semibold' : ''}`}
            onClick={() => setActiveTab('en attente')}
          >
            En attente
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'confirmé' ? 'border-b-2 border-primary font-semibold' : ''}`}
            onClick={() => setActiveTab('confirmé')}
          >
            Confirmées
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'annulé' ? 'border-b-2 border-primary font-semibold' : ''}`}
            onClick={() => setActiveTab('annulé')}
          >
            Annulées
          </button>
        </div>
      )}

      {filteredReservations.length > 0 ? (
        <div className="space-y-4">
          {filteredReservations.map((reservation) => (
            <div
              key={reservation.id}
              className="relative border rounded-xl p-6 bg-white shadow-md flex flex-col justify-between"
              style={{ minHeight: 150 }}
            >
              {/* Status badge top-right */}
              <div className="absolute top-4 right-4">
                <StatusBadge status={reservation.status as ReservationStatus} />
              </div>
              {/* Title top-left */}
              <div className="flex flex-row items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold">{reservation.roomName}</h3>
              </div>
              {/* Infos */}
              <div className="space-y-2 flex-1">
                {isAdmin && (
                  <p className="text-sm text-gray-600">
                    Demandé par : {reservation.professor}
                  </p>
                )}
                <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1" />
                    {reservation.date}
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    {reservation.startHour} - {reservation.endHour}
                  </div>
                  <div>
                    {reservation.location}
                  </div>
                </div>
              </div>
              {/* Actions */}
              {isAdmin && reservation.status === 'en attente' && (
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <Button
                    variant="default"
                    className="flex items-center gap-1"
                    onClick={() => handleUpdateStatus(reservation.id, 'confirmé')}
                  >
                    <Check size={16} />
                    Confirmer
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex items-center gap-1"
                    onClick={() => handleUpdateStatus(reservation.id, 'annulé')}
                  >
                    <X size={16} />
                    Annuler
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <h3 className="text-lg font-semibold mb-2">
            {isAdmin
              ? `Aucune réservation ${activeTab}`
              : `Aucune réservation`}
          </h3>
          <p className="text-gray-500">
            {isAdmin
              ? (activeTab === 'en attente'
                  ? 'Aucune réservation en attente de traitement.'
                  : activeTab === 'confirmé'
                  ? 'Aucune réservation confirmée.'
                  : 'Aucune réservation annulée.')
              : `Vous n'avez pas de réservations pour le moment.`}
          </p>
        </div>
      )}
    </div>
  );
};

export default ReservationList;
