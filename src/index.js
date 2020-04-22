import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'react-toastify/dist/ReactToastify.css';
import TodoList from './TodoList'

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
    <div>
        <TodoList/>
    </div>,
    document.getElementById('root')
);
