import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { capitalize } from 'lodash'
import { connect } from 'react-redux';
import { getCategories } from '../actions/categoryActions';
import { getPostsCategories } from '../actions/postListActions';
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import PostList from './PostList';
import Post from './Post';
import NewPost from './AddPost';
import NewComment from './AddComment';

class Application extends Component {
  componentDidMount() {
	this.props.fetchCategories()
  }

  render() {   
    const categories = this.props.categories
    const fetchPosts = this.props.fetchPosts
    
    return (
        <BrowserRouter>
        <div>
          <ul className="header">
            <li><NavLink exact to="/" onClick={() => fetchPosts('all')} >All Posts</NavLink></li>
      		{ categories.length > 0 && categories.map(( category ) => (
      			<li key={ category.path }><NavLink to={`/${category.path}`}
				onClick={() => fetchPosts(category.path)}>{capitalize(category.name)}</NavLink></li>
    			))
      		}
          </ul>
          <div className="content">
		  <Switch>
      		<Route path="/" exact component={PostList} />
      		<Route path="/post/new" exact component={NewPost} />
            <Route path="/:category" exact component={PostList} />
            <Route path="/:category/:id" exact component={Post} />
			<Route path="/:category/:id/comment/new" exact component={NewComment} />
      	  </Switch>
          </div>
        </div>
		</BrowserRouter>
    );
  }
}

const mapStateToProps = (state)  => {
    return { categories: state.categories }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: (category) => dispatch(getPostsCategories(category)),
      	fetchCategories: () => dispatch( getCategories())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Application)




