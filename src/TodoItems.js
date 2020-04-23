import React, {Component} from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap';
import FlipMove from 'react-flip-move';

class TodoItems extends Component {
    constructor(props) {
        super(props);
        this.createTasks = this.createTasks.bind(this);
    }

    createTasks(item) {
        return (<ListGroup.Item key={item.key}>
                    <Row>
                        <Col xs={10}>
                            <input 
                                ref={(a) => this[`task${item.key}`] = a}
                                onBlur={() => this.edit(item.key)}
                                defaultValue={item.text}
                                maxLength="42">
                            </input>
                        </Col>
                        <Col xs={2}>
                            <button 
                                className="deleteButton" 
                                onClick={() => this.delete(item.key)}>
                                    <i className="fas fa-trash-alt"></i>
                            </button>
                        </Col>
                    </Row>
                </ListGroup.Item>);
    }

    delete(key) {
        this.props.delete(key);
    }

    edit(key) {
        if(this[`task${key}`].value === "")
            this.props.delete(key);
        else
            this.props.edit(key, this[`task${key}`].value);
    }

    render() {
        var todoEntries = this.props.entries;
        var listItems = todoEntries.map(this.createTasks);
        return (
            <ListGroup>
            <FlipMove duration={150} easing="ease-out">
                {listItems}
            </FlipMove>
            </ListGroup>
        );
    }
}

export default TodoItems;
