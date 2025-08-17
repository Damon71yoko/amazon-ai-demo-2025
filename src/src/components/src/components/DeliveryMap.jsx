import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Clock, Package } from 'lucide-react';

const DeliveryMap = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  // Simulate vehicle data
  useEffect(() => {
    const initialVehicles = [
      {
        id: 'V001',
        driver: 'Sarah Chen',
        lat: 47.6062,
        lng: -122.3321,
        status: 'delivering',
        packages: 12,
        eta: '14 min',
        route: 'Downtown Seattle',
        efficiency: 94
      },
      {
        id: 'V002',
        driver: 'Mike Rodriguez',
        lat: 47.6205,
        lng: -122.3493,
        status: 'en_route',
        packages: 8,
        eta: '22 min',
        route: 'Capitol Hill',
        efficiency: 87
      },
      {
        id: 'V003',
        driver: 'Emily Johnson',
        lat: 47.5952,
        lng: -122.3316,
        status: 'loading',
        packages: 15,
        eta: '8 min',
        route: 'SoDo District',
        efficiency: 91
      },
      {
        id: 'V004',
        driver: 'David Kim',
        lat: 47.6097,
        lng: -122.3331,
        status: 'delivering',
        packages: 6,
        eta: '18 min',
        route: 'Pioneer Square',
        efficiency: 96
      },
      {
        id: 'V005',
        driver: 'Lisa Wang',
        lat: 47.6145,
        lng: -122.3418,
        status: 'returning',
        packages: 2,
        eta: '31 min',
        route: 'Belltown',
        efficiency: 89
      }
    ];

    setVehicles(initialVehicles);

    // Simulate real-time vehicle movement
    const moveTimer = setInterval(() => {
      setVehicles(prev => prev.map(vehicle => ({
        ...vehicle,
        lat: vehicle.lat + (Math.random() - 0.5) * 0.001,
        lng: vehicle.lng + (Math.random() - 0.5) * 0.001,
        eta: Math.max(1, parseInt(vehicle.eta) + Math.floor((Math.random() - 0.5) * 2)) + ' min'
      })));
    }, 5000);

    return () => clearInterval(moveTimer);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivering': return 'bg-green-500';
      case 'en_route': return 'bg-blue-500';
      case 'loading': return 'bg-yellow-500';
      case 'returning': return 'bg-gray-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'delivering': return 'Delivering';
      case 'en_route': return 'En Route';
      case 'loading': return 'Loading';
      case 'returning': return 'Returning';
      default: return 'Unknown';
    }
  };

  return (
    <div className="h-96 bg-gray-100 relative overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 400 300">
            {/* Street grid */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#cbd5e1" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Major roads */}
            <path d="M0,150 L400,150" stroke="#94a3b8" strokeWidth="3" />
            <path d="M200,0 L200,300" stroke="#94a3b8" strokeWidth="3" />
            <path d="M100,0 L100,300" stroke="#94a3b8" strokeWidth="2" />
            <path d="M300,0 L300,300" stroke="#94a3b8" strokeWidth="2" />
            <path d="M0,100 L400,100" stroke="#94a3b8" strokeWidth="2" />
            <path d="M0,200 L400,200" stroke="#94a3b8" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* Vehicle Markers */}
      {vehicles.map((vehicle, index) => (
        <div
          key={vehicle.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          style={{
            left: `${20 + (index * 15) + Math.sin(Date.now() / 1000 + index) * 5}%`,
            top: `${30 + (index * 12) + Math.cos(Date.now() / 1000 + index) * 3}%`
          }}
          onClick={() => setSelectedVehicle(vehicle)}
        >
          <div className={`w-4 h-4 rounded-full ${getStatusColor(vehicle.status)} border-2 border-white shadow-lg animate-pulse`}>
          </div>
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg text-xs font-medium whitespace-nowrap">
            {vehicle.id}
          </div>
        </div>
      ))}

      {/* Legend */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4">
        <h3 className="font-semibold text-sm mb-2">Vehicle Status</h3>
        <div className="space-y-1">
          {[
            { status: 'delivering', label: 'Delivering', color: 'bg-green-500' },
            { status: 'en_route', label: 'En Route', color: 'bg-blue-500' },
            { status: 'loading', label: 'Loading', color: 'bg-yellow-500' },
            { status: 'returning', label: 'Returning', color: 'bg-gray-500' }
          ].map(item => (
            <div key={item.status} className="flex items-center space-x-2 text-xs">
              <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Panel */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4">
        <h3 className="font-semibold text-sm mb-2">Live Stats</h3>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span>Active Vehicles:</span>
            <span className="font-medium">{vehicles.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Packages:</span>
            <span className="font-medium">{vehicles.reduce((sum, v) => sum + v.packages, 0)}</span>
          </div>
          <div className="flex justify-between">
            <span>Avg Efficiency:</span>
            <span className="font-medium">{Math.round(vehicles.reduce((sum, v) => sum + v.efficiency, 0) / vehicles.length)}%</span>
          </div>
        </div>
      </div>

      {/* Vehicle Detail Modal */}
      {selectedVehicle && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">Vehicle {selectedVehicle.id}</h3>
              <button
                onClick={() => setSelectedVehicle(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(selectedVehicle.status)}`}></div>
                <span className="font-medium">{getStatusText(selectedVehicle.status)}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">Driver</div>
                  <div className="font-medium">{selectedVehicle.driver}</div>
                </div>
                <div>
                  <div className="text-gray-600">Route</div>
                  <div className="font-medium">{selectedVehicle.route}</div>
                </div>
                <div>
                  <div className="text-gray-600">Packages</div>
                  <div className="font-medium">{selectedVehicle.packages}</div>
                </div>
                <div>
                  <div className="text-gray-600">ETA</div>
                  <div className="font-medium">{selectedVehicle.eta}</div>
                </div>
                <div>
                  <div className="text-gray-600">Efficiency</div>
                  <div className="font-medium">{selectedVehicle.efficiency}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryMap;
