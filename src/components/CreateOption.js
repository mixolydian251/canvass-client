import React from 'react';

class CreateOption extends React.Component {
  state = {
    text: "",
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({[name]: value});
    this.props.onChange(this.props.id, value.trim())
  };

  remove = () => {
    this.props.removeOption(this.props.id);
  };

  render() {
    return (
      <div className="createOption">
        <input
          className="createOption__text"
          name="text"
          type="text"
          placeholder="Option"
          autoFocus
          value={this.state.text}
          onChange={this.onChange}
        />

        <button
          type="button"
          className="createOption__remove"
          onClick={this.remove}>
          X
        </button>
      </div>
    );
  }
}

export default CreateOption;