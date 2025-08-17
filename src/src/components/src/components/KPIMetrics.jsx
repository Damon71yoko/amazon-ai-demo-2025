import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, Package, Users, Star } from 'lucide-react';

const KPIMetrics = () => {
  const [metrics, setMetrics] = useState({
    deliverySuccess: 94.2,
    dailySavings: 47120,
    totalDeliveries: 2847,
    customerSatisfaction: 4.87,
    activeDrivers: 156,
    avgDeliveryTime: 23.4
  });

  const [animatedValues, setAnimatedValues] = useState({
    deliverySuccess: 0,
    dailySavings: 0,
    totalDeliveries: 0,
    customerSatisfaction: 0,
    activeDrivers: 0,
    avgDeliveryTime: 0
  });

  useEffect(() => {
    // Animate values on mount
    const animateValue = (key, target, duration = 2000) => {
      const start = 0;
      const increment = target / (duration / 16);
      let current = start;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setAnimatedValues(prev => ({ ...prev, [key]: current }));
      }, 16);
    };

    Object.entries(metrics).forEach(([key, value]) => {
      animateValue(key, value);
    });

    // Simulate real-time updates
    const updateTimer = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        deliverySuccess: Math.min(99.9, prev.deliverySuccess + (Math.random() - 0.5) * 0.1),
        dailySavings: prev.dailySavings + Math.floor(Math.random() * 100),
        totalDeliveries: prev.totalDeliveries + Math.floor(Math.random() * 3),
        customerSatisfaction: Math.min(5.0, Math.max(4.5, prev.customerSatisfaction + (Math.random() - 0.5) * 0.01)),
        activeDrivers: Math.max(140, Math.min(180, prev.activeDrivers + Math.floor((Math.random() - 0.5) * 2))),
        avgDeliveryTime: Math.max(20, Math.min(30, prev.avgDeliveryTime + (Math.random() - 0.5) * 0.5))
      }));
    }, 3000);

    return () => clearInterval(updateTimer);
  }, []);

  useEffect(() => {
    // Update animated values when metrics change
    Object.entries(metrics).forEach(([key, value]) => {
      setAnimatedValues(prev => ({ ...prev, [key]: value }));
    });
  }, [metrics]);

  const kpiCards = [
    {
      title: 'Delivery Success Rate',
      value: `${animatedValues.deliverySuccess.toFixed(1)}%`,
      change: '+2.3%',
      trend: 'up',
      icon: Package,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'vs last month'
    },
    {
      title: 'Daily Cost Savings',
      value: `$${animatedValues.dailySavings.toLocaleString()}`,
      change: '+$12K',
      trend: 'up',
      icon: DollarSign,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      description: 'today'
    },
    {
      title: 'Total Deliveries',
      value: animatedValues.totalDeliveries.toLocaleString(),
      change: '+847',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'today'
    },
    {
      title: 'Customer Satisfaction',
      value: `${animatedValues.customerSatisfaction.toFixed(2)}/5`,
      change: '+0.12',
      trend: 'up',
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      description: 'rating'
    },
    {
      title: 'Active Drivers',
      value: Math.floor(animatedValues.activeDrivers).toString(),
      change: '+8',
      trend: 'up',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'online now'
    },
    {
      title: 'Avg Delivery Time',
      value: `${animatedValues.avgDeliveryTime.toFixed(1)}m`,
      change: '-2.1m',
      trend: 'down',
      icon: TrendingDown,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      description: 'improvement'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {kpiCards.map((kpi, index) => {
        const Icon = kpi.icon;
        const TrendIcon = kpi.trend === 'up' ? TrendingUp : TrendingDown;
        
        return (
          <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${kpi.bgColor}`}>
                  <Icon className={`h-6 w-6 ${kpi.color}`} />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendIcon className="h-4 w-4" />
                  <span className="font-medium">{kpi.change}</span>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-600 mb-1">
                  {kpi.title}
                </h3>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {kpi.value}
                  </span>
                  <span className="text-sm text-gray-500">
                    {kpi.description}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default KPIMetrics;
