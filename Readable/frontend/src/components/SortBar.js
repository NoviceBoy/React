import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { VOTES_ASCENDING, VOTES_DESCENDING, DATE_ASCENDING, DATE_DESCENDING } from '../commonUtils/utils'
import { Button, ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
import { setSortFilter } from '../actions/sortActions';

class SortBar extends Component {
  handleChange = ( e ) => {
    this.props.setSortFilter( e )
  }
  render() {   
    const sortOrder = this.props.sortOrder
	return( <div>
      <DropdownButton onSelect={ (e) => this.handleChange(e) } title="Sort By" id="dropdown-size-medium">
      <MenuItem eventKey={VOTES_DESCENDING} active={ sortOrder === VOTES_DESCENDING } >Votes: Descending</MenuItem>
      <MenuItem eventKey={VOTES_ASCENDING} active={ sortOrder === VOTES_ASCENDING }>Votes: Ascending</MenuItem>
      <MenuItem eventKey={DATE_DESCENDING} active={ sortOrder === DATE_DESCENDING }>Date: Descending</MenuItem>
      <MenuItem eventKey={DATE_ASCENDING} active={ sortOrder === DATE_ASCENDING }>Date: Ascending</MenuItem>
      </DropdownButton>
      <ButtonToolbar className='btn-right'>
      <Link to="/post/new"><Button className="button-post" bsStyle="success">Add Post</Button></Link>
      </ButtonToolbar><br/><hr/>        
      </div> )
  }
}

const mapStateToProps = (state)  => {
    return { sortOrder: state.sortOrder }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSortFilter: (category) => dispatch(setSortFilter(category)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SortBar)