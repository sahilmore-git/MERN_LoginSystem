import React, { Component } from 'react';
import 'whatwg-fetch';
import{
  getFromStorage,
  setInStorage
} from '../../utils/storage';
import { sign } from 'crypto';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading:true,
      token:'',
      signInEmail:'',
      signInPassword:'',
      signUpError:'',
      signInError:'',
      signUpFirstName:'',
      signUpLastName:'',
      signUpEmail:'',
      signUpPassword:'',};

      this.handleChange = this.handleChange.bind(this);
     // this.inputHandler = this.inputHandler.bind(this)
      this.onSignUp=this.onSignUp.bind(this);
      
  }

 /* inputHandler(e) {
    this.setState({
      signUpFirstName: e.target.signUpFirstName,
      signUpLastName:e.target.signUpLastName,
      signUpEmail:e.target.signUpEmail,
      signUpPassword:e.target.signUpPassword
      });
}*/
  handleChange(event) {
    this.setState({signInEmail: event.target.signInEmail,
             signInPassword: event.target.signInPassword,
             signUpFirstName: event.target.signUpFirstName,
            signUpLastName: event.target.signUpLastName,
            signUpEmail: event.target.signUpEmail,
            signUpPassword: event.target.signUpPassword});
  }

  componentDidMount(){

    const token=getFromStorage('the_main_app');

    if(token)
    {
      console.log(token);
      //verify
      fetch('/api/account/verify?token='+token)
      .then(res => res.json())
      .then(json => {
        if(json.success){
          this.setState({
            token,
            isLoading:false
          });
        }
      });
    }else{
      this.setState({
      isLoading:false,
      });
    }
  }

 onSignUp(){

    console.log("Tapped");
    //Grab State
    const {
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword
    }=this.state;

    this.setState({
      isLoading:true
      });


    
//POST REQ


    fetch('/api/account/signup', { 
      method: 'POST', 
      headers: {
        "Content-Type": "application/json;charset=utf-8"
    },

      body :JSON.stringify ({

        firstName:signUpFirstName,
        lastName:signUpLastName,
        email:signUpEmail, 
        password:signUpPassword
      }),
      
    })
      .then(res => res.json())
      .then(json => {
        console.log("json"+res.json());
        if(json.success){
        this.setState({
        signUpError:json.message,
        isLoading:false,
        });}
        
        else{
          this.setState({
            signUpError:json.message,
            isLoading:false
            });
            console.log("Done")
        }




          });

  
 }
 


  /* fetch('/api/counters')
      .then(res => res.json())
      .then(json => {
        this.setState({
          counters: json
        });
      });*/

  
   /* fetch('/api/counters', { method: 'POST' })
      .then(res => res.json())
      .then(json => {
        let data = this.state.counters;
        data.push(json);

        this.setState({
          counters: data
        });
      });*/

 
  render() {

    const{
    isLoading,
    token,
    signInError,
    signUpError,
    signInPassword,
    signInEmail,
    signUpFirstName,
    signUpLastName,
    signUpEmail,
    signUpPassword
    }=this.state;

    

if(isLoading){

return (<div><p>Loading......</p></div>);
}

if(!token){

return(
  <div>
   
   <div>
   


   <div><p>Sign In</p>
   
   {
   (signInError) ? (
   <p>(signInError)</p>
   ):(null)
   }
   </div>

   <input 
   type="email" 
   placeholder="Email" 
   value={this.state.signInEmail} 
   onChange={this.handleChange}
   
   /><br/>
   
   <input 
   type="password" 
   placeholder="Password" 
   value={this.state.signInPassword} 
   onChange={this.handleChange}
   /><br/>

   <button
   >
   Sign In
   </button>

   </div>
   <br/>
   <br/>

   <div>
   <div>

   <p>Sign Up</p>
   
   {
   (signUpError) ? (
   <p>signUpError</p>
   ):(null)
   }
   </div>
   <input type="text" 
   placeholder="First Name"
   value={this.state.signUpFirstName} 
   onChange={this.handleChange}
   /><br/>
   <input type="text" 
   placeholder="Last Name"
   value={this.state.signUpLastName} 
   onChange={this.inputHandler}
   /><br/>
   <input type="email" 
   placeholder="Email"
   value={this.state.signUpEmail} 
   onChange={this.inputHandler}
   /><br/>
   <input type="password" 
   placeholder="Password"
   value={this.state.signUpPassword} 
   onChange={this.inputHandler}
   /><br/>
                     
 <button
   onClick={this.onSignUp}>
   Sign Up
   </button>
   </div>
  </div>

);


}


  }





}



export default Home;
