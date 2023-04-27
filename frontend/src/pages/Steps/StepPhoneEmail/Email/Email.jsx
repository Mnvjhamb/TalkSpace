import React, { useState } from 'react';
import Card from '../../../../components/shared/Card/Card';
import Button from '../../../../components/shared/Button/Button';
import TextInput from '../../../../components/shared/TextInput/TextInput';
import styles from '../StepPhoneEmail.module.css';
import { useDispatch } from 'react-redux';
import { setOtp } from '../../../../store/authSlice';

import { sendOtp } from '../../../../http';

export default function Email({ onNext }) {
	const [email, setEmail] = useState('');
	const dispatch = useDispatch();
	const submit = async () => {
		//server request
		if (!email) return;
		const { data } = await sendOtp({ email: email });
		console.log(data);

		dispatch(
			setOtp({
				email: data.email,
				hash: data.hash
			})
		);

		onNext();
	};
	return (
		<Card
			title="Enter your email id"
			icon="email-emoji"
		>
			<TextInput
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>

			<div>
				<div className={styles.actionButtonWrap}>
					<Button
						onClick={submit}
						text="Next"
					/>
				</div>

				<p className={styles.bottomPara}>
					By entering your email, you're agreeing to our Terms of
					Service and Privacy Policy. Thanks!
				</p>
			</div>
		</Card>
	);
}
