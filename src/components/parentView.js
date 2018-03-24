import React, { Component } from 'react';
import '../css/parentView.css'
import ViewRequest from './viewRequest.js'
import Allowance from './allowance.js'
const pigBank = require('../assets/pics/pigBank.png')

class ParentView extends Component {
  constructor(props){
    super(props)
    this.state = {
      user:this.props.user,
      mainBalance:this.props.user ? this.props.user.users.account.availableBalance : '',
      // kids:[
      // {name:"Ben", accountBal:200, weeklyAllow:15, payDay:3},
      // {name:"Leah", accountBal:175, weeklyAllow:20, payDay:6}
      // ],
      kids:this.props.user ? [this.props.user.users.children[0]] : [],

      pendingRequest:this.props.user ? this.props.user.users.children[0].requests.length : '',
      seePending:false
    }
  }


  seePendingReq = () => {
    this.setState({
      seePending:!this.state.seePending
    })
  }

  clickKid = (e) =>{
    console.log(e.target);
  }

  handleClick = (callback)=>{
    return (e)=>{
      callback()
    }
  }


  render() {
  // this.state.user ? console.log(this.state.user.users.account.availableBalance) : '';
  console.log('strying');
  this.props ? console.log(this.props) : '';
    return (

      <div className='parentContainer'>

        {this.state.seePending ? <ViewRequest/> :
          <div>
            {this.state.pendingRequest ? <div onClick={this.seePendingReq} className='pendingRequest'>{this.state.pendingRequest} </div> : ''}
            <br/>
            <h3>Current Parent Balance:</h3>
            <h1>${this.state.mainBalance}</h1>
            <div className='allowanceContainer'>
              {this.state.kids.map((kid, i) => {

                const sendPost = ()=>{
                  console.log(kid)
                  return <Allowance
                    name={kid.name}
                    payDay={kid.payDay}
                    allowance={kid.weeklyAllow}
                  />
                }

                return (
                  <div key={i} className='kidAllowance' onClick={this.handleClick(sendPost)}>
                    <h2 >{kid.name}</h2>
                    <div className='allowanceInfo'>
                        {/* <i className="far fa-money-bill-alt"></i> */}
                        <img src={pigBank} height="35"/>
                        <p> ${kid.account.availableBalance}</p>
                    </div>
                    <div className='allowanceInfo'>
                      <i className="far fa-money-bill-alt"></i>
                      <p>${kid.allowances[0].amount}</p>
                    </div>

                  </div>
                )
              })}
            </div>
          </div>

      }

      </div>
    );
  }

}

export default ParentView;
