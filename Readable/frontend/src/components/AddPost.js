import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Form, FormGroup, FormControl, Col, Button, ButtonToolbar, ControlLabel, Radio } from 'react-bootstrap'
import { connect } from 'react-redux';
import { getCategories } from '../actions/categoryActions';
import { addPost } from '../actions/postListActions';
import { capitalize } from 'lodash'
import { guid } from '../commonUtils/utils'

class NewPost extends Component {
  state = {
  	author : "",
    title: "",
    body: "",
    category:"react",
    buttonDisabled : true
  }

  componentDidMount() {
	this.props.fetchCategories()
  }

  handleEvents( k, e){
	console.log( k, e.target.value )
    if( k === "category" ){
  		this.setState( { category: e.target.value }, this.checkValidInputs );
    } else if( k === "author" ) {
  		this.setState( { author: capitalize(e.target.value) }, this.checkValidInputs)
  	} else if( k === "title" ){
    	this.setState( { title: capitalize(e.target.value) }, this.checkValidInputs )
    } else if( k === "body" ){
    	this.setState( { body: capitalize(e.target.value) }, this.checkValidInputs)
	}

  }

  checkValidInputs(){
	if( this.state.author.trim() === "" ||  this.state.title.trim() === "" ||  this.state.body.trim() === "" ){
    	this.setState( { buttonDisabled : true } );
    } else {
      	this.setState( { buttonDisabled : false } );
    }
  }

  getValidationState( key ) {
    const length = this.state[ key ].length;
    if (length > 0) return 'success';
    else return 'error'
  }

  handleSubmit( e ){
  	//e.preventDefault()
    const { author, title, body, category } = this.state
	var postData = {
      	id : guid(),
    	timestamp: Date.now(),
      	title,
     	body,
      	author,
      	category
    }
    this.setState( { title: "", author: "", category:"", body:"" })
	this.props.submitPost( postData )
  }

  render() {
    const categories = this.props.categories
    return (
        <div>
        <h4> Enter Post Details </h4>
      	<hr/>
        <Form horizontal>
          <FormGroup validationState={this.getValidationState( "author" )}>
            <Col componentClass={ControlLabel} sm={2}>
              <b>Author :</b>
      		</Col>
            <Col sm={6}>
              <FormControl type="text" value={this.state.author} 
				onChange={ (event) => this.handleEvents("author", event) }
				placeholder="Author" />
            </Col>
          </FormGroup>
          <FormGroup validationState={this.getValidationState( "title" )}>
            <Col componentClass={ControlLabel} sm={2}>
              <b>Title :</b>
         	</Col>
            <Col sm={6}>
              <FormControl type="text" value={this.state.title} 
				onChange={ (event) => this.handleEvents("title", event) }
				placeholder="Title"/>
            </Col>
          </FormGroup>
          <FormGroup validationState={this.getValidationState( "body" )}>
            <Col componentClass={ControlLabel} sm={2}>
              <b>Body :</b>
         	</Col>
            <Col sm={6}>
      		  <FormControl componentClass="textarea" value={this.state.body}
				onChange={ (event) => this.handleEvents("body", event) }
			    placeholder="Post body"/>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              <b>Category : </b>
         	</Col>
            <Col sm={6}>
      		{ categories.length > 0 && categories.map( ( category ) => (
            <Radio key={ category.path } value={ category.name } name="radioGroup" 
				   checked={ this.state.category === category.name } 
				   onChange={ (event) => this.handleEvents("category", event) } inline>
      			{ capitalize(category.name) } 
            </Radio> )) }
            </Col>
          </FormGroup>
          <FormGroup>
            <ButtonToolbar>
				<Col componentClass={ControlLabel} sm={4}>
				</Col>
				<Col componentClass={ControlLabel} sm={6}>
              	<Link to={`/${this.state.category}`}><Button className="button-post" bsStyle="success"
					onClick={(e) => this.handleSubmit( e )} disabled={ this.state.buttonDisabled }>Submit Post</Button></Link>
              	<Link to="/"><Button className="button-post" bsStyle="danger">Cancel</Button></Link>
				</Col>
    		</ButtonToolbar><br/><br/>
          </FormGroup>
        </Form>;
        </div>
    );
  }
}

const mapStateToProps = (state)  => {
    return { categories: state.categories }
}

const mapDispatchToProps = (dispatch) => {
    return {
      	fetchCategories: () => dispatch( getCategories()),
		submitPost: ( post ) => dispatch( addPost( post ))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPost)