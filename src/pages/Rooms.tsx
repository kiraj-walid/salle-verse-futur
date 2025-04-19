import React, { useState } from 'react';
import { useToast } from '../contexts/ToastContext';
import { useAuth } from '../contexts/AuthContext';
import Breadcrumb from '../components/Breadcrumb';
import { Search, MapPin, Filter } from 'lucide-react';

// Mock data for rooms
const mockRooms = [
  {
    id: 1,
    name: 'Salle A101',
    description: 'Salle de cours standard équipée d\'un vidéoprojecteur',
    location: 'Bâtiment Central',
    capacity: 30,
    available: true,
    features: ['Vidéoprojecteur', 'Tableau blanc', 'Wi-Fi'],
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1650&q=80',
  },
  {
    id: 2,
    name: 'Salle B201',
    description: 'Salle informatique avec 20 postes',
    location: 'Annexe 1',
    capacity: 20,
    available: true,
    features: ['PC', 'Vidéoprojecteur', 'Tableau interactif'],
    image: 'https://images.unsplash.com/photo-1522071901873-411886a10004?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1650&q=80',
  },
  {
    id: 3,
    name: 'Amphithéâtre C1',
    description: 'Grand amphithéâtre pour cours magistraux',
    location: 'Bâtiment Central',
    capacity: 150,
    available: false,
    reservedBy: 'Dr. Martin',
    features: ['Système audio', 'Vidéoprojecteur', 'Microphones'],
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1650&q=80',
  },
  {
    id: 4,
    name: 'Salle D105',
    description: 'Salle de TP pour travaux pratiques',
    location: 'Annexe 2',
    capacity: 25,
    available: true,
    features: ['Équipement scientifique', 'Tableau blanc', 'Wi-Fi'],
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1650&q=80',
  },
  {
    id: 5,
    name: 'Salle E302',
    description: 'Petite salle pour réunions et travaux de groupe',
    location: 'Annexe 1',
    capacity: 15,
    available: false,
    reservedBy: 'Dr. Dubois',
    features: ['Table ronde', 'Écran LCD', 'Wi-Fi'],
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1650&q=80',
  },
  {
    id: 6,
    name: 'Laboratoire F110',
    description: 'Laboratoire informatique spécialisé',
    location: 'Annexe 2',
    capacity: 30,
    available: true,
    features: ['PC spécialisés', 'Logiciels techniques', 'Vidéoprojecteur'],
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1650&q=80',
  },
];

const locationOptions = [
  { value: 'all', label: 'Tous les lieux' },
  { value: 'Bâtiment Central', label: 'Bâtiment Central' },
  { value: 'Annexe 1', label: 'Annexe 1' },
  { value: 'Annexe 2', label: 'Annexe 2' },
];

const Rooms: React.FC = () => {
  const [rooms, setRooms] = useState(mockRooms);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [startHour, setStartHour] = useState('');
  const [endHour, setEndHour] = useState('');
  const { showToast } = useToast();
  const { user } = useAuth();

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         room.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = selectedLocation === 'all' || room.location === selectedLocation;
    return matchesSearch && matchesLocation;
  });

  const handleReservation = (roomId: number) => {
    if (!startHour || !endHour) {
      showToast('Veuillez sélectionner les heures de début et de fin', 'error');
      return;
    }

    const room = rooms.find(r => r.id === roomId);
    if (room) {
      showToast(`Demande de réservation envoyée pour la salle ${room.name}. En attente de confirmation.`, 'info');
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedLocation('all');
    setStartHour('');
    setEndHour('');
  };

  return (
    <div className="space-y-6 p-4 max-w-7xl mx-auto">
      <Breadcrumb items={[{ label: 'Salles', path: '/rooms' }]} />
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Salles disponibles
        </h1>
        <p className="text-muted-foreground">
          Trouvez et réservez la salle idéale pour vos cours
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label htmlFor="search" className="text-sm font-medium">
            Recherche
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              id="search"
              type="text"
              className="w-full pl-10 pr-4 py-2 border rounded-md"
              placeholder="Nom ou description"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="location" className="text-sm font-medium">
            Localisation
          </label>
          <select
            id="location"
            className="w-full px-4 py-2 border rounded-md"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            {locationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Horaires</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="time"
              className="px-4 py-2 border rounded-md"
              value={startHour}
              onChange={(e) => setStartHour(e.target.value)}
            />
            <input
              type="time"
              className="px-4 py-2 border rounded-md"
              value={endHour}
              onChange={(e) => setEndHour(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          {filteredRooms.length} salle{filteredRooms.length !== 1 ? 's' : ''} trouvée{filteredRooms.length !== 1 ? 's' : ''}
        </p>
        <button
          className="btn btn-outline flex items-center gap-2"
          onClick={resetFilters}
        >
          <Filter size={16} />
          Réinitialiser les filtres
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
          <div key={room.id} className="border rounded-lg p-4 space-y-4">
            <div>
              <h3 className="text-lg font-semibold">{room.name}</h3>
              <p className="text-sm text-gray-600">{room.description}</p>
            </div>
            
            <div className="flex items-center text-sm text-gray-500">
              <MapPin size={16} className="mr-1" />
              {room.location}
              <span className="mx-2">•</span>
              <span>{room.capacity} places</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {room.features.map((feature, index) => (
                <span key={index} className="bg-muted px-2 py-1 rounded-md text-xs">
                  {feature}
                </span>
              ))}
            </div>
            
            <button
              className="btn btn-primary w-full"
              onClick={() => handleReservation(room.id)}
            >
              Réserver
            </button>
          </div>
        ))}
      </div>
      
      {filteredRooms.length === 0 && (
        <div className="text-center py-10">
          <h3 className="text-lg font-semibold mb-2">Aucune salle trouvée</h3>
          <p className="text-gray-500">Veuillez ajuster vos filtres de recherche</p>
        </div>
      )}
    </div>
  );
};

export default Rooms;
