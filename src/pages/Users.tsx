
import React, { useState } from 'react';
import { useToast } from '../contexts/ToastContext';
import Breadcrumb from '../components/Breadcrumb';
import { Search, UserPlus, Edit, Trash, User, Filter } from 'lucide-react';

// Mock data for users
const mockUsers = [
  {
    id: 1,
    name: 'Dr. Jean Dupont',
    email: 'jean.dupont@university.fr',
    role: 'PROFESSOR',
    department: 'Informatique',
  },
  {
    id: 2,
    name: 'Dr. Marie Martin',
    email: 'marie.martin@university.fr',
    role: 'PROFESSOR',
    department: 'Mathématiques',
  },
  {
    id: 3,
    name: 'Dr. Luc Bernard',
    email: 'luc.bernard@university.fr',
    role: 'PROFESSOR',
    department: 'Physique',
  },
  {
    id: 4,
    name: 'Admin Robert',
    email: 'admin.robert@university.fr',
    role: 'ADMIN',
    department: 'Administration',
  },
  {
    id: 5,
    name: 'Dr. Sophie Durand',
    email: 'sophie.durand@university.fr',
    role: 'PROFESSOR',
    department: 'Chimie',
  },
  {
    id: 6,
    name: 'Dr. Pierre Lefebvre',
    email: 'pierre.lefebvre@university.fr',
    role: 'PROFESSOR',
    department: 'Biologie',
  },
  {
    id: 7,
    name: 'Admin Claire',
    email: 'claire@university.fr',
    role: 'ADMIN',
    department: 'Administration',
  },
];

// Department options
const departmentOptions = [
  { value: 'all', label: 'Tous les départements' },
  { value: 'Informatique', label: 'Informatique' },
  { value: 'Mathématiques', label: 'Mathématiques' },
  { value: 'Physique', label: 'Physique' },
  { value: 'Chimie', label: 'Chimie' },
  { value: 'Biologie', label: 'Biologie' },
  { value: 'Administration', label: 'Administration' },
];

// Role options
const roleOptions = [
  { value: 'all', label: 'Tous les rôles' },
  { value: 'PROFESSOR', label: 'Professeur' },
  { value: 'ADMIN', label: 'Administrateur' },
];

const Users: React.FC = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');
  const { showToast } = useToast();

  // Filter users based on search query and filters
  const filteredUsers = users.filter((user) => {
    // Filter by search query
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by department
    const matchesDepartment = selectedDepartment === 'all' || user.department === selectedDepartment;
    
    // Filter by role
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    
    return matchesSearch && matchesDepartment && matchesRole;
  });

  // Handle user deletion
  const handleDeleteUser = (id: number) => {
    // Open a confirm dialog
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      // In a real app, you would call an API to delete the user
      setUsers(users.filter(user => user.id !== id));
      showToast('Utilisateur supprimé avec succès', 'success');
    }
  };

  // Handle editing a user
  const handleEditUser = (id: number) => {
    const user = users.find(u => u.id === id);
    if (user) {
      showToast(`Modification de l'utilisateur ${user.name}`, 'info');
      // In a real app, this would open a modal or navigate to an edit page
    }
  };

  // Handle adding a new user
  const handleAddUser = () => {
    showToast('Ouverture du formulaire d\'ajout d\'utilisateur', 'info');
    // In a real app, this would open a modal or navigate to an add user page
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedDepartment('all');
    setSelectedRole('all');
  };

  return (
    <div className="space-y-6 fade-in">
      <Breadcrumb items={[{ label: 'Utilisateurs', path: '/users' }]} />
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Gestion des utilisateurs
        </h1>
        <button
          className="btn btn-primary flex items-center"
          onClick={handleAddUser}
        >
          <UserPlus size={18} className="mr-2" />
          Ajouter un utilisateur
        </button>
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
              placeholder="Nom ou email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="filter-item">
          <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
            Département
          </label>
          <select
            id="department"
            className="form-input"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            {departmentOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="filter-item">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
            Rôle
          </label>
          <select
            id="role"
            className="form-input"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            {roleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm text-gray-500 mb-2 sm:mb-0">
          {filteredUsers.length} utilisateur{filteredUsers.length !== 1 ? 's' : ''} trouvé{filteredUsers.length !== 1 ? 's' : ''}
        </p>
        <button
          className="btn btn-outline flex items-center text-sm"
          onClick={resetFilters}
        >
          <Filter size={16} className="mr-1" />
          Réinitialiser les filtres
        </button>
      </div>
      
      {/* Users Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Département</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white mr-2">
                    {user.name.charAt(0)}
                  </div>
                  {user.name}
                </td>
                <td>{user.email}</td>
                <td>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.role === 'ADMIN' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user.role === 'ADMIN' ? 'Admin' : 'Professeur'}
                  </span>
                </td>
                <td>{user.department}</td>
                <td>
                  <div className="flex space-x-2">
                    <button
                      className="p-1 text-blue-600 hover:text-blue-800"
                      onClick={() => handleEditUser(user.id)}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="p-1 text-red-600 hover:text-red-800"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Empty State */}
      {filteredUsers.length === 0 && (
        <div className="text-center py-10">
          <div className="text-4xl mb-4">👥</div>
          <h3 className="text-lg font-semibold mb-2">Aucun utilisateur trouvé</h3>
          <p className="text-gray-500">Veuillez ajuster vos filtres de recherche</p>
        </div>
      )}
    </div>
  );
};

export default Users;
