import React, {useState} from 'react'
import styles from "./Login.module.css"

import StepPhoneEmail from '../Steps/StepPhoneEmail/StepPhoneEmail'
import StepOtp from '../Steps/StepOtp/StepOtp'

const steps = {
    1: StepPhoneEmail,
    2: StepOtp
};


export default function Login() {
    const [step, setStep] = useState(1);
    const Step = steps[step];

    const nextStep = ()=>{
        setStep(step +1);
    }

  return (

        <Step onClick={nextStep}/>
    
  )
}
