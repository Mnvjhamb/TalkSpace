import React from 'react';
import Card from '../../../components/shared/Card/Card';
import Button from '../../../components/shared/Button/Button';
import styles from './StepProfile.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { setProfile } from '../../../store/activateSlice';
import { activate } from '../../../http/index';
import { setAuth } from '../../../store/authSlice';
import Loader from '../../../components/shared/Loader/Loader';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function StepProfile({ onClick }) {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { name, profile } = useSelector((state) => state.activate);
	const [image, setImage] = useState('/images/monkey-avatar.png');
	const [mounted, setMounted] = useState(false);

	const captureImage = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setImage(reader.result);
			dispatch(setProfile(reader.result));
		};
	};

	const submit = async () => {
		if (!name || !profile) return;
		setLoading(true);
		try {
			const { data } = await activate({ name, profile });
			console.log(data);

			if (data.auth) {
				if (!mounted) {
					console.log('mounting');

					dispatch(setAuth(data));
				}
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		return () => {
			setMounted(true);
		};
	}, []);

	if (loading) return <Loader message={'Activation in progress.... '} />;

	return (
		<>
			<Card
				title={`Hey!! ${name}`}
				icon="monkey-emoji"
			>
				<p className={styles.subHeading}>Select Avatar</p>

				<div className={styles.avatarWrapper}>
					<img
						className={styles.avatarImage}
						src={image}
						alt="avatar"
					/>
				</div>

				<div>
					<input
						onChange={captureImage}
						type="file"
						className={styles.avatarInput}
						id="avatarInput"
					/>
					<label
						className={styles.avatarLabel}
						htmlFor="avatarInput"
					>
						Choose a different photo
					</label>
				</div>

				<div className={styles.actionButtonWrap}>
					<Button
						onClick={submit}
						text="Next"
					/>
				</div>
			</Card>
		</>
	);
}
