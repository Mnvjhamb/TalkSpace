import React from 'react'
import Card from '../../../components/shared/Card/Card'
import Button from '../../../components/shared/Button/Button'
import TextInput from '../../../components/shared/TextInput/TextInput'
import styles from './StepName.module.css'
import { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {setName} from '../../../store/activateSlice'

export default function StepName({onNext}) {
  const dispatch = useDispatch();
  const {name} = useSelector(state => state.activate)
  const [fullname, setFullname] = useState(name);

  const nextStep = ()=> {
    if(!fullname)
      return;

    dispatch(setName(fullname))

    onNext();
    
  }

  return (
    
    <>
          <Card
              title="Enter your full name"
              icon="goggle-emoji"
          >
              <TextInput
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
              />
              <p className={styles.paragraph}>
                  People use real names at clubhouse :) 
              </p>
              <div className={styles.actionButtonWrap}>
                  <Button onClick={nextStep} text="Next" />
              </div>
          </Card>
        
        </>
    
  )
}
