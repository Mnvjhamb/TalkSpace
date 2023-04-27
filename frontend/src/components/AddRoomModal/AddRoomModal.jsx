import React from 'react'
import styles from './AddRoomModal.module.css'
import TextInput from '../shared/TextInput/TextInput'
import { useState } from 'react'
import {createRoom as create} from '../../http';
import { useNavigate } from "react-router-dom";
export default function AddRoomModal({onClose}) {

  const [roomType, setRoomType] = useState('open');
  const [topic, setTopic] = useState('');
  const navigate = useNavigate();

  const createRoom = async () => {
    // server call

    if(!topic) return;
    try {
      const {data} = await create({topic, roomType})
      console.log(data);

      navigate(`/room/${data.id}`)

    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className={styles.modalMask}>
      <div className={styles.modalBody}>

        <button onClick={onClose} className={styles.closeButton}>
          <img src="/images/close.png" alt="close" />
        </button>

        <div className={styles.modalHeader}>

          <h3 className={styles.heading}>Enter the topic to be disscussed</h3>
          <TextInput value={topic} onChange={(e) => setTopic(e.target.value)} fullwidth="true"/>

          <h2 className={styles.subHeading}>Room types</h2>

          <div className={styles.roomTypes}>

            <div onClick={() => setRoomType('open')} className={`${styles.typeBox} ${roomType === 'open' ? styles.active : ""}`}>
              <img src="/images/globe.png" alt="globe" />
              <span>Open</span>
            </div>
            <div onClick={() => setRoomType('social')} className={`${styles.typeBox} ${roomType === 'social' ? styles.active : ""}`}>
              <img src="/images/social.png" alt="social" />
              <span>Social</span>
            </div>
            <div onClick={() => setRoomType('lock')} className={`${styles.typeBox} ${roomType === 'lock' ? styles.active : ""}`}>
              <img src="/images/lock.png" alt="lock" />
              <span>Private</span>
            </div>
          </div>

        </div>
        <div className={styles.modalFooter}>
          <h2>Start a room, open to everyone</h2>
          <button onClick={createRoom} className={styles.footerButton}><img src="/images/celebration.png" alt="celebration" />
            <span>Let's Go</span>
          </button>
        </div>

      </div>
    </div>
  )
}
