// @ts-nocheck
import { Button } from "react-bootstrap";
import DeftButton from "../../component/deftButton/deftButton";
import { stepsArray } from "../../pages/onBoarding/stepperConstant";
import { useDispatch } from "react-redux";
import { handleCurrentIndex } from "../../store/slice/onBoardingSlice";
import { useState, useEffect } from "preact/hooks";
import { useNavigate } from "react-router-dom";

export default function StepperButton(props) {
  const { currentStepIndex, handleSubmit,goToDashboard } = props;
  const [currentIndex, setCurrentStepIndex] = useState(currentStepIndex);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
const data={
  index:currentIndex,
  completed:true
}
    dispatch(handleCurrentIndex(data));
    navigate(stepsArray[currentIndex].url);
  }, [currentIndex, dispatch, navigate]);

  const handleNext = () => {
    if (currentIndex < stepsArray.length - 1) {
      setCurrentStepIndex(currentIndex + 1);
    }
  };

  const handleSkip = () => {
    if (currentIndex < stepsArray.length - 1) {
      setCurrentStepIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentStepIndex(currentIndex - 1);
    }
  };
  const handleSave = async () => {
    const isSuccessful = await handleSubmit(); // Call handleSubmit and wait for the result
    if (isSuccessful) { // Check if handleSubmit was successful
      handleNext(); // Move to the next step
    }
  };

  return (
    <div className="button-group d-flex justify-content-between my-5 align-items-center">
      <Button
        onClick={handlePrev}
        disabled={currentStepIndex === 0}
        className="text-black btn btn-light rounded-2 shadow-none h-75"
      >
        Previous
      </Button>
      <div className="d-flex gap-3">
        <DeftButton
          onClick={handleSkip}
          disabled={currentIndex === stepsArray.length - 1}
          btnName="Skip"
          btnClass="text-black fw-bold bg-transparent border-0 shadow-none h-75"
        />
        <DeftButton
          onClick={currentIndex >= 3 ?  goToDashboard : handleSubmit?handleSave:handleNext}
          disabled={currentStepIndex === stepsArray.length - 1}
          btnName={currentIndex >= 3 ? "Go to dashboard" : "Save & Next"}
          btnClass="h-75 rounded-2 focus-change"
        />
      </div>
    </div>
  );
}
