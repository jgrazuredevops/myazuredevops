
import styles from './App.module.css';
import Layout from './components/Layout/Layout';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import WorkItems from './components/WorkItems/WorkItems';
import WorkItemForm from './components/WorkItems/WorkItemForm';
import Backlog from './components/Backlog/Backlog';
import SprintGrid from './components/Sprints/SprintGrid';

import workItemReducer from './store/reducers/workItem/workItem';
import userReducer from './store/reducers/user/user';

const App = (props) => {

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const rootReducer = combineReducers({
    workItem: workItemReducer,
    user: userReducer
  });

  const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
  ));

  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Switch>
            <Route path="/" exact component={WorkItems} />
            <Route path="/editwi/:name" exact component={WorkItemForm} />
            <Route path="/newwi/:type" exact component={WorkItemForm} />
            <Route path="/sprints" exact component={SprintGrid} />
            <Route path="/notdev" exact component={Backlog} />
          </Switch>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
