import React, { useState, useEffect } from 'react';
import { User, Phone, MessageSquare, MapPin, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DriverPanel = () => {
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);

  useEffect(() => {
    const initialDrivers = [
      {
        id: 'D001',
        name: 'Sarah Chen',
        status: 'active',
        vehicle: 'V001',
        packages: 12,
        completedToday: 28,
        rating: 4.9,
        location: 'Downtown Seattle',
        phone: '+1 (555) 123-4567',
        efficiency: 94,
        onTimeRate: 98
      },
      {
        id: 'D002',
        name: 'Mike Rodriguez',
        status: 'active',
        vehicle: 'V002',
        packages: 8,
        completedToday: 22,
        rating: 4.7,
        location: 'Capitol Hill',
        phone: '+1 (555) 234-5678',
        efficiency: 87,
        onTimeRate: 95
      },
      {
        id: 'D003',
        name: 'Emily Johnson',
        status: 'break',
        vehicle: 'V003',
        packages: 15,
        completedToday: 31,
        rating: 4.8,
        location: 'SoDo District',
        phone: '+1 (555) 345-6789',
        efficiency: 91,
        onTimeRate: 97
      },
      {
        id: 'D004',
        name: 'David Kim',
        status: 'active',
        vehicle: 'V004',
        packages: 6,
        completedToday: 19,
        rating: 4.9,
        location: 'Pioneer Square',
        phone: '+1 (555) 456-7890',
        efficiency: 96,
        onTimeRate: 99
      },
      {
        id: 'D005',
        name: 'Lisa Wang',
        status: 'offline',
        vehicle: 'V005',
        packages: 2,
        completedToday: 25,
        rating: 4.6,
        location: 'Belltown',
        phone: '+1 (555) 567-8901',
        efficiency: 89,
        onTimeRate: 93
      }
    ];

    setDrivers(initialDrivers);
    setSelectedDriver(initialDrivers[0]);

    // Simulate real-time updates
    const updateTimer = setInterval(() => {
      setDrivers(prev => prev.map(driver => ({
        ...driver,
        packages: Math.max(0, driver.packages + Math.floor((Math.random() - 0.7) * 2)),
        completedToday: driver.completedToday + (Math.random() > 0.8 ? 1 : 0)
      })));
    }, 10000);

    return () => clearInterval(updateTimer);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'break': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Active';
      case 'break': return 'On Break';
      case 'offline': return 'Offline';
      default: return 'Unknown';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Driver List */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-3">
          {drivers.map((driver) => (
            <div
              key={driver.id}
              className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                selectedDriver?.id === driver.id
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
              onClick={() => setSelectedDriver(driver)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{driver.name}</div>
                    <div className="text-xs text-gray-500">{driver.vehicle}</div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(driver.status)}`}>
                  {getStatusText(driver.status)}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                <div>Packages: <span className="font-medium">{driver.packages}</span></div>
                <div>Rating: <span className="font-medium">{driver.rating}★</span></div>
                <div>Completed: <span className="font-medium">{driver.completedToday}</span></div>
                <div>Efficiency: <span className="font-medium">{driver.efficiency}%</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Driver Details */}
      {selectedDriver && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3">{selectedDriver.name}</h3>
          
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-gray-600">Status</div>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedDriver.status)}`}>
                  {getStatusText(selectedDriver.status)}
                </span>
              </div>
              <div>
                <div className="text-gray-600">Vehicle</div>
                <div className="font-medium">{selectedDriver.vehicle}</div>
              </div>
              <div>
                <div className="text-gray-600">Current Packages</div>
                <div className="font-medium">{selectedDriver.packages}</div>
              </div>
              <div>
                <div className="text-gray-600">Completed Today</div>
                <div className="font-medium">{selectedDriver.completedToday}</div>
              </div>
              <div>
                <div className="text-gray-600">Rating</div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{selectedDriver.rating}</span>
                </div>
              </div>
              <div>
                <div className="text-gray-600">On-Time Rate</div>
                <div className="font-medium">{selectedDriver.onTimeRate}%</div>
              </div>
            </div>

            <div>
              <div className="text-gray-600 text-sm">Current Location</div>
              <div className="flex items-center space-x-1 text-sm">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="font-medium">{selectedDriver.location}</span>
              </div>
            </div>

            <div className="flex space-x-2 pt-2">
              <Button size="sm" variant="outline" className="flex-1">
                <Phone className="h-4 w-4 mr-1" />
                Call
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <MessageSquare className="h-4 w-4 mr-1" />
                Message
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-sm mb-2">Team Performance</h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <div className="text-gray-600">Active Drivers</div>
            <div className="font-bold text-blue-600">
              {drivers.filter(d => d.status === 'active').length}
            </div>
          </div>
          <div>
            <div className="text-gray-600">Avg Rating</div>
            <div className="font-bold text-blue-600">
              {(drivers.reduce((sum, d) => sum + d.rating, 0) / drivers.length).toFixed(1)}★
            </div>
          </div>
          <div>
            <div className="text-gray-600">Total Packages</div>
            <div className="font-bold text-blue-600">
              {drivers.reduce((sum, d) => sum + d.packages, 0)}
            </div>
          </div>
          <div>
            <div className="text-gray-600">Avg Efficiency</div>
            <div className="font-bold text-blue-600">
              {Math.round(drivers.reduce((sum, d) => sum + d.efficiency, 0) / drivers.length)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverPanel;
