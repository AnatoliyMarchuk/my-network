import React from 'react';
import Users from './Users';
import { connect } from 'react-redux';
// import { withAuthRedirect } from '../../hoc/withAuthRedirect';

import {
	follow,
	unfollow,
	setCurrentPage,
	toggleFollowingProgress,
	requestUsers,
	unsubscribe,
	subscribe,
} from '../../redux/usersReducer.ts';
import Preloader from '../../commons/loader/Preloader';
import { compose } from 'redux';
import {
	getCurrentPage,
	getFollowingInProgress,
	getIsFetching,
	getPageSize,
	getTotalUsersCount,
	getUsers,
} from '../../redux/selectors';

class UsersContainer extends React.Component {
	componentDidMount() {
		const { currentPage, pageSize } = this.props;
		this.props.getUsers(currentPage, pageSize);
	}

	onPageChange = (pageNumber) => {
		const { pageSize } = this.props;
		this.props.getUsers(pageNumber, pageSize);
	};
	render() {
		return (
			<>
				{this.props.isFetching ? <Preloader /> : null}

				<Users
					totalUsersCount={this.props.totalUsersCount}
					pageSize={this.props.pageSize}
					currentPage={this.props.currentPage}
					onPageChange={this.onPageChange}
					users={this.props.users}
					follow={this.props.subscribe}
					unfollow={this.props.unsubscribe}
					followingInProgress={this.props.followingInProgress}
				/>
			</>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		users: getUsers(state),
		pageSize: getPageSize(state),
		totalUsersCount: getTotalUsersCount(state),
		currentPage: getCurrentPage(state),
		isFetching: getIsFetching(state),
		followingInProgress: getFollowingInProgress(state),
	};
};

export default compose(
	connect(mapStateToProps, {
		follow,
		unfollow,
		setCurrentPage,
		toggleFollowingProgress,
		getUsers: requestUsers,
		unsubscribe,
		subscribe,
	})
	// withAuthRedirect
)(UsersContainer);
