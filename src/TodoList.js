import React, {Component} from 'react';
import TodoItems from './TodoItems'
import './TodoList.css'
import '../node_modules/@fortawesome/fontawesome-free/css/all.css'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class TodoList extends Component {
    constructor(props) {
        super(props);

        var items = [];
        for (var i=0; i<localStorage.length; i++) {
            items.push({key: Number(localStorage.key(i)),
                                text: localStorage.getItem(localStorage.key(i))});
        }
        items = items.sort(function (a, b) {
            return b.key < a.key ?  1
                 : b.key > a.key ? -1
                 : 0;
        });

        this.state = {
            items: items
        };

        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.editItem = this.editItem.bind(this);
    }

    addItem(e) {
        if (this._inputElement.value !== "") {
            var newItem = {
                text: this._inputElement.value,
                key: Date.now()
            };

            localStorage.setItem(newItem.key, newItem.text);
            this.setState((prevState) => {
                return {
                    items: prevState.items.concat(newItem)
                };
            });
            this.notify('Task added.', 'success');
        } else {
            this.notify('Nothing to add!', 'error');
        }
        this._inputElement.value = "";
        e.preventDefault();
    }

    deleteItem(key) {
        var filteredItems = this.state.items.filter(function(item) {
            return(item.key !== key);
        });
        this.setState({
            items: filteredItems
        });
        localStorage.removeItem(key);
        this.notify('Task removed.', 'info');
    }

    editItem(key, value) {
        this.state.items.forEach(element => {
            if(element.key === key) {
                element.text = value;
            }
        });
        localStorage.setItem(key, value);
        this.notify('Task updated.', 'info');
    }

    notify(msg, level) {
        switch(level) {
            case 'success':
                toast.success(msg, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
                break;
            case 'error':
                toast.error(msg, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
                break;
            case 'warn':
                toast.warn(msg, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
                break;
            case 'info':
                toast.info(msg, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
                break;
            default:
                toast.info(msg, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
                break;
        }
    }

    render() {
        return (
            <div className="todoListMain">
                <ToastContainer transition={Zoom} />
                <div className="wrapper">
                    <div>
                        <h3>Things to do, places to go</h3>
                    </div>
                </div>
                <form className="wrapper createTask" onSubmit={this.addItem}>
                    <div>
                        <input ref={(a) => this._inputElement = a}
                                placeholder="Enter task"></input>
                    </div>
                    <div>
                        <button className="addButton" type="submit"><i className="fas fa-plus-square"></i></button>
                    </div>
                </form>
                <div className="wrapper">
                    <div>
                        <TodoItems entries={this.state.items}
                                delete={this.deleteItem}
                                edit={this.editItem}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default TodoList;
