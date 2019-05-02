import React     from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem  from '@material-ui/core/MenuItem';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        text:    '',
        select:  '',
    }
  }

  handleText = (event) => {
    this.setState({
      text: event.target.value
    });
  }

  handleSelect = (event) => {
    this.setState({
      select: event.target.value
    });
  }

  render() {
    const options = [
      { value: "opt1", label: "opt1" },
      { value: "opt2", label: "opt2" },
    ]
    return (
      <div>
        <TextField        label="text"   value={this.state.text}   onChange={(event)=>this.handleText(event)}   style={{width:100}}/><br />
        <TextField select label="select" value={this.state.select} onChange={(event)=>this.handleSelect(event)} style={{width:100}}>
          {options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    );
  }
}

export default App;
