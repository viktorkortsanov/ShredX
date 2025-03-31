/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    Cell, RadialBarChart, RadialBar
} from 'recharts';
import { Link } from 'react-router-dom';
import './analytics.css';
import userApi from "../../../api/userApi.js";
import postApi from "../../../api/postApi.js";
import programApi from "../../../api/programApi.js";

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
                const programs = await programApi.getAllPrograms();

                setUsersCount(users.length);
                setPostsCount(posts.length);

                const storedPrograms = JSON.parse(localStorage.getItem('purchasedPrograms')) || [];
                setProgramSales(storedPrograms.length);

                generateDataFromRealStats(users, posts, storedPrograms, programs, timeRange);

                setLoading(false);
            } catch (error) {
                console.error("Error fetching analytics data:", error);
                setLoading(false);
            }
        }

        fetchData();
    }, [timeRange]);

    const generateDataFromRealStats = (users, posts, storedPrograms, allPrograms, range) => {
        // Подготвяме данни за активност на потребители
        const userRegistrationDates = users.map(user => new Date(user.createdAt || Date.now()));
        const userActivityData = prepareTimeSeriesData(userRegistrationDates, range, 'users');
        setUsersData(userActivityData);

        // Подготвяме данни за популярност на програмите
        const programStats = populateProgramStats(storedPrograms, allPrograms);

        // Ако няма данни за програмите, използваме мокнати данни
        if (programStats.length === 0 || programStats.every(item => item.value === 0)) {
            const mockProgramData = [
                { name: 'Push, Pull, Legs', value: 35 },
                { name: 'Upper Lower', value: 25 },
                { name: 'Full Body', value: 20 },
                { name: 'Bro Split', value: 15 },
                { name: 'Arnold Split', value: 5 }
            ];
            setPostsData(mockProgramData);
        } else {
            setPostsData(programStats);
        }

        // Подготвяме данни за продажби на програми
        const purchaseDates = JSON.parse(localStorage.getItem('purchaseDates')) || {};

        const programPurchaseDates = storedPrograms.map(programId => {
            const purchaseDate = purchaseDates[programId] || new Date().toISOString();
            return new Date(purchaseDate);
        });

        const programSalesData = prepareTimeSeriesData(programPurchaseDates, range, 'posts');
        setProgramsData(programSalesData);

        // Подготвяме данни за ефективност на платформата
        const performanceMetrics = calculatePerformance(users, posts, storedPrograms, allPrograms);
        setPerformanceData(performanceMetrics);
    };

    // Функция за изчисляване на статистика за програмите
    const populateProgramStats = (purchasedPrograms, allPrograms) => {
        // Броим колко пъти е закупена всяка програма
        const programCounts = {};

        purchasedPrograms.forEach(programId => {
            programCounts[programId] = (programCounts[programId] || 0) + 1;
        });

        // Преобразуваме в масив за диаграмата
        const result = allPrograms.map(program => {
            const programId = program.id ? program.id.toString() : '';
            return {
                name: program.name || 'Unnamed Program',
                value: programCounts[programId] || 0
            };
        });

        // Ако нямаме програми със закупувания, показваме всички с 0
        if (result.every(item => item.value === 0) && result.length > 0) {
            return result;
        }

        // Филтрираме и сортираме само програмите, които имат поне една покупка
        const filteredResult = result.filter(item => item.value > 0);
        return filteredResult.length > 0 ? filteredResult.sort((a, b) => b.value - a.value) : result;
    };

    // Изчисляване на ефективност на платформата
    const calculatePerformance = (users, posts, purchasedPrograms, allPrograms) => {
        const totalUsers = users.length;
        const totalPosts = posts.length;
        const totalPurchases = purchasedPrograms.length;
        const totalPrograms = allPrograms.length;

        // Потребителска активност: съотношение постове/потребители
        const userEngagementPercentage = totalUsers > 0
            ? Math.min(95, Math.round((totalPosts / totalUsers) * 100))
            : 0;

        // Продажба на програми: съотношение продажби/програми
        let programAdoptionPercentage = 0;
        if (totalUsers > 0 && totalPrograms > 0) {
            // Максимално възможни продажби биха били, ако всеки потребител купи всяка програма
            const maxPossibleSales = totalUsers * totalPrograms;
            programAdoptionPercentage = Math.min(95, Math.round((totalPurchases / maxPossibleSales) * 100 * 5));
        }

        // Активност на форума: колко от постовете имат коментари
        const forumActivityPercentage = totalPosts > 0
            ? Math.min(95, Math.round((posts.filter(p => p.comments && p.comments.length > 0).length / totalPosts) * 100) || 50)
            : 0;

        // Общностна метрика: средно от всички метрики
        const communityScore = Math.min(95, Math.round(
            (userEngagementPercentage + programAdoptionPercentage + forumActivityPercentage) / 3
        ));

        return [
            { name: 'Programs', value: programAdoptionPercentage || 40, fill: '#8884d8' },
            { name: 'Forum', value: forumActivityPercentage || 30, fill: '#83a6ed' },
            { name: 'Users', value: userEngagementPercentage || 50, fill: '#8dd1e1' },
            { name: 'Community', value: communityScore || 40, fill: '#82ca9d' },
        ];
    };

    const prepareTimeSeriesData = (dates, range, dataKey) => {

        const today = new Date();
        let days = 7;
        let increment = 1;
        let formatType = 'day';

        switch (range) {
            case 'month':
                days = 30;
                break;
            case 'quarter':
                days = 90;
                increment = 7;
                formatType = 'week';
                break;
            case 'year':
                days = 12;
                formatType = 'month';
                break;
            default: // week
                days = 7;
                break;
        }

        // Създаваме обект с ключове по дати и нулеви стойности за всички дати в диапазона
        const dataByDate = {};

        for (let i = 0; i < days; i += increment) {
            let date = new Date();

            if (formatType === 'month') {
                //  годишен изглед
                date = new Date(today.getFullYear(), today.getMonth() - (days - i - 1), 1);
                const formattedDate = date.toLocaleString('en', { month: 'short' });
                dataByDate[formattedDate] = {
                    name: formattedDate,
                    users: 0,
                    posts: 0,
                    value: 0,
                    date: new Date(date) // Запазваме датата за сортиране
                };
            } else if (formatType === 'week') {
                // тримесечен изглед
                date.setDate(today.getDate() - (days - i));
                const weekStart = new Date(date);
                weekStart.setDate(weekStart.getDate() - weekStart.getDay());
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 6);

                const formattedDate = `${weekStart.toLocaleString('en', { month: 'short', day: '2-digit' })} - ${weekEnd.toLocaleString('en', { month: 'short', day: '2-digit' })}`;
                dataByDate[formattedDate] = {
                    name: formattedDate,
                    users: 0,
                    posts: 0,
                    value: 0,
                    date: new Date(date)
                };
            } else {
                // месечен изглед
                date.setDate(today.getDate() - (days - i - 1));
                const formattedDate = date.toLocaleString('en', { weekday: 'short', day: '2-digit' });
                dataByDate[formattedDate] = {
                    name: formattedDate,
                    users: 0,
                    posts: 0,
                    value: 0,
                    date: new Date(date)
                };
            }
        }

        // Попълваме данните според реалните дати
        dates.forEach(date => {
            let formattedDate;

            if (formatType === 'month') {
                formattedDate = date.toLocaleString('en', { month: 'short' });
            } else if (formatType === 'week') {
                const weekStart = new Date(date);
                weekStart.setDate(weekStart.getDate() - weekStart.getDay());
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 6);

                formattedDate = `${weekStart.toLocaleString('en', { month: 'short', day: '2-digit' })} - ${weekEnd.toLocaleString('en', { month: 'short', day: '2-digit' })}`;
            } else {
                formattedDate = date.toLocaleString('en', { weekday: 'short', day: '2-digit' });
            }

            // Проверяваме дали датата е в нашия диапазон
            if (dataByDate[formattedDate]) {
                dataByDate[formattedDate][dataKey] += 1;
                dataByDate[formattedDate].value += 1;
            }
        });

        // Преобразуваме обекта в масив и сортираме по дата
        const sortedData = Object.values(dataByDate).sort((a, b) => a.date - b.date);

        // Премахваме допълнителното поле date, използвано само за сортиране
        return sortedData.map(item => {
            const { date, ...rest } = item;
            return rest;
        });
    };

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

    return (
        <div className="analytics-container">
            <div className="analytics-header">
                <Link to="/adminpanel" className="back-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z" fill="currentColor" />
                    </svg>
                    <span>Back to Dashboard</span>
                </Link>
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
                    {/* потребителска активност */}
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
                                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
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

                    {/* популярни програми */}
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

                    {/* продажби на програми */}
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

                    {/* ефективност на платформата */}
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
                                    <h3>{Math.round(performanceData.reduce((acc, item) => acc + item.value, 0) / performanceData.length)}%</h3>
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