import React from 'react';

class EnterGame extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.props.formType === "Game Over") {
      this.props.resetGame();
    }
    this.props.initializeGame(this.state.name);
  }

  update(prop) {
    return (e) => {
      this.setState({ [prop]: e.target.value });
    }
  }

  render() {
    const nameInputClass = this.props.formType === "Enter Game" ? "" : "hidden"
    return (
      <div className={ this.props.formType === "Enter Game" ? "enter-game" : "game-over"} >
        <form onSubmit={ this.handleSubmit }>
          { this.props.won && <p>You won!</p> }
          <input
            className={ nameInputClass }
            type="text"
            onChange={ this.update("name") }
            value={ this.state.name } />
          <input type="submit" value={ this.props.submitText } />
        </form>
      </div>
    );
  }
}

export default EnterGame;