import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './components/Layout/Header';
import Todos from './components/Todos';
import AddToDo from './components/AddToDo'
import About from './components/pages/About'
//import uuid from 'uuid';
import './App.css';
import Axios from 'axios';
import { fips } from 'crypto';

class App extends Component {
  state = {
    todos: []
  }

  componentDidMount() {
    Axios.get('http://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(res => {
      this.setState({ todos: res.data })
    })
  }

  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id){
        todo.completed = !todo.completed;
      }
      return todo;
    }) })
  }
  
  delTodo = (id) =>{
    Axios.delete(`http://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }))
  }

  //Add Todo
  addTodo = (title) => {
    Axios.post('http://jsonplaceholder.typicode.com/todos', {
      title: title,
      completed: false
    })
    .then(res => this.setState({ todos: [...this.state.todos, res.data] }))
    
  }

  render() {
    
    return (
      <Router>
        <div className="App">
          <div className="containner">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddToDo addTodo={this.addTodo}/>
                <Todos todos={this.state.todos} markComplete={this.markComplete}
                 delTodo={this.delTodo}/>
              </React.Fragment>
            )} />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
