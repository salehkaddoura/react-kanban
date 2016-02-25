import React from 'react';

export default class Editable extends React.Component {
    render() {
        const {value, onEdit, onValueClick, editing, ...props} = this.props;

        return (
            <div {...props}>
                {editing ? this.renderEdit() : this.renderValue() }
            </div>
        );
    }

    renderEdit = () => {
    	return <input type="text" ref={ (e) => e ? e.selectionStart = this.props.value.length : null } autoFocus={true} defaultValue={this.props.value} onBlur={this.finishEdit} onKeyPress={this.checkEnter} />;
    };

    renderValue = () => {
        const onDelete = this.props.onDelete;

        return (
            <div onClick={this.props.onValueClick}>
                <span className="value">{this.props.value}</span>
                {onDelete ? this.renderDelete() : null }
            </div>
        );
    };

    renderDelete = () => {
    	return <button className="delete" onClick={this.props.onDelete}>x</button>;
    };


    checkEnter = (e) => {
        console.log('heel');
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
    	}
    };
}