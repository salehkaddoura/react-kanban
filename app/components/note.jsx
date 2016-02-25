import React from 'react';

// export default ({task}) => <div>{task}</div>;

export default class Note extends React.Component {
    constructor(props) {
        super(props);
        
        // Track the `editing` state
        this.state = {
        	editing: false
        };
    }

    render() {
    	// Render the component differently based on state
    	if (this.state.editing) {
    		return this.renderEdit();
    	}

    	return this.renderNote();
    }

    renderEdit = () => {
    	// We deal with blur and input handlers here. These map to DOM events.
    	// We also set selection to input end using a callback at a ref
    	// It gets triggered after the component is mounted
    	// We could also use a string reference (i.e. ref="input") and then refer to the element in question later in the code.
    	// This would allow us to use the underlyig DOM API through `this.refs.input`.
    	// This can be useful when combined with React lifecycle hooks

    	return <input type="text" ref={ (e) => e ? e.selectionStart = this.props.task.length : null } autoFocus={true} defaultValue={this.props.task} onBlur={this.finishEdit} onKeyPress={this.checkEnter} />;

    };

    renderNote = () => {
    	// If the user clicks a normal note, trigger editing logic
    	const onDelete = this.props.onDelete;

    	return (
    		<div onClick={this.edit}>
    			<span className="task">{this.props.task}</span>
    			{onDelete ? this.renderDelete() : null }
    		</div>
    	);
    };

    renderDelete = () => {
    	return <button className="delete-note" onClick={this.props.onDelete}>x</button>;
    };

    edit = () => {
    	// Enter edit mode
    	this.setState({
    		editing: true
    	});
    };

    checkEnter = (e) => {
        console.log('sup')
    	// The user hits *enter*
    	if (e.key === 'Enter') {
    		this.finishEdit(e);
    	}
    };

    finishEdit = (e) => {
    	// 'Note' will trigger an option `onEdit` callback once it has a new value. We will use this to communicate the change to `App`
    	// A smarter way to deal with the default value would be to set thruogh `defaultProps`.
    	const value = e.target.value;

    	if (this.props.onEdit) {
    		this.props.onEdit(value);

    		// Exit edit mode
    		this.setState({
    			editing: false
    		});
    	}
    };
}

