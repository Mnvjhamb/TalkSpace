import React, {useState} from 'react'
import styles from "./Authenticate.module.css"

import StepPhoneEmail from '../Steps/StepPhoneEmail/StepPhoneEmail'
import StepOtp from '../Steps/StepOtp/StepOtp'

const steps = {
    1: StepPhoneEmail,
    2: StepOtp
};


export default function Authenticate() {
    const [step, setStep] = useState(1);
    const Step = steps[step];

    const nextStep = ()=>{
        setStep(step +1);
    }

  return (
        <Step onNext={nextStep}/>    
  )
}
