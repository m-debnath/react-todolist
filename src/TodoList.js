import React, {Component} from 'react';
import TodoItems from './TodoItems'
import './TodoList.css'

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
    }

    addItem(e) {
        if (this._inputElement !== "") {
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
    }

    render() {
        return (
            <div className="todoListMain">
                <div className="wrapper">
                    <div>
                        <h3>A simple React JS todo app</h3>
                        {/* <p><a href="https://www.youtube.com/watch?v=h5crrOsLbpk">Youtube tutorial</a></p> */}
                    </div>
                </div>
                <form className="wrapper createTask" onSubmit={this.addItem}>
                    <div>
                        <input ref={(a) => this._inputElement = a}
                                placeholder="Enter task"></input>
                    </div>
                    <div>
                        <button className="addButton" type="submit"></button>
                    </div>
                </form>
                <div className="wrapper">
                    <div>
                        <TodoItems entries={this.state.items}
                                delete={this.deleteItem}/>
                    </div>
                </div>
                {/* <div>Icons made by <a href="https://www.flaticon.com/authors/inipagistudio" title="inipagistudio">inipagistudio</a> from <br/> <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}
            </div>
        );
    }
}

export default TodoList;
