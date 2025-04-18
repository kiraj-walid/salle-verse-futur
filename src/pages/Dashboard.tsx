
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Breadcrumb from '../components/Breadcrumb';
import { Calendar, Clock, BookOpen, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data
const mockNextReservation = {
  roomName: 'Salle A102',
  date: '25 Avril 2025',
  time: '14:00 - 16:00',
};

const mockRecentActivity = {
  action: 'Réservation confirmée',
  roomName: 'Salle B201',
  date: '22 Avril 2025',
};

const mockAdminStats = [
  { id: 1, label: 'Salles', value: 25, icon: BookOpen },
  { id: 2, label: 'Réservations du jour', value: 12, icon: Calendar },
  { id: 3, label: 'Professeurs', value: 48, icon: Users },
  { id: 4, label: 'Taux d\'occupation', value: '72%', icon: Clock },
];

const mockRecentReservations = [
  { id: 1, professor: 'Dr. Dupont', room: 'A102', date: '25/04/2025', time: '14:00 - 16:00' },
  { id: 2, professor: 'Dr. Martin', room: 'B201', date: '24/04/2025', time: '09:00 - 11:00' },
  { id: 3, professor: 'Dr. Robert', room: 'C305', date: '23/04/2025', time: '15:30 - 17:30' },
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';

  if (isAdmin) {
    return <AdminDashboard />;
  }

  return <ProfessorDashboard />;
};

const ProfessorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [reservationsCount, setReservationsCount] = useState(0);

  useEffect(() => {
    // This would be an API call in a real app
    setReservationsCount(12); // Mock data
  }, []);

  return (
    <div className="space-y-6 fade-in">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Bonjour, Dr. {user?.name.split(' ')[1]} 👋
        </h1>
        <p className="text-muted-foreground">Prêt à réserver une salle ?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Next Reservation Card */}
        <div className="dashboard-card border-l-4 border-primary">
          <h3 className="flex items-center text-lg font-semibold mb-3">
            <Calendar size={20} className="mr-2 text-primary" />
            Prochaine réservation
          </h3>
          <div className="space-y-2">
            <p className="font-medium">{mockNextReservation.roomName}</p>
            <p className="text-sm text-gray-600">{mockNextReservation.date}</p>
            <p className="text-sm text-gray-600">{mockNextReservation.time}</p>
          </div>
          <div className="mt-4">
            <Link 
              to="/reservations" 
              className="text-sm text-primary hover:underline"
            >
              Voir toutes mes réservations
            </Link>
          </div>
        </div>

        {/* Recent Activity Card */}
        <div className="dashboard-card border-l-4 border-secondary">
          <h3 className="flex items-center text-lg font-semibold mb-3">
            <Clock size={20} className="mr-2 text-secondary" />
            Dernière activité
          </h3>
          <div className="space-y-2">
            <p className="font-medium">{mockRecentActivity.action}</p>
            <p className="text-sm text-gray-600">{mockRecentActivity.roomName}</p>
            <p className="text-sm text-gray-600">{mockRecentActivity.date}</p>
          </div>
          <div className="mt-4">
            <Link 
              to="/activity-log" 
              className="text-sm text-secondary hover:underline"
            >
              Voir toutes les activités
            </Link>
          </div>
        </div>

        {/* Reservations Count Card */}
        <div className="dashboard-card border-l-4 border-accent">
          <h3 className="flex items-center text-lg font-semibold mb-3">
            <BookOpen size={20} className="mr-2 text-accent" />
            Réservations passées
          </h3>
          <div>
            <p className="text-3xl font-bold">{reservationsCount}</p>
            <p className="text-sm text-gray-600">Réservations effectuées</p>
          </div>
          <div className="mt-4">
            <Link 
              to="/statistics" 
              className="text-sm text-accent hover:underline"
            >
              Voir mes statistiques
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Action Button */}
      <div className="mt-8 text-center">
        <Link 
          to="/rooms" 
          className="btn btn-primary inline-flex items-center justify-center px-6 py-3 text-lg"
        >
          <Calendar size={20} className="mr-2" />
          Réserver une salle
        </Link>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6 fade-in">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Tableau de bord administrateur
        </h1>
        <p className="text-muted-foreground">Aperçu du système de réservation</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockAdminStats.map((stat) => (
          <div key={stat.id} className="dashboard-card">
            <div className="flex items-center mb-2">
              <stat.icon size={20} className="mr-2 text-primary" />
              <h3 className="text-lg font-semibold">{stat.label}</h3>
            </div>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Reservations */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Réservations récentes</h2>
        <div className="overflow-x-auto">
          <table className="w-full table">
            <thead>
              <tr>
                <th>Professeur</th>
                <th>Salle</th>
                <th>Date</th>
                <th>Heure</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockRecentReservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td>{reservation.professor}</td>
                  <td>{reservation.room}</td>
                  <td>{reservation.date}</td>
                  <td>{reservation.time}</td>
                  <td>
                    <div className="flex space-x-2">
                      <button className="text-blue-500 hover:text-blue-700">
                        Voir
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        Annuler
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-right">
          <Link 
            to="/reservations" 
            className="text-primary hover:underline"
          >
            Voir toutes les réservations
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link 
          to="/rooms/manage" 
          className="card p-6 text-center hover:bg-gray-50"
        >
          <BookOpen size={32} className="mx-auto mb-3 text-primary" />
          <h3 className="text-lg font-semibold mb-2">Gérer les salles</h3>
          <p className="text-sm text-gray-600">Ajouter, modifier ou supprimer des salles</p>
        </Link>
        
        <Link 
          to="/users" 
          className="card p-6 text-center hover:bg-gray-50"
        >
          <Users size={32} className="mx-auto mb-3 text-primary" />
          <h3 className="text-lg font-semibold mb-2">Gérer les utilisateurs</h3>
          <p className="text-sm text-gray-600">Gérer les comptes professeurs et admin</p>
        </Link>
        
        <Link 
          to="/settings" 
          className="card p-6 text-center hover:bg-gray-50"
        >
          <Clock size={32} className="mx-auto mb-3 text-primary" />
          <h3 className="text-lg font-semibold mb-2">Paramètres</h3>
          <p className="text-sm text-gray-600">Configurer le système de réservation</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
