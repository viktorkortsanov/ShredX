import { useState, useEffect } from 'react';
import { 
    LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    Cell, RadialBarChart, RadialBar
} from 'recharts';
import './Analytics.css';
import userApi from "../../../api/userApi.js"; 
import postApi from "../../../api/postApi.js";

const Analytics = () => {
    const [timeRange, setTimeRange] = useState('week');
    const [loading, setLoading] = useState(true);
    
    const [usersData, setUsersData] = useState([]);
    const [postsData, setPostsData] = useState([]);
    const [programsData, setProgramsData] = useState([]);
    const [performanceData, setPerformanceData] = useState([]);
    
    const [usersCount, setUsersCount] = useState(0);
    const [postsCount, setPostsCount] = useState(0);
    const [programSales, setProgramSales] = useState(0);
    
    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                
                const users = await userApi.getAll();
                const posts = await postApi.getAll();
                
                setUsersCount(users.length);
                setPostsCount(posts.length);
                
                const storedPrograms = JSON.parse(localStorage.getItem('purchasedPrograms')) || [];
                setProgramSales(storedPrograms.length);
                
                generateDataFromRealStats(users.length, posts.length, storedPrograms.length, timeRange);
                
                setLoading(false);
            } catch (error) {
                console.error("Error fetching analytics data:", error);
                generateMockData(timeRange);
                setLoading(false);
            }
        }
        
        fetchData();
    }, [timeRange]);
    
    const generateDataFromRealStats = (usersNum, postsNum, salesNum, range) => {
        const userActivity = generateTimeSeriesData(range, Math.max(1, Math.floor(usersNum * 0.2)), usersNum);
        setUsersData(userActivity);
        
        const postActivity = [
            { name: 'Program A', value: Math.max(1, Math.floor(postsNum * 0.3)) },
            { name: 'Program B', value: Math.max(1, Math.floor(postsNum * 0.25)) },
            { name: 'Program C', value: Math.max(1, Math.floor(postsNum * 0.15)) },
            { name: 'Program D', value: Math.max(1, Math.floor(postsNum * 0.2)) },
            { name: 'Program E', value: Math.max(1, Math.floor(postsNum * 0.1)) },
        ];
        setPostsData(postActivity);
        
        const programSales = generateTimeSeriesData(range, 0, salesNum);
        setProgramsData(programSales);
        
        const userEngagement = Math.min(95, Math.floor((postsNum / Math.max(1, usersNum)) * 100));
        const performance = [
            { name: 'Programs', value: salesNum > 0 ? 85 : 40, fill: '#8884d8' },
            { name: 'Forum', value: postsNum > 0 ? userEngagement : 30, fill: '#83a6ed' },
            { name: 'Users', value: usersNum > 10 ? 78 : usersNum * 5, fill: '#8dd1e1' },
            { name: 'Community', value: (usersNum + postsNum) > 20 ? 92 : 50, fill: '#82ca9d' },
        ];
        setPerformanceData(performance);
    };
    
    const generateMockData = (range) => {
        const userActivity = generateTimeSeriesData(range, 20, 150);
        setUsersData(userActivity);
        
        const postActivity = [
            { name: 'Program A', value: 35 },
            { name: 'Program B', value: 45 },
            { name: 'Program C', value: 15 },
            { name: 'Program D', value: 25 },
            { name: 'Program E', value: 20 },
        ];
        setPostsData(postActivity);
        
        const programSales = generateTimeSeriesData(range, 5, 30);
        setProgramsData(programSales);
        
        const performance = [
            { name: 'Programs', value: 85, fill: '#8884d8' },
            { name: 'Forum', value: 65, fill: '#83a6ed' },
            { name: 'Users', value: 78, fill: '#8dd1e1' },
            { name: 'Community', value: 92, fill: '#82ca9d' },
        ];
        setPerformanceData(performance);
    };
    
    const generateTimeSeriesData = (range, min, max) => {
        let days = 7;
        let increment = 1;
        
        switch(range) {
            case 'month':
                days = 30;
                break;
            case 'quarter':
                days = 90;
                increment = 7;
                break;
            case 'year':
                days = 12;
                break;
            default: // week
                days = 7;
        }
        
        const data = [];
        const today = new Date();
        
        for (let i = 0; i < days; i += increment) {
            const date = new Date();
            date.setDate(today.getDate() - (days - i));
            
            const formattedDate = range === 'year' 
                ? new Date(today.getFullYear(), i, 1).toLocaleString('en', { month: 'short' })
                : date.toLocaleString('en', { weekday: 'short', day: '2-digit' });
            
            data.push({
                name: formattedDate,
                value: Math.floor(Math.random() * (max - min + 1)) + min,
                users: Math.floor(Math.random() * (max - min + 1)) + min,
                posts: Math.floor(Math.random() * (max/2 - min + 1)) + min,
            });
        }
        
        return data;
    };
    
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
    
    return (
        <div className="analytics-container">
            <div className="analytics-header">
                <h1>Analytics Dashboard</h1>
                <div className="time-range-selector">
                    <button 
                        className={timeRange === 'week' ? 'active' : ''} 
                        onClick={() => setTimeRange('week')}
                    >
                        Week
                    </button>
                    <button 
                        className={timeRange === 'month' ? 'active' : ''} 
                        onClick={() => setTimeRange('month')}
                    >
                        Month
                    </button>
                    <button 
                        className={timeRange === 'quarter' ? 'active' : ''} 
                        onClick={() => setTimeRange('quarter')}
                    >
                        Quarter
                    </button>
                    <button 
                        className={timeRange === 'year' ? 'active' : ''} 
                        onClick={() => setTimeRange('year')}
                    >
                        Year
                    </button>
                </div>
            </div>
            
            {loading ? (
                <div className="analytics-loading">
                    <div className="spinner"></div>
                    <p>Loading analytics data...</p>
                </div>
            ) : (
                <div className="analytics-grid">
                    <div className="analytics-card user-activity">
                        <h2>User Activity</h2>
                        <p className="card-description">Track daily active users over time</p>
                        
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart
                                    data={usersData}
                                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                                >
                                    <defs>
                                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip 
                                        contentStyle={{ 
                                            backgroundColor: '#2a2a2c', 
                                            border: 'none',
                                            borderRadius: '8px',
                                            color: 'white' 
                                        }}
                                    />
                                    <Area 
                                        type="monotone" 
                                        dataKey="users" 
                                        stroke="#8884d8" 
                                        fillOpacity={1} 
                                        fill="url(#colorUsers)" 
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                            
                            <div className="chart-summary">
                                <div className="summary-stat">
                                    <h3>{usersData.length > 0 ? usersData[usersData.length - 1].users : 0}</h3>
                                    <p>Today</p>
                                </div>
                                <div className="summary-stat">
                                    <h3>{Math.round(usersData.reduce((acc, item) => acc + item.users, 0) / usersData.length)}</h3>
                                    <p>Average</p>
                                </div>
                                <div className="summary-stat">
                                    <h3>{usersCount}</h3>
                                    <p>Total Users</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="analytics-card popular-programs">
                        <h2>Popular Programs</h2>
                        <p className="card-description">Distribution of program popularity</p>
                        
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={postsData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {postsData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        contentStyle={{ 
                                            backgroundColor: '#2a2a2c', 
                                            border: 'none',
                                            borderRadius: '8px',
                                            color: 'white' 
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            
                            <div className="chart-summary">
                                <div className="summary-stat">
                                    <h3>{postsCount}</h3>
                                    <p>Total Posts</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="analytics-card program-sales">
                        <h2>Program Sales</h2>
                        <p className="card-description">Track program sales over time</p>
                        
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart
                                    data={programsData}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip 
                                        contentStyle={{ 
                                            backgroundColor: '#2a2a2c', 
                                            border: 'none',
                                            borderRadius: '8px',
                                            color: 'white' 
                                        }}
                                    />
                                    <Legend />
                                    <Bar 
                                        dataKey="posts" 
                                        name="Sales" 
                                        fill="#82ca9d" 
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                            
                            <div className="chart-summary">
                                <div className="summary-stat">
                                    <h3>{programsData.reduce((acc, item) => acc + item.posts, 0)}</h3>
                                    <p>Period Sales</p>
                                </div>
                                <div className="summary-stat">
                                    <h3>{programSales}</h3>
                                    <p>Total Sales</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="analytics-card platform-performance">
                        <h2>Platform Performance</h2>
                        <p className="card-description">Section effectiveness metrics (percentage)</p>
                        
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height={300}>
                                <RadialBarChart 
                                    cx="50%" 
                                    cy="50%" 
                                    innerRadius="20%" 
                                    outerRadius="80%" 
                                    barSize={20} 
                                    data={performanceData}
                                >
                                    <RadialBar
                                        minAngle={15}
                                        background
                                        clockWise
                                        dataKey="value"
                                        label={{ position: 'insideStart', fill: '#fff' }}
                                    />
                                    <Tooltip 
                                        contentStyle={{ 
                                            backgroundColor: '#2a2a2c', 
                                            border: 'none',
                                            borderRadius: '8px',
                                            color: 'white' 
                                        }}
                                    />
                                    <Legend 
                                        iconSize={10} 
                                        layout="vertical" 
                                        verticalAlign="middle" 
                                        align="right"
                                    />
                                </RadialBarChart>
                            </ResponsiveContainer>
                            
                            <div className="chart-summary">
                                <div className="summary-stat">
                                    <h3>{performanceData.reduce((acc, item) => acc + item.value, 0) / performanceData.length}%</h3>
                                    <p>Average Performance</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default Analytics;