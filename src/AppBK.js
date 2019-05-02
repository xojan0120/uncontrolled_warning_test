import React     from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem  from '@material-ui/core/MenuItem';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group: {
        text:    '',
        select:  '',
      },
      other: "other text",
    }
  }

  // --------------------------------------------------------------------------------------
  // this.stateを入れ子にしている場合、下記はエラーになる
  // --------------------------------------------------------------------------------------
  //handleText = (event) => {
  //  this.setState({
  //    group: { text: event.target.value }
  //  });
  //}
  //handleSelect = (event) => {
  //  this.setState({
  //    group: { select: event.target.value }
  //  });
  //}
  //
  // エラー内容は、コンポーネントがコントローラブルからアンコントローラブルになったというもの。
  // -> Warning: A component is changing a controlled input of type text to be uncontrolled.
  // アンコントローラブルになるのは、フォームのvalueがnullやundefinedになる場合に発生する。
  // stateが入れ子になっている場合、下記のようなやり方をすると、NG
  // -> this.setState({ group: { text: event.target.value } })
  // これは、this.state.group.selectの値が無い状態でsetStateされるため、
  // selectを使っているフォームがアンコントローラブルになるのが原因である。
  // これを避けるためには、下記のようにする。
  
  handleText = (event) => {
    const newGroupState = Object.assign({}, this.state.group);
    newGroupState.text = event.target.value;
    this.setState({ group: newGroupState });
  }

  handleSelect = (event) => {
    const newGroupState = Object.assign({}, this.state.group);
    newGroupState.select = event.target.value;
    this.setState({ group: newGroupState });
  }

  render() {
    const options = [
      { value: "opt1", label: "opt1" },
      { value: "opt2", label: "opt2" },
    ]
    return (
      <div>
        <TextField        label="text"   value={this.state.group.text}   onChange={(event)=>this.handleText(event)}   style={{width:100}}/><br />
        <TextField select label="select" value={this.state.group.select} onChange={(event)=>this.handleSelect(event)} style={{width:100}}>
          {options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <div>other: {this.state.other}</div>
      </div>
    );
  }
}

export default App;
