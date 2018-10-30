import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, ButtonToolbar, Glyphicon, Modal } from 'react-bootstrap';
import { Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap'
import { voteComment, deleteComment, editComment } from '../actions/commentsActions';

class CommentBar extends Component {
  state = {
    modalCommentEdit: false,
	modalCommentDelete: false,
    body: "",
  };

  componentDidMount(){
 	this.setState({ body: this.props.comment.body })
  }

  handleHide = () =>  {
    this.setState({ modalCommentEdit: false, modalCommentDelete: false });
  }

  handleEvents( k, e){
	if( k === "body" ){
    	this.setState( { body: e.target.value })
	}
  }

  handleSubmit( e ){
  	//e.preventDefault()
    const body = this.state.body;
	var postData = {
        timestamp: Date.now(),
     	body
    }
	this.props.editComment( postData )
  }

  render(){
      return(
    		<div>
            <ButtonToolbar className='btn-right'>
            <Button className="button-post" bsSize="small"
            	onClick={() => this.props.voteComment('upVote')}>><Glyphicon glyph="thumbs-up" title="Up Vote"/></Button>
            <Button className="button-post" bsSize="small" 
    			onClick={() => this.props.voteComment('downVote')}>><Glyphicon glyph="thumbs-down" title="Down Vote"/></Button>
            <Button className="button-post" bsSize="small" onClick={() => { this.setState({ modalCommentEdit: true})}}><Glyphicon glyph="pencil" title="Edit Comment"/></Button>
            <Button className="button-post" bsSize="small" onClick={() => { this.setState({ modalCommentDelete: true})}} ><Glyphicon glyph="trash" title="Delete Comment"/></Button>
            </ButtonToolbar>
            <Modal
              show={this.state.modalCommentDelete}
              onHide={this.handleHide}
            >
              <Modal.Body>
                  <em><b>Are you sure you want to delete this comment?</b></em>
              </Modal.Body>
              <Modal.Footer>
                <Button bsStyle="danger" onClick={() => { this.props.deleteComment( this.props.comment[ "parentId" ]); this.handleHide() }}>Yes</Button>
                <Button bsStyle="info" onClick={() => this.handleHide()}>Cancel</Button>
              </Modal.Footer>
            </Modal>
            <Modal
              show={this.state.modalCommentEdit}
              onHide={this.handleHide}
            >
			<Modal.Header>
				<b>Edit Comment</b>
			</Modal.Header>
            <Modal.Body>
            <Form horizontal>
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
    return { comment: state.comments[ ownProps.id ] }
}

const mapDispatchToProps = (dispatch, ownProps ) => {
    return {
      	voteComment: ( vote ) => dispatch(voteComment( ownProps.id, vote )),
      	deleteComment: ( parentId ) => dispatch(deleteComment( ownProps.id, parentId )),
        editComment: ( data ) => dispatch( editComment( ownProps.id, data ))
    };
};

export default connect(mapStateToProps, mapDispatchToProps )( CommentBar )
