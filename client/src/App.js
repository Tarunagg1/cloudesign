import './App.css';
import Addtodo from './componets/Addtodo';
import Header from './componets/Header';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import VIew from './componets/VIew';
import {DndProvider} from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  return (
    <div style={{ backgroundColor: '#f9f9f9', height: "100vh" }}>
      <Router>
      <Header />
        <Switch>
          <Route path="/" component={Addtodo} exact />
          <DndProvider backend={HTML5Backend}>
               <Route path="/view" component={VIew} exact />
          </DndProvider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
