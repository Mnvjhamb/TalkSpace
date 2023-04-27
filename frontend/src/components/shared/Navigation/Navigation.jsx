import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';
import { logout } from '../../../http/';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../../../store/authSlice';
export default function Navigation() {
	const brandStyle = {
		color: '#fff',
		textDecoration: 'none',
		fontWeight: 'bold',
		fontSize: '22px',
		display: 'flex',
		alignItems: 'center'
	};

	const logoText = {
		marginLeft: '10px'
	};

	const dispatch = useDispatch();

	const { isAuth, user } = useSelector((state) => state.auth);

	const logoutUser = async () => {
		try {
			const { data } = await logout();
			console.log(data);
			dispatch(setAuth(data));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<nav className={`${styles.navbar} container`}>
			<Link
				style={brandStyle}
				to="/"
			>
				<img
					src="/images/logo.png"
					alt="logo"
				/>
				<span style={logoText}>TalkSpace</span>
			</Link>

			<div className={styles.navRight}>
				{isAuth && user.activated && (
					<>
						<h3>{user.name}</h3>
						<Link to="/">
							<img
								className={styles.profile}
								src={user.profile}
								width="40"
								height="40"
								alt="profile"
							/>
						</Link>
					</>
				)}
				{isAuth && (
					<button
						className={styles.logoutButton}
						onClick={logoutUser}
					>
						<img
							src="/images/logout.png"
							alt="logout"
						/>
					</button>
				)}
			</div>
		</nav>
	);
}
