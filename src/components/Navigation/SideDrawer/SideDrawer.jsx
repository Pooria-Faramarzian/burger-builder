import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import PropTypes from 'prop-types';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const SideDrawer = props => {
	let attachedClassed = [classes.SideDrawer, classes.Close];
	if (props.open) {
		attachedClassed = [classes.SideDrawer, classes.Open];
	}
	return (
		<Aux>
			<Backdrop show={props.open} clicked={props.closed} />
			<div className={attachedClassed.join(' ')}>
				<div className={classes.Logo}>
					<Logo />
				</div>
				<nav>
					<NavigationItems />
				</nav>
			</div>
		</Aux>
	);
};

SideDrawer.propTypes = {
	open: PropTypes.bool,
	closed: PropTypes.func
};

export default SideDrawer;
