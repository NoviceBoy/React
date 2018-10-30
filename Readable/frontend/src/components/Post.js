import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { getPost } from '../actions/postListActions';
import { Link } from 'react-router-dom'
import CommentList from './CommentList'
import PostBar from './PostBar'
import PostData from './PostData'
class Post extends Component {

  componentDidMount() {
	const id = this.props.match.params.id
    this.props.fetchPost( id )
  }

  render(){
    var post = this.props.post
    const category = this.props.match.params.category
    if( post  && post.category === category ){
      return(
            <div className="post">
			<PostBar id={post.id}/>						
			<PostData id={post.id}/>
            <ButtonToolbar className='btn-right'>
              	<Link to={`/${ post.category }/${ post.id }/comment/new`}><Button className="button-post" bsStyle="success">Add Comment</Button></Link>
    		</ButtonToolbar><br/><br/>
            <hr/>
            <CommentList  postId={ post.id }/>
          </div>
      );
  } else {
    return( 
    	<div>
        <b> Post not found </b>
        </div>
    );
  	 
  }
  }
}

const mapStateToProps = (state, ownProps )  => {
    return { post: state.posts[ ownProps.match.params.id ] }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPost: (id) => dispatch(getPost(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps )(Post)