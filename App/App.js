import React from "react"
import axios from "axios";


const divStyle = {
  width: '100%',
  borderRadius: '5px',
  backgroundColor: '#f2f2f2',
  padding: '20px',
  bottom: '300px',
};

const inputTextStyle = {

  width: '30%',
  padding: '12px ',
  paddingRight: '25px',
  margin: '8px 0',
  display: 'inline-block',
  border: '1px solid #ccc',
  borderRadius: '4px',
  boxSizing: 'borderBox',
};

const labelStyle = {
  fontFamily: 'SansSerif',
  fontSize: '20px',
};

const inputDescriptionStyle = {

  width: '75%',
  padding: '12px',
  margin: '8px 0',
  display: 'inline-block',
  border: '1px solid #ccc',
  borderRadius: '4px',
  boxSizing: 'borderBox',
};

const submitStyle = {
  backgroundColor: '#008CBA',
  width: '5%',
  color: 'white',
  padding: '14px',
  margin: '8px 0',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

class App extends React.Component {

    constructor() {
      super();
  
      this.state = {
        title: '',
        description: '',
        list: [{ title: '', description: '' }],
      };
  

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
  
    }

  
  
    handleChange(event, name){
      if(name === 'title')
        this.setState({ title: event.target.value });
  
      else
        this.setState({ description: event.target.value });
    }
  
  
  
    handleSubmit (e) {
      const update = { title: this.state.title, description: this.state.description };
      this.setState({ list: [...this.state.list, update] });
      axios.post("http://localhost:3002/api/putData", {
        title: this.state.title,
        description: this.state.description
      });
      e.preventDefault();
    }
  
    handleDelete (e) {
      this.setState(state => {
        const list = state.list.filter(item => (item.title !== this.state.title && item.description !== this.state.description) );
        return {
          list,
        };
      });
      axios.delete("http://localhost:3001/api/deleteData", {
        title: this.state.delete
    })
      e.preventDefault();
    }
  

render() {
  return(

    <div style={divStyle}>
      <form >
        <label style={labelStyle}>Title</label> <br/>
        <input type="text" style={inputTextStyle} value={this.state.title} onChange = {(event)=> this.handleChange(event, 'title')} name="Title" /> <br/> <br/>

        <label style={labelStyle}>Description</label><br/>
        <textarea style={inputDescriptionStyle} value={this.state.description} onChange = {(event)=> this.handleChange(event, 'description')} name="Description" >
        </textarea><br/>

        <input type="submit" onClick={(e)=>this.handleSubmit(e)} style={submitStyle} value="Submit"/> {'\n\n'}
        <input type="submit" onClick={(e)=>this.handleDelete(e)} style={submitStyle} value="Delete"/>
      </form>

      <div>

        {this.state.list.length > 1 ? <h2>Title: Description</h2>:''}
        <ul>
          {this.state.list.map((item, index) => (item.title !== '' ? (<li key={index}>{item.title} : {item.description}</li>):''))}
        </ul>
      </div>
    </div>
 );
}
}

export default App;
