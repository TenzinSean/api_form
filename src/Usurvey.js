import React, { Component } from 'react';
var firebase = require('firebase');
var uuid = require('uuid');


// Firebase DATABASE
var config = {
   apiKey: "AIzaSyDn3e2olli_pKMAyiWOPGnBhoHJa6AYwpo",
   authDomain: "usurvey-d4240.firebaseapp.com",
   databaseURL: "https://usurvey-d4240.firebaseio.com",
   projectId: "usurvey-d4240",
   storageBucket: "usurvey-d4240.appspot.com",
   messagingSenderId: "911092374942"
 };
 firebase.initializeApp(config);



class Usurvey extends Component {

  onSubmit(event) {
    var studentName = this.refs.name.value;
    this.setState({studentName: studentName}, () =>{
      console.log(this.state);
    });
  }

  answerSelected(event) {
    // TODO SOMETHING
    var answer = this.state.answers;
    if(event.target.name === "answer1"){
      answer.answer1 = event.target.value;

    } else if (event.target.name === "answer2"){
      answer.answer2 = event.target.value;
    // video 36 handling -- watch again
  } else if (event.target.name === "answer3"){
      answer.answer3 = event.target.value;
    // video 36 handling -- watch again
    }

    this.setState({answers: answer}, function(){
      console.log(this.state);
    });

  }

  questionSubmit() {
    // TODO
    firebase.database().ref('uSurvey/' + this.state.uid).set({
      studentName: this.state.studentName,
      answers: this.state.answers
    });
    this.setState({isSubmitted: true});
  }




  constructor(props) {
    super(props);

    this.state = {
      uid: uuid.v1(),
      studentName: '',
      answers: {
        answer1: '',
        answer2: '',
        answer3: ''
      },
      isSubmitted: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.answerSelected = this.answerSelected.bind(this);
    this.questionSubmit = this.questionSubmit.bind(this);
  }


  render() {
    var studentName;
    var questions;

    if(this.state.studentName === '' && this.state.isSubmitted === false) {
      studentName = <div>
        <h1>Hey student, Please let us your name</h1>
        <form onSubmit={this.onSubmit}>
          <input className="ten" type="text" placeholder="Enter your name" ref="name"/>
        </form>
      </div>
      questions = '';
    } else if (this.state.studentName != '' && this.state.isSubmitted === false) {
      studentName = <h1>Hey there, Welcome to U-survey, {this.state.studentName}</h1>;
        questions = <div>
        <h2>Here are some questions: </h2>
        <form onSubmit={this.questionSubmit}>
          <div className="card">
            <label>What kind of course you like the most ?</label> <br />
            <input type="radio" name="answer1" value="Technology" onChange={this.answerSelected}/>Technology
            <input type="radio" name="answer2" value="Design" onChange={this.answerSelected}/>Design
            <input type="radio" name="answer3" value="Sale" onChange={this.answerSelected}/>Sale
            <input type="radio" name="answer4" value="Marketing" onChange={this.answerSelected}/>Marketing
          </div>
          <div className="card">
            <label>You are : </label> <br />
            <input type="radio" name="Student" value="Technology" onChange={this.answerSelected}/>Student
            <input type="radio" name="in-jobs" value="Design" onChange={this.answerSelected}/>Design
            <input type="radio" name="looking-job" value="Sale" onChange={this.answerSelected}/>Marketing
          </div>
          <div className="card">
            <label>Online learning : </label> <br />
            <input type="radio" name="answer3" value="Technology" onChange={this.answerSelected}/>Student
            <input type="radio" name="answer4" value="Design" onChange={this.answerSelected}/>Design
            <input type="radio" name="answer5" value="Sale" onChange={this.answerSelected}/>Marketing
          </div>
          <input className="btn" type="submit" value="submit" />

        </form>
        </div>
    } else if(this.state.isSubmitted === true) {
      studentName = <h1>Thanks, {this.state.studentName}</h1>
    }
    return (
      <div>
        {studentName}
        -----------------------------------
        {questions}
      </div>
    );
  }
}


export default Usurvey;
