
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

// Mock data for visualization
const completionData = [
  { name: 'Completed', value: 0 },
  { name: 'Missed', value: 1 },
];

const weeklyData = [
  { name: 'Mon', completed: 0, target: 1 },
  { name: 'Tue', completed: 0, target: 1 },
  { name: 'Wed', completed: 0, target: 1 },
  { name: 'Thu', completed: 0, target: 1 },
  { name: 'Fri', completed: 0, target: 1 },
  { name: 'Sat', completed: 0, target: 1 },
  { name: 'Sun', completed: 0, target: 1 },
];

const COLORS = ['#3B82F6', '#E5E7EB'];

const ProgressStats = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Training Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly">
          <TabsList className="mb-4">
            <TabsTrigger value="weekly">Weekly View</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weekly">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-2">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={weeklyData}
                      margin={{ top: 10, right: 0, left: -25, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="completed" name="Completed" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="target" name="Target" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div>
                <div className="h-64 flex flex-col justify-between">
                  <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={completionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {completionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-3xl font-bold">0%</p>
                    <p className="text-gray-500 text-sm">Completion Rate</p>
                  </div>
                  
                  <div className="flex justify-between">
                    <div className="text-center flex-1">
                      <div className="flex items-center justify-center gap-1 text-red-500">
                        <ArrowDownRight className="h-4 w-4" />
                        <span className="text-sm font-medium">0%</span>
                      </div>
                      <p className="text-xs text-gray-500">Accuracy</p>
                    </div>
                    <div className="text-center flex-1">
                      <div className="flex items-center justify-center gap-1 text-red-500">
                        <ArrowDownRight className="h-4 w-4" />
                        <span className="text-sm font-medium">0%</span>
                      </div>
                      <p className="text-xs text-gray-500">Response Time</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="monthly">
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-500">Complete your first session to see monthly stats</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProgressStats;
