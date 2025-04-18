
import React, { useState, useEffect } from 'react';
import { useToast } from '../contexts/ToastContext';
import Breadcrumb from '../components/Breadcrumb';
import { Search, MapPin, Calendar, Clock, Filter, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

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

// Location options
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
  const [selectedDate, setSelectedDate] = useState('');
  const [filterAvailable, setFilterAvailable] = useState(false);
  const { showToast } = useToast();

  // Filter rooms based on search query and filters
  const filteredRooms = rooms.filter((room) => {
    // Filter by search query
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         room.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by location
    const matchesLocation = selectedLocation === 'all' || room.location === selectedLocation;
    
    // Filter by availability
    const matchesAvailability = !filterAvailable || room.available;
    
    return matchesSearch && matchesLocation && matchesAvailability;
  });

  const handleReservation = (roomId: number) => {
    const room = rooms.find(r => r.id === roomId);
    if (room) {
      showToast(`Redirection vers la réservation pour la salle ${room.name}`, 'info');
      // In a real app, this would navigate to reservation page with the room pre-selected
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedLocation('all');
    setSelectedDate('');
    setFilterAvailable(false);
  };

  return (
    <div className="space-y-6 fade-in">
      <Breadcrumb items={[{ label: 'Salles', path: '/rooms' }]} />
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Salles disponibles
        </h1>
        <p className="text-muted-foreground">Trouvez et réservez la salle idéale pour vos cours</p>
      </div>
      
      {/* Filters */}
      <div className="filter-container">
        <div className="filter-item">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Recherche
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              id="search"
              type="text"
              className="form-input pl-10"
              placeholder="Nom ou description de la salle"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="filter-item">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Localisation
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin size={16} className="text-gray-400" />
            </div>
            <select
              id="location"
              className="form-input pl-10"
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
        </div>
        
        <div className="filter-item">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar size={16} className="text-gray-400" />
            </div>
            <input
              id="date"
              type="date"
              className="form-input pl-10"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>
        
        <div className="filter-item">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Disponibilité
          </label>
          <div className="flex items-center">
            <input
              id="available"
              type="checkbox"
              className="h-4 w-4 text-primary border-gray-300 rounded"
              checked={filterAvailable}
              onChange={(e) => setFilterAvailable(e.target.checked)}
            />
            <label htmlFor="available" className="ml-2 text-sm text-gray-600">
              Seulement les salles disponibles
            </label>
          </div>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm text-gray-500 mb-2 sm:mb-0">
          {filteredRooms.length} salle{filteredRooms.length !== 1 ? 's' : ''} trouvée{filteredRooms.length !== 1 ? 's' : ''}
        </p>
        <button
          className="btn btn-outline flex items-center text-sm"
          onClick={resetFilters}
        >
          <Filter size={16} className="mr-1" />
          Réinitialiser les filtres
        </button>
      </div>
      
      {/* Room List */}
      {filteredRooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <div key={room.id} className="room-card">
              <div className="relative h-40 mb-4 overflow-hidden rounded-lg">
                <img 
                  src={room.image} 
                  alt={room.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    room.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {room.available ? 'Disponible' : 'Occupée'}
                  </span>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold">{room.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{room.description}</p>
              
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <MapPin size={16} className="mr-1" />
                {room.location}
                <span className="mx-2">•</span>
                <span>{room.capacity} places</span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {room.features.map((feature, index) => (
                  <span key={index} className="bg-muted px-2 py-1 rounded-md text-xs">
                    {feature}
                  </span>
                ))}
              </div>
              
              {room.available ? (
                <button
                  className="btn btn-primary w-full"
                  onClick={() => handleReservation(room.id)}
                >
                  Réserver
                </button>
              ) : (
                <div className="text-sm text-red-600 mt-2">
                  Réservée par {room.reservedBy}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold mb-2">Aucune salle trouvée</h3>
          <p className="text-gray-500">Veuillez ajuster vos filtres de recherche</p>
        </div>
      )}
    </div>
  );
};

export default Rooms;
