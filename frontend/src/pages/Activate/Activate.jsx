import React, { useState } from 'react'
import StepName from '../Steps/StepName/StepName';
import StepProfile from '../Steps/StepProfile/StepProfile';

const steps = {
  1 : StepName,
  2 : StepProfile
}

export default function Activate() {

  const [step, setStep] = useState(1);
  const Step = steps[step];

  const onNext = ()=>{
    setStep(step +1);
  }

  return (
    <div className='cardWrapper'>
      <Step onNext={onNext} />
    </div>
  )
}
