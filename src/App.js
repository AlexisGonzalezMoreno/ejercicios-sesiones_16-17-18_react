import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Loginformik from './pages/forms/loginFormik';
import Registerformik from './pages/forms/registerFormik';
import Homepage from './pages/HomePage';
import TaskListComponent from './pages/task/task_list';



function App() {

  let isLogged = false;

  return (
    <Router>
      <Switch>
        <Route exact path='/' logged={ isLogged } component={ Homepage }/>
        <Route path='/login' component={ Loginformik }>
          {
            isLogged ?
            () => {
              alert('You are logged in. Redirecting to Home Page...');
              return (<Redirect to='/' />);
            }
            :
            () => {
              return(<Loginformik />);
            }
          }
        </Route>
        <Route path='/register' component={ Registerformik }>
        {
            isLogged ?
            () => {
              alert('You are logged in. Redirecting to Home Page...');
              return (<Redirect to='/' />);
            }
            :
            () => {
              return(<Registerformik />);
            }
          }
        </Route>
        <Route path='/tasks' component={ TaskListComponent }>
          {
            isLogged ?
            () => {
              return <TaskListComponent />;
            }
            :
            () => {
              alert('You are not logged in. Redirecting to login...');
              return (<Redirect to='/login' />);
            }
          }
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
