import React, { useState } from 'react';
import { Calendar, LogOut, DollarSign, User, ChevronDown, Utensils, PlusCircle, Trash2, BarChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

const subscriptionPlans = [
  { id: 'free', name: 'Basic', price: 0, features: ['Free Subscription doesn\'t Present any Features'] },
  { id: 'premium', name: 'Premium', price: 19.99, features: ['Premium features', 'Group classes', 'One personal training session/month', 'Access to Calendar', 'Nutrition Tracker', 'Workout Analytics'] },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('subscription');
  const [subscription, setSubscription] = useState('free');
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ date: '', program: '' });
  const [nutritionLogs, setNutritionLogs] = useState([]);
  const [newNutritionLog, setNewNutritionLog] = useState({ date: '', meal: '', calories: '' });
  const [showPayment, setShowPayment] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    name: '',
    expirationDate: '',
    cvv: '',
  });
  const [isPaid, setIsPaid] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [workoutData, setWorkoutData] = useState([
    { week: 'Week 1', weightLifted: 1000, caloriesBurned: 1500 },
    { week: 'Week 2', weightLifted: 1200, caloriesBurned: 1700 },
    { week: 'Week 3', weightLifted: 1100, caloriesBurned: 1600 },
    { week: 'Week 4', weightLifted: 1300, caloriesBurned: 1800 },
  ]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/signin');
  };

  const handleSelectPlan = (planId) => {
    setSubscription(planId);
    if (planId === 'premium') {
      setShowPayment(true);
    }
  };

  const handlePayment = () => {
    alert("Payment Successful! You now have access to the Premium features.");
    setIsPaid(true);
    setShowPayment(false);
    setActiveTab('calendar');
  };

  const renderSubscription = () => (
    <div className="subscription-container">
      <h2 className="section-title">Choose Your Subscription Plan</h2>
      <div className="subscription-cards">
        {subscriptionPlans.map((plan) => (
          <SubscriptionCard
            key={plan.id}
            {...plan}
            current={subscription === plan.id}
            onSelect={() => handleSelectPlan(plan.id)}
          />
        ))}
      </div>
    </div>
  );

  const renderCalendar = () => {
    if (subscription !== 'premium' || !isPaid) {
      return renderPremiumMessage();
    }

    return (
      <div className="calendar-container">
        <h2 className="section-title">Workout Calendar</h2>
        <div className="calendar-content">
          <div className="new-event-form">
            <h3>Add New Workout</h3>
            <div className="form-group">
              <label htmlFor="event-date">Date</label>
              <input
                type="date"
                id="event-date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="event-program">Program Name</label>
              <input
                type="text"
                id="event-program"
                placeholder="Program Name"
                value={newEvent.program}
                onChange={(e) => setNewEvent({ ...newEvent, program: e.target.value })}
                required
              />
            </div>
            <button
              className="btn-add-event"
              onClick={() => {
                setCalendarEvents([...calendarEvents, newEvent]);
                setNewEvent({ date: '', program: '' });
              }}
            >
              Add to Calendar
            </button>
          </div>
          <div className="calendar-events">
            <h3>Upcoming Workouts</h3>
            {calendarEvents.length === 0 ? (
              <p>No workouts scheduled. Add your first workout!</p>
            ) : (
              <ul>
                {calendarEvents.map((event, index) => (
                  <li key={index} className="event-item">
                    <Calendar className="event-icon" />
                    <span className="event-date">{event.date}</span>
                    <span className="event-program">{event.program}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderNutritionTracker = () => {
    if (subscription !== 'premium' || !isPaid) {
      return renderPremiumMessage();
    }

    return (
      <div className="nutrition-container">
        <h2 className="section-title">Nutrition Tracker</h2>
        <div className="nutrition-content">
          <div className="new-nutrition-form">
            <h3>Add New Meal</h3>
            <div className="form-group">
              <label htmlFor="meal-date">Date</label>
              <input
                type="date"
                id="meal-date"
                value={newNutritionLog.date}
                onChange={(e) => setNewNutritionLog({ ...newNutritionLog, date: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="meal-name">Meal Name</label>
              <input
                type="text"
                id="meal-name"
                placeholder="Meal Name"
                value={newNutritionLog.meal}
                onChange={(e) => setNewNutritionLog({ ...newNutritionLog, meal: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="meal-calories">Calories</label>
              <input
                type="number"
                id="meal-calories"
                placeholder="Calories"
                value={newNutritionLog.calories}
                onChange={(e) => setNewNutritionLog({ ...newNutritionLog, calories: e.target.value })}
                required
              />
            </div>
            <button
              className="btn-add-meal"
              onClick={() => {
                setNutritionLogs([...nutritionLogs, newNutritionLog]);
                setNewNutritionLog({ date: '', meal: '', calories: '' });
              }}
            >
              <PlusCircle className="icon" /> Add Meal
            </button>
          </div>
          <div className="nutrition-logs">
            <h3>Meal Logs</h3>
            {nutritionLogs.length === 0 ? (
              <p>No meals logged. Start tracking your nutrition!</p>
            ) : (
              <ul>
                {nutritionLogs.map((log, index) => (
                  <li key={index} className="meal-item">
                    <Utensils className="meal-icon" />
                    <span className="meal-date">{log.date}</span>
                    <span className="meal-name">{log.meal}</span>
                    <span className="meal-calories">{log.calories} cal</span>
                    <button
                      className="btn-delete-meal"
                      onClick={() => {
                        const updatedLogs = nutritionLogs.filter((_, i) => i !== index);
                        setNutritionLogs(updatedLogs);
                      }}
                    >
                      <Trash2 className="icon" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderWorkoutAnalytics = () => {
    if (subscription !== 'premium' || !isPaid) {
      return renderPremiumMessage();
    }

    return (
      <div className="analytics-container">
        <h2 className="section-title">Workout Analytics</h2>
        <div className="analytics-content">
          <div className="chart-container">
            <h3>Weekly Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={workoutData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="weightLifted" stroke="#8884d8" name="Weight Lifted (lbs)" />
                <Line yAxisId="right" type="monotone" dataKey="caloriesBurned" stroke="#82ca9d" name="Calories Burned" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="stats-container">
            <h3>Your Progress</h3>
            <div className="stat-item">
              <span className="stat-label">Total Weight Lifted:</span>
              <span className="stat-value">{workoutData.reduce((sum, data) => sum + data.weightLifted, 0)} lbs</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Total Calories Burned:</span>
              <span className="stat-value">{workoutData.reduce((sum, data) => sum + data.caloriesBurned, 0)} cal</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Weeks Tracked:</span>
              <span className="stat-value">{workoutData.length}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPremiumMessage = () => (
    <div className="premium-message">
      <h2>Premium Feature</h2>
      <p>This section is for premium subscribers only. Please upgrade to the premium plan to access this feature.</p>
      <button className="btn-upgrade" onClick={() => setActiveTab('subscription')}>Upgrade Now</button>
    </div>
  );

  return (
    <div className="dashboard">
      <header className="navbar">
        <div className="navbar-left">
          <h1 className="navbar-logo">GYME</h1>
        </div>
        <nav className="navbar-center">
          <button
            className={`tab-link ${activeTab === 'subscription' ? 'active' : ''}`}
            onClick={() => setActiveTab('subscription')}
          >
            Subscription
          </button>
          <button
            className={`tab-link ${activeTab === 'calendar' ? 'active' : ''}`}
            onClick={() => setActiveTab('calendar')}
          >
            Calendar
          </button>
          <button
            className={`tab-link ${activeTab === 'nutrition' ? 'active' : ''}`}
            onClick={() => setActiveTab('nutrition')}
          >
            Nutrition
          </button>
          <button
            className={`tab-link ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </button>
        </nav>
        <div className="navbar-right">
          <div className="profile-menu" onClick={() => setShowProfileMenu(!showProfileMenu)}>
            <User className="profile-icon" />
            <ChevronDown className="dropdown-icon" />
            {showProfileMenu && (
              <div className="profile-dropdown">
                <button onClick={handleLogout} className="logout-btn">
                  <LogOut className="icon" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="content">
        {activeTab === 'subscription' && renderSubscription()}
        {activeTab === 'calendar' && renderCalendar()}
        {activeTab === 'nutrition' && renderNutritionTracker()}
        {activeTab === 'analytics' && renderWorkoutAnalytics()}
      </main>

      {showPayment && (
        <div className="payment-modal">
          <div className="payment-modal-content">
            <h2>Payment for Premium Plan</h2>
            <p className="total-price">Total: $49.99</p>
            <form onSubmit={(e) => { e.preventDefault(); handlePayment(); }}>
              <div className="form-group">
                <label htmlFor="card-number">Card Number</label>
                <input
                  type="text"
                  id="card-number"
                  placeholder="1234 5678 9012 3456"
                  value={paymentDetails.cardNumber}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Name on Card</label>
                <input
                  type="text"
                  id="name"
                  placeholder="brahim Razqaoui"
                  value={paymentDetails.name}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expiration-date">Expiration Date</label>
                  <input
                    type="month"
                    id="expiration-date"
                    value={paymentDetails.expirationDate}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, expirationDate: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cvv">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    placeholder="123"
                    value={paymentDetails.cvv}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="modal-buttons">
                <button type="submit" className="btn-pay">Confirm Payment</button>
                <button type="button" onClick={() => setShowPayment(false)} className="btn-cancel">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


const SubscriptionCard = ({ name, price, features, current, onSelect }) => (
  <div className={`subscription-card ${current ? 'current-subscription' : ''}`}>
    <h3>{name}</h3>
    <p className="price">
      <DollarSign className="price-icon" />
      ${price}
      <span>/month</span>
    </p>
    <ul className="features-list">
      {features.map((feature, index) => (
        <li key={index} className="feature-item">
          <Calendar className="feature-icon" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <button
      onClick={onSelect}
      disabled={current}
      className={current ? 'current-plan-button' : 'select-plan-button'}
    >
      {current ? 'Current Plan' : 'Select Plan'}
    </button>
  </div>
);

export default Dashboard;