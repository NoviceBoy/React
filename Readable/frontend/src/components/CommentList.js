import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getComments } from '../actions/commentsActions';
import CommentBar from './CommentBar'
import _ from 'lodash'

class CommentList extends Component {
  componentDidMount() {
    const id = this.props.postId
    this.props.fetchComments( id );
  }
  
  render() {   
    const comments = this.props.comments
        if( _.size( comments ) > 0 ) {
          return (
            <div className="comment-list">
            { comments && <div> <b> Comments :</b><br/><br/></div> }
            { _.map( comments, (( comment ) => (
            <div key={ comment.id } className="comment">
			<CommentBar id={comment.id}/>
            <b>{ comment.author }</b><em> says </em>:<br/>
            { comment.body }<br/>
            Vote Score: <b>{ comment.voteScore }</b><br/>
            <hr/>
          </div>
        )))
      }
      </div>
    );
    } else {
      return( 
      <div>
       <b>No Comments Yet</b><br/>
      </div>
      );
    }
  }
}

const mapStateToProps = (state)  => {
    return { comments: state.comments }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchComments: (id) => dispatch(getComments(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps )(CommentList)
