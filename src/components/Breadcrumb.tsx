
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

type BreadcrumbItem = {
  label: string;
  path: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="breadcrumb">
      <ol className="flex items-center space-x-2">
        <li className="breadcrumb-item">
          <Link to="/dashboard" className="text-gray-600 hover:text-primary">
            Accueil
          </Link>
        </li>
        
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <ChevronRight size={16} className="text-gray-400" />
            <li className="breadcrumb-item">
              {index === items.length - 1 ? (
                <span className="text-primary">{item.label}</span>
              ) : (
                <Link to={item.path} className="text-gray-600 hover:text-primary">
                  {item.label}
                </Link>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
