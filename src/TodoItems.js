import React, {Component} from 'react';
import FlipMove from 'react-flip-move';

class TodoItems extends Component {
    constructor(props) {
        super(props);
        this.createTasks = this.createTasks.bind(this);
    }

    componentDidMount() {
        this.props.entries.forEach(element => {
            this.autoResize(element.key);
        });
    }

    createTasks(item) {
        return (<div className="wrapper" key={item.key}>
                    <div>
                        {/* <p contentEditable="true" onBlur={() => this.edit(item.key)}>{item.text}</p> */}
                        <textarea 
                            key={item.key}
                            ref={(a) => this[`textArea${item.key}`] = a}
                            onChange={() => this.autoResize(item.key)}
                            onBlur={() => this.edit(item.key)}
                            defaultValue={item.text}
                            style={{height: "auto"}}>
                        </textarea>
                    </div>
                    <div>
                        <button className="deleteButton" onClick={() => this.delete(item.key)}><i className="fas fa-trash"></i></button>
                    </div>
                </div>);
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
        this[`textArea${key}`].style.height = "";
        this[`textArea${key}`].style.height = this[`textArea${key}`].scrollHeight + "px";
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
        // listItems.forEach(element => {
        //     console.log(element.props.children[0].props.children.props.style);
        // });

        return (
            <div className="theList">
            <FlipMove duration={150} easing="ease-out">
                {listItems}
            </FlipMove>
            </div>
        );
    }
}

export default TodoItems;
