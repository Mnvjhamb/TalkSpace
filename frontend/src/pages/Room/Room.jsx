import React, { useState, useEffect } from 'react';
import { useWebRTC } from '../../hooks/useWebRTC';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getRoom } from '../../http/';
import { useDispatch } from 'react-redux';

import styles from './Room.module.css';

export default function Room() {
	const dispatch = useDispatch();

	const { id: roomId } = useParams();
	const user = useSelector((state) => state.auth.user);
	const { clients, provideRef, handleMute } = useWebRTC(roomId, user);
	const [room, setRoom] = useState(null);
	const [isMuted, setMuted] = useState(true);

	const navigate = useNavigate();
	const handleManualLeave = () => {
		return navigate('/rooms');
	};

	useEffect(() => {
		handleMute(isMuted, user.id);
	}, [isMuted]);

	useEffect(() => {
		const fetchRoom = async () => {
			const { data } = await getRoom(roomId);
			setRoom((prev) => data);
		};
		fetchRoom();
	}, [roomId]);

	const handleMuteClick = (clientId) => {
		console.log('clients', clients);
		if (clientId !== user.id) {
			return;
		}

		setMuted((prev) => !prev);
	};

	return (
		<div>
			<div className="container">
				<button
					onClick={handleManualLeave}
					className={styles.goBack}
				>
					<img
						src="/images/arrow-left.png"
						alt="arrow-left"
					/>
					<span>All voice rooms</span>
				</button>
			</div>

			<div className={styles.clientsWrap}>
				<div className={styles.header}>
					<h2 className={styles.topic}>{room?.topic}</h2>
					<div className={styles.actions}>
						<button
							className={styles.actionBtn}
							onClick={handleManualLeave}
						>
							<img
								src="/images/win.png"
								alt="win-icon"
							/>
							<span>Leave quietly</span>
						</button>
					</div>
				</div>

				<div className={styles.clientsList}>
					{clients.map((client) => {
						return (
							<div
								key={client.id}
								className={styles.client}
							>
								<div className={styles.userHead}>
									<audio
										ref={(instance) =>
											provideRef(instance, client.id)
										}
										autoPlay
									></audio>
									<img
										className={styles.userAvatar}
										src={client.profile}
										alt="profile"
									/>
									<button
										onClick={() =>
											handleMuteClick(client.id)
										}
										className={styles.micBtn}
									>
										{client.muted ? (
											<img
												src="/images/mic-mute.png"
												alt="mic-mute-icon"
											/>
										) : (
											<img
												src="/images/mic.png"
												alt="mic-icon"
											/>
										)}
									</button>
								</div>
								<h4>{client.name}</h4>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
