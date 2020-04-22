import React, {Component} from 'react';
import { Row, Col, Button, ListGroup } from 'react-bootstrap';
import FlipMove from 'react-flip-move';

class TodoItems extends Component {
    constructor(props) {
        super(props);
        this.createTasks = this.createTasks.bind(this);
    }

    componentDidMount() {
        this.props.entries.forEach(element => {
            this.autoResize(element.key);
            this.autoResize(element.key);
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.entries !== prevProps.entries) {
            this.props.entries.forEach(element => {
                this.autoResize(element.key);
            });
        }
    }

    createTasks(item) {
        return (<ListGroup.Item key={item.key}>
                    <Row>
                        <Col xs={10}>
                            <textarea 
                                key={item.key}
                                ref={(a) => this[`textArea${item.key}`] = a}
                                onChange={() => this.autoResize(item.key)}
                                onBlur={() => this.edit(item.key)}
                                defaultValue={item.text}>
                            </textarea>
                        </Col>
                        <Col xs={2}>
                            <Button variant="danger" onClick={() => this.delete(item.key)}><i className="fas fa-trash"></i></Button>
                        </Col>
                    </Row>
                </ListGroup.Item>);
    }

    delete(key) {
        this.props.delete(key);
    }

    edit(key) {
        if(this[`textArea${key}`].value === "")
            this.props.delete(key);
        else
            this.props.edit(key, this[`textArea${key}`].value);
    }

    autoResize(key) {
        console.log('Before ' + this[`textArea${key}`].style.height.toString());
        this[`textArea${key}`].style.height = "";
        this[`textArea${key}`].style.height = this[`textArea${key}`].scrollHeight + "px";
        console.log('After ' + this[`textArea${key}`].style.height.toString());
    }

    render() {
        var todoEntries = this.props.entries;
        // sort in reverse order
        // todoEntries = todoEntries.sort(function (a, b) {
        //     return a.key < b.key ?  1
        //          : a.key > b.key ? -1
        //          : 0;
        // });
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


/*
                <ul className="list-group">
                    <li className="list-group-item active">Cras justo odio</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Morbi leo risus</li>
                    <li className="list-group-item">Porta ac consectetur ac</li>
                    <li className="list-group-item">Vestibulum at eros</li>
                </ul>
*/
