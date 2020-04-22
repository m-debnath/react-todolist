import React, {Component} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import TodoItems from './TodoItems';
import './TodoList.css';
import { ToastContainer, toast, Zoom } from 'react-toastify';

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
            // this.notify('Task added.', 'info');
        } else {
            // this.notify('Nothing to add!', 'error');
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
        // this.notify('Task updated.', 'info');
    }

    notify(msg, level) {
        switch(level) {
            case 'success':
                toast.success(msg);
                break;
            case 'error':
                toast.error(msg);
                break;
            case 'warn':
                toast.warn(msg);
                break;
            case 'info':
                toast.info(msg);
                break;
            default:
                toast.info(msg);
                break;
        }
    }

    render() {
        return (
            <div className="todoListMain">
                <ToastContainer 
                    transition={Zoom}
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover />
                <Container>
                    <Row>
                        <Col><h3>Things to do, Places to go.</h3></Col>
                    </Row>
                    <form onSubmit={this.addItem}>
                    <Row className="addTask">
                        <Col xs={10}><input ref={(a) => this._inputElement = a}
                                placeholder="add new task"></input>
                        </Col>
                        <Col xs={2}>
                            <Button variant="info" type="submit"><i className="fas fa-plus"></i></Button>
                        </Col>
                    </Row>
                    </form>
                    <TodoItems entries={this.state.items}
                            delete={this.deleteItem}
                            edit={this.editItem}/>
                </Container>
            </div>
        );
    }
}

export default TodoList;
