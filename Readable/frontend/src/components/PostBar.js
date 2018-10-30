import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, ButtonToolbar, Glyphicon, Modal } from 'react-bootstrap';
import { Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap'
import { votePost, deletePost, editPost } from '../actions/postListActions';

class PostBar extends Component {
  state = {
    modalDeleteShow: false,
	modalEditShow: false,
    title: "",
    body: "",
  };

  componentDidMount(){
 	this.setState({ title: this.props.post.title, body: this.props.post.body })
  }
  handleHide = () =>  {
    this.setState({ modalDeleteShow: false, modalEditShow: false });
  }

  handleEvents( k, e){
	if( k === "title" ){
    	this.setState( { title: e.target.value })
    } else if( k === "body" ){
    	this.setState( { body: e.target.value })
	}
  }

  handleSubmit( e ){
  	//e.preventDefault()
    const title = this.state.title;
    const body = this.state.body;
	var postData = {
      	title,
     	body
    }
	this.props.editPost( postData )
  }
  render(){
      return(
    	<div>
            <ButtonToolbar className='btn-right'>
            <Button className="button-post" onClick={() => this.props.votePost('upVote')}><Glyphicon glyph="thumbs-up" title="Up Vote"/></Button>
            <Button className="button-post" onClick={() => this.props.votePost('downVote')}><Glyphicon glyph="thumbs-down" title="Down Vote"/></Button>
            <Button className="button-post" onClick={() => { this.setState({ modalEditShow: true})}}><Glyphicon glyph="pencil" title="Edit Post"/></Button>
            <Button className="button-post" onClick={() => { this.setState({ modalDeleteShow: true})}}><Glyphicon glyph="trash" title="Delete Post"/></Button>
            </ButtonToolbar>
            <Modal
              show={this.state.modalDeleteShow}
              onHide={this.handleHide}
            >
            <Modal.Body>
                <em><b>Are you sure you want to delete this post?</b></em>
            </Modal.Body>
            <Modal.Footer>
                <Button bsStyle="danger" onClick={() => { this.props.deletePost(); this.handleHide() }}>Yes</Button>
                <Button bsStyle="info" onClick={() => this.handleHide()}>Cancel</Button>
            </Modal.Footer>
            </Modal>
            <Modal
              show={this.state.modalEditShow}
              onHide={this.handleHide}
            >
			<Modal.Header>
				<b>Edit Post Details</b>
			</Modal.Header>
            <Modal.Body>
            <Form horizontal>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                  <b>Title :</b>
                </Col>
                <Col sm={8}>
                  <FormControl type="text" value={this.state.title} 
                    onChange={ (event) => this.handleEvents("title", event) }
                    placeholder="Title"/>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                  <b>Body :</b>
                </Col>
                <Col sm={8}>
                  <FormControl componentClass="textarea" value={this.state.body}
                    onChange={ (event) => this.handleEvents("body", event) }
                    placeholder="Post body"/>
                </Col>
              </FormGroup>
			</Form>
            </Modal.Body>
            <Modal.Footer>
                <Button bsStyle="danger" onClick={() => { this.handleSubmit();this.handleHide()}}>Submit</Button>
                <Button bsStyle="info" onClick={() => this.handleHide()}>Cancel</Button>
            </Modal.Footer>
            </Modal>
		</div>
      );
  } 
}

const mapStateToProps = (state, ownProps )  => {
    return { post: state.posts[ ownProps.id ] }
}

const mapDispatchToProps = (dispatch, ownProps ) => {
    return {
      	votePost: ( vote ) => dispatch(votePost( ownProps.id, vote )),
		deletePost: () => dispatch( deletePost( ownProps.id )),
      	editPost: ( data ) => dispatch( editPost( ownProps.id , data )),
    };
};

export default connect(mapStateToProps, mapDispatchToProps )( PostBar )