// import React from 'react';
import { connect } from 'react-redux';
import Sidebar from './Sidebar';

// export default function SidebarContainer() {
// 	// debugger;

// 	return (
// 		<StoreContext.Consumer>
// 			{(store) => {
// 				let state = store.getState().sidebar.friendsData;
// 				console.log(state);

// 				return <Sidebar friendsData={state} />;
// 			}}
// 		</StoreContext.Consumer>
// 	);
// }

let mapStateToProps = (state) => {
	return {
		friendsData: state.sidebar.friendsData,
	};
};
let mapDispatchToProps = () => {
	return {};
};
const SidebarContainer = connect(mapStateToProps, mapDispatchToProps)(Sidebar);
export default SidebarContainer;
