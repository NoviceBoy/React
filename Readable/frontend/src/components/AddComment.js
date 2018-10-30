import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Form, FormGroup, FormControl, Col, Button, ButtonToolbar, ControlLabel } from 'react-bootstrap'
import { connect } from 'react-redux';
import { capitalize } from 'lodash'
import { addComment } from '../actions/commentsActions';
import { guid } from '../commonUtils/utils'

class NewComment extends Component {
  state = {
  	author : "",
    body: "",
    buttonDisabled : true
  }

  handleEvents( k, e){
 	if( k === "author" ) {
  		this.setState( { author: e.target.value }, this.checkValidInputs )
    } else if( k === "body" ){
    	this.setState( { body: capitalize(e.target.value) },this.checkValidInputs )
	}
  }

  checkValidInputs(){
	if( this.state.author.trim() === "" ||  this.state.body.trim() === "" ){
    	this.setState( { buttonDisabled : true } );
    } else {
      	this.setState( { buttonDisabled : false } );
    }
  }
  handleSubmit( e ){
    const { author, body } = this.state
	const parentId = this.props.match.params.id
	var postData = {
      	id : guid(),
    	timestamp: Date.now(),
     	body,
      	author,
      	parentId
    }
    this.props.submitComment( postData )
    this.setState( {author: "",  body:"" })
  }

  getValidationState( key ) {
    const length = this.state[ key ].length;
    if (length > 0) return 'success';
    else return 'error'
  }

  render() {
    const category = this.props.match.params.category
    const id = this.props.match.params.id

    return (
        <div>
        <h4> Comment Details </h4>
      	<hr/>
        <Form horizontal>
          <FormGroup validationState={this.getValidationState( "author" )}>
            <Col componentClass={ControlLabel} sm={2}>
              <b>Author :</b>
      		</Col>
            <Col sm={6}>
              <FormControl type="text" value={this.state.author} 
				onChange={ (event) => this.handleEvents("author", event) }
				placeholder="User"/>
            </Col>
          </FormGroup>
          <FormGroup validationState={this.getValidationState( "body" )}>
            <Col componentClass={ControlLabel} sm={2}>
              <b>Comment :</b>
         	</Col>
            <Col sm={6}>
      		  <FormControl componentClass="textarea" value={this.state.body}
				onChange={ (event) => this.handleEvents("body", event) }
			    placeholder="Comment"/>
            </Col>
          </FormGroup>
          <FormGroup>
            <ButtonToolbar>
				<Col componentClass={ControlLabel} sm={4}>
				</Col>
				<Col componentClass={ControlLabel} sm={6}>
              	<Link to={`/${category}/${id}`}><Button className="button-post" bsStyle="success"
					onClick={(e) => this.handleSubmit( e )} disabled={this.state.buttonDisabled} >Submit Comment</Button></Link>
              	<Link to="/"><Button className="button-post" bsStyle="danger">Cancel</Button></Link>
				</Col>
    		</ButtonToolbar><br/><br/>
          </FormGroup>
        </Form>;
        </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
		submitComment: ( post ) => dispatch( addComment( post ))
    };
};

export default connect(null, mapDispatchToProps)(NewComment)