import React, {Component} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import TodoItems from './TodoItems';
import './TodoList.css';

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
        } else {
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
        // this.notify('Task removed.', 'info');
    }

    editItem(key, value) {
        this.state.items.forEach(element => {
            if(element.key === key) {
                element.text = value;
            }
        });
        localStorage.setItem(key, value);
    }

    render() {
        return (
            <div className="todoListMain">
                <Container>
                    <Row>
                        <Col><h3>Things to do, places to go.</h3></Col>
                    </Row>
                    <Form onSubmit={this.addItem}>
                        <Row>
                            <Col xs={10}>
                                <input 
                                    ref={(a) => this._inputElement = a}
                                    placeholder="add new task here" 
                                    maxLength="42"
                                    className="addTask">
                                </input>
                            </Col>
                            <Col xs={2}>
                                <button 
                                    className="addButton" 
                                    type="submit">
                                        <i className="fas fa-plus"></i>
                                </button>
                            </Col>
                        </Row>
                    </Form>
                    <TodoItems 
                        entries={this.state.items}
                        delete={this.deleteItem}
                        edit={this.editItem}/>
                </Container>
            </div>
        );
    }
}

export default TodoList;
