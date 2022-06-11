import './App.css';
import React, { Component } from 'react';

class Table extends Component {
  constructor(props){
    super(props);
    this.state = {
      users : [], 
      loading : false, 
      error: false, 
      pageNo: 1
    }
  }

  async componentDidMount() {
    this.setState({ loading : true})
    const response = await fetch('https://mockrestapi.herokuapp.com/api/employee?pageNo={this.state.pageNo}&limit=5');
    if (response.ok){
      const user = await response.json()
      const users = user.data
      this.setState({ users, loading: false})
    }
    else 
    {
      this.setState({ error: true, loading: false})
    }
  }
  
  async reRenderTable() {
    this.setState({ loading : true})
    // var URL = ''
    const response = await fetch('https://mockrestapi.herokuapp.com/api/employee?pageNo='+this.state.pageNo+'&limit=5');
    if (response.ok){
      const user = await response.json()
      const users = user.data
      this.setState({ users, loading: false})
    }
    else 
    {
      this.setState({ error: true, loading: false})
    }
  }


  renderTableRows = () => {
    return this.state.users.map(user => {
      return (
        <tr key = {user._id}>
          <td>{user._id}</td>
          <td>{user.name}</td>
          <td>{user.phone}</td>
          <td>{user.email}</td>
          <td>{user.age}</td>
          <td>{user.country}</td>
          <td>{user.address}</td>
          <td>{user.createdAt}</td>
          <td>{user.updatedAt}</td>
          <td><button type="button">Delete</button></td>
        </tr>
      )
    })
  }

  render() {
    const {users, loading, error} = this.state
    if(loading)
    {
      return <div>LOADING...</div>
    }
    if(error)
    {
      return <div>Error</div>
    }
    return (
      <div>
        <label><b>Page No:{this.state.pageNo}</b></label>
        <button onClick={()=>{
          this.state.pageNo++;
          this.reRenderTable();
        }} 
        type="button">Next</button>
        <button onClick={()=>{
          if(this.state.pageNo!=1)
          this.state.pageNo--;
            this.reRenderTable();
        }}type="button">Previous</button>
        <table>
          <thead>
            <tr>
            <th>ID</th>
              <th>NAME</th>
              <th>PHONE</th>
              <th>EMAIL</th>
              <th>AGE</th>
              <th>COUNTRY</th>
              <th>ADDRESS</th>
              <th>CREATED-AT</th>
              <th>UPDATED-AT</th>
              <th>DELETE</th>

              {/* {this.renderTableHead()} */}
            </tr>
          </thead>
          <tbody>
            {this.renderTableRows()}
          </tbody>
        </table>
      </div>
    )
  }
}


function App() {


  return (
    <div className="App">
      <Table/>
    </div>
  );
}

export default App;
