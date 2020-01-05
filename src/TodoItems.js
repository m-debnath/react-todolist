import React, {Component} from 'react';
import FlipMove from 'react-flip-move';

class TodoItems extends Component {
    constructor(props) {
        super(props);

        this.createTasks = this.createTasks.bind(this);
    }

    createTasks(item) {
        return (<li onClick={() => this.delete(item.key)} 
                    key={item.key}>{item.text}</li>);
    }

    delete(key) {
        this.props.delete(key);
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
            <ul className="theList">
            <FlipMove duration={150} easing="ease-out">
                {listItems}
            </FlipMove>
            </ul>
        );
    }
}

export default TodoItems;
