import React  from 'react';
import update from 'immutability-helper';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text1: 'aaa',
      group: {
        text2: 'bbb',
        text3: 'ccc',
        text4: 'ddd',
      },
    }
  }

  handleText1 = (event) => {
    // [通常]これは入れ子でないので普通にsetStateしてOK
    this.setState({ text1: event.target.value });
  }

  handleText2 = (event) => {
    // [問題]これはWarningになる
    // (Warning: A component is changing a controlled input of type text to be uncontrolled.)
    // uncontrolledになるのは、フォームのvalueがnullやundefinedになる場合に発生する。
    // ここでは、this.state.group.text3やtext4がセットされずundefinedになるために警告がでる。
    this.setState({ 
      group: { text2: event.target.value }
    });
  }

  handleText3 = (event) => {
    // [解１]上記エラーを回避するためには、一度this.state.groupをコピーし、
    // コピーしたオブジェクトを更新後、それをsetStateする。
    const newGroupState = Object.assign({}, this.state.group);
    newGroupState.text3 = event.target.value;
    this.setState({ group: newGroupState });
  }

  handleText4 = (event) => {
    // [解２]immutability-helperを使う。
    // https://github.com/kolodny/immutability-helper
    this.setState({ group: update(this.state.group, { text4: {$set: event.target.value} }) });
  }


  render() {
    return (
      <React.Fragment>
        text2を変更するとコンソールにwarningが出る。
        <table>
          <tbody>
            <tr><td>text1</td><td><input type="text" value={this.state.text1}       onChange={this.handleText1.bind(this)} /></td></tr>
            <tr><td>text2</td><td><input type="text" value={this.state.group.text2} onChange={this.handleText2.bind(this)} /></td></tr>
            <tr><td>text3</td><td><input type="text" value={this.state.group.text3} onChange={this.handleText3.bind(this)} /></td></tr>
            <tr><td>text4</td><td><input type="text" value={this.state.group.text4} onChange={this.handleText4.bind(this)} /></td></tr>
            <tr><td>state</td><td>{JSON.stringify(this.state)}</td></tr>
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
