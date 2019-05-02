import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text1: 'aaa',
      group: {
        text2: 'bbb',
        text3: 'ccc',
      },
    }
  }

  handleText1 = (event) => {
    // これは入れ子でないので普通にsetStateしてOK
    this.setState({ text1: event.target.value });
  }

  handleText2 = (event) => {
    // これはWarningになる(Warning: A component is changing a controlled input of type text to be uncontrolled.)
    // uncontrolledになるのは、フォームのvalueがnullやundefinedになる場合に発生する。
    // ここでは、this.state.group.text3がセットされずundefinedになるためにundefinedになり警告がでる。
    this.setState({ 
      group: { text2: event.target.value }
    });
  }

  handleText3 = (event) => {
    // 上記エラーを回避するためには、一度this.state.groupをコピーし、
    // コピーしたオブジェクトを更新後、それをsetStateする。
    const newGroupState = Object.assign({}, this.state.group);
    newGroupState.text3 = event.target.value;
    this.setState({ group: newGroupState });
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
            <tr><td>state</td><td>{JSON.stringify(this.state)}</td></tr>
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
