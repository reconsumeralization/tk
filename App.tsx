import React from 'react';
import { Switch, Route } from 'react-router-dom';

import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
import ParentDashboard from './components/ParentDashboard';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import NotFound from './components/NotFound';

const App: React.FC = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/teacher" component={TeacherDashboard} />
        <Route path="/student" component={StudentDashboard} />
        <Route path="/parent" component={ParentDashboard} />
        <Route path="/admin" component={AdminDashboard} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
