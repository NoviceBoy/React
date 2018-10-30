import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { getPostsCategories } from '../actions/postListActions';
import { VOTES_ASCENDING, VOTES_DESCENDING, DATE_ASCENDING, DATE_DESCENDING } from '../commonUtils/utils'
import SortBar from './SortBar'
import PostBar from './PostBar'
import PostData from './PostData'
import _ from 'lodash'

class PostList extends Component {
  componentDidMount() {
    const category = this.props.match.params.category
    if( category ) {
		this.props.fetchPosts( category )
    } else {
      	this.props.fetchPosts( "all" )
    }
  }
  
  
  render() {   
    var posts = this.props.posts
    const sortOrder = this.props.sortOrder
    switch( sortOrder ){
      case VOTES_ASCENDING: 
        	posts = _.sortBy( posts, "voteScore" )
        	break;
      case VOTES_DESCENDING: 
        	posts = _.sortBy( posts, "voteScore" ).reverse()
        	break;
      case DATE_ASCENDING: 
        	posts = _.sortBy( posts, "timestamp" )
        	break;
      case DATE_DESCENDING: 
        	posts = _.sortBy( posts, "timestamp" ).reverse()
        	break;
      default:
        	posts = _.sortBy( posts, "timestamp" )
    }
    if( _.size( posts ) > 0  ) {
      return (
        <div className="post-list">
        <SortBar />
        { _.map( posts, ( post ) => (
        <div key={ post.id } className="post">
		<PostBar id={post.id}/>		
		<PostData id={post.id}/>
        <ButtonToolbar>
        	<Link to={`/${ post.category }/${ post.id }`}><Button className="button-post" bsStyle="success">Details</Button></Link>
        </ButtonToolbar>
    <hr/>
      </div>
))
  }
  </div>
);
} else {
  return(
  <div>
  <SortBar />
   <b>No Posts Yet!!!</b><br/>
  </div> 
  );
}
  }
}

const mapStateToProps = (state)  => {
    return { posts: state.posts, 
           sortOrder: state.sortOrder }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: (category) => dispatch(getPostsCategories(category)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps )(PostList)
