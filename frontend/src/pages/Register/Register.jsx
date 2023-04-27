import React, {useState} from 'react'
import styles from "./Register.module.css"

import StepPhoneEmail from '../Steps/StepPhoneEmail/StepPhoneEmail'
import StepName from '../Steps/StepName/StepName'
import StepOtp from '../Steps/StepOtp/StepOtp'
import StepProfile from '../Steps/StepProfile/StepProfile'
import StepUsername from '../Steps/StepUsername/StepUsername'

const steps = {
    1: StepPhoneEmail,
    2: StepOtp,
    3: StepName,
    4: StepProfile,
    5: StepUsername
};


export default function Register() {
    const [step, setStep] = useState(1);
    const Step = steps[step];

    const nextStep = ()=>{
        setStep(step +1);
    }

  return (

        <Step onClick={nextStep}/>
    
  )
}
