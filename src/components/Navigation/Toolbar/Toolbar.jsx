import PropTypes from 'prop-types';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import classes from './Toolbar.module.css';

const toolbar = props => (
	<header className={classes.Toolbar}>
		<DrawerToggle clicked={props.drawerToggleClicked} />
		{/* <div onClick={props.clicked}>MENU</div> */}
		<div className={classes.Logo}>
			<Logo />
		</div>
		<nav className={classes.DesktopOnly}>
			<NavigationItems />
		</nav>
	</header>
);

toolbar.propTypes = {
	drawerToggleClicked: PropTypes.func
};

export default toolbar;
