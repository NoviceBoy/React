import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { getDate } from '../commonUtils/utils'
import { getComments } from '../actions/commentsActions';
class PostData extends Component {
  componentDidMount() {
	const id = this.props.id
    this.props.fetchCommentCount( id )
  }

  render(){
      const post = this.props.post
      return(				
          <div>
            <Link to={`/${ post.category }/${ post.id }`}><b>{post.title}</b></Link><br/>
            Created by : <em>{ post.author }</em><br/>
            Category : { post.category }<br/>
            Posted on on: { getDate( post.timestamp )}<br/>
            Description: { post.body }<br/>
            Vote Score: <b>{ post.voteScore }</b><br/>
			Comments: <b>{ this.props.commentCount }</b><br/><br/>
          </div>
      );
  }
}

const mapStateToProps = (state, ownProps )  => {
    return { post: state.posts[ ownProps.id ], commentCount : state.count[ ownProps.id ] }
}

const mapDispatchToProps = (dispatch) => {
    return {
	    fetchCommentCount: (id) => dispatch(getComments(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps )(PostData)

