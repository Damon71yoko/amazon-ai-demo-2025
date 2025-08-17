import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, AlertTriangle, CheckCircle, Clock, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const PredictiveInsights = () => {
  const [insights, setInsights] = useState([]);
  const [predictions, setPredictions] = useState({
    etaAccuracy: 96.7,
    riskPrediction: 92.8,
    costSavings: 2.8,
    deliverySuccess: 94.2
  });

  useEffect(() => {
    const initialInsights = [
      {
        id: 1,
        type: 'optimization',
        priority: 'high',
        title: 'Route Optimization Opportunity',
        description: 'AI detected 15% efficiency gain possible on Route 7 by adjusting delivery sequence.',
        impact: '+$1,200 daily savings',
        confidence: 94,
        icon: Target,
        color: 'text-green-600',
        bgColor: 'bg-green-50'
      },
      {
        id: 2,
        type: 'risk',
        priority: 'medium',
        title: 'Weather Impact Alert',
        description: 'Predicted rain at 3 PM may delay 8 deliveries in Capitol Hill area.',
        impact: '12 min avg delay',
        confidence: 87,
        icon: AlertTriangle,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50'
      },
      {
        id: 3,
        type: 'success',
        priority: 'low',
        title: 'Customer Availability Prediction',
        description: 'AI predicts 96% customer availability for afternoon deliveries based on historical data.',
        impact: '+3% success rate',
        confidence: 91,
        icon: CheckCircle,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50'
      },
      {
        id: 4,
        type: 'efficiency',
        priority: 'high',
        title: 'Driver Performance Insight',
        description: 'Sarah Chen consistently outperforms ETA predictions by 8%. Consider route expansion.',
        impact: '+5 deliveries/day',
        confidence: 98,
        icon: TrendingUp,
        color: 'text-purple-600',
        bgColor: 'bg-purple-50'
      }
    ];

    setInsights(initialInsights);

    // Simulate real-time prediction updates
    const updateTimer = setInterval(() => {
      setPredictions(prev => ({
        etaAccuracy: Math.min(99.9, Math.max(90, prev.etaAccuracy + (Math.random() - 0.5) * 0.2)),
        riskPrediction: Math.min(99.9, Math.max(85, prev.riskPrediction + (Math.random() - 0.5) * 0.3)),
        costSavings: Math.max(2.0, Math.min(4.0, prev.costSavings + (Math.random() - 0.5) * 0.1)),
        deliverySuccess: Math.min(99.9, Math.max(90, prev.deliverySuccess + (Math.random() - 0.5) * 0.1))
      }));
    }, 5000);

    return () => clearInterval(updateTimer);
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Performance Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Brain className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-600">ETA Accuracy</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {predictions.etaAccuracy.toFixed(1)}%
            </div>
            <div className="text-xs text-green-600 mt-1">+0.3% vs yesterday</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <span className="text-sm font-medium text-gray-600">Risk Prediction</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {predictions.riskPrediction.toFixed(1)}%
            </div>
            <div className="text-xs text-green-600 mt-1">+1.2% vs yesterday</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-gray-600">Monthly Savings</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              ${predictions.costSavings.toFixed(1)}M
            </div>
            <div className="text-xs text-green-600 mt-1">+$200K vs last month</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-gray-600">Success Rate</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {predictions.deliverySuccess.toFixed(1)}%
            </div>
            <div className="text-xs text-green-600 mt-1">+2.1% vs last month</div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Brain className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">AI Insights & Recommendations</h3>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Live Analysis</span>
          </div>
        </div>

        <div className="space-y-3">
          {insights.map((insight) => {
            const Icon = insight.icon;
            return (
              <div
                key={insight.id}
                className={`bg-white border-l-4 ${getPriorityColor(insight.priority)} rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${insight.bgColor}`}>
                    <Icon className={`h-5 w-5 ${insight.color}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-900">{insight.title}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">
                          {insight.confidence}% confidence
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          insight.priority === 'high' ? 'bg-red-100 text-red-800' :
                          insight.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {insight.priority}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">
                        Impact: {insight.impact}
                      </span>
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>Updated 2 min ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Model Status */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900 mb-1">AI Model Performance</h4>
            <p className="text-sm text-gray-600">
              SageMaker XGBoost model trained on 2.3M delivery records
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">99.2%</div>
            <div className="text-xs text-gray-500">Model Accuracy</div>
          </div>
        </div>
        
        <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-gray-600">Training Data</div>
            <div className="font-medium">2.3M records</div>
          </div>
          <div>
            <div className="text-gray-600">Last Updated</div>
            <div className="font-medium">2 hours ago</div>
          </div>
          <div>
            <div className="text-gray-600">Predictions/Day</div>
            <div className="font-medium">42,300+</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictiveInsights;
