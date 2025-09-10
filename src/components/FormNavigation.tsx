import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Send, AlertCircle } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription } from '@/components/ui/alert';
import AlertCustomModal from './AlertCustomModal';
import { useNavigate } from 'react-router-dom';

interface Props {
    currentStep: number;
    totalSteps: number;
    onNext: () => void;
    onPrevious: () => void;
    onSubmit: () => void;
    isValid: boolean;
}

const FormNavigation: React.FC<Props> = ({
    currentStep,
    totalSteps,
    onNext,
    onPrevious,
    onSubmit,
    isValid,
}) => {

    const navigate = useNavigate();

    const [showValidationAlert, setShowValidationAlert] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const isFirstStep = currentStep === 1;
    const isLastStep = currentStep === totalSteps;

    const handleNext = () => {
        if (!isValid) {
            setShowValidationAlert(true);
            // Hide alert after 5 seconds
            setTimeout(() => setShowValidationAlert(false), 5000);
            return;
        }
        setShowValidationAlert(false);
        onNext();
    };

    const handleSubmit = () => {
        if (!isValid) {
            setShowValidationAlert(true);
            setTimeout(() => setShowValidationAlert(false), 5000);
            return;
        }
        setShowValidationAlert(false);

        onSubmit();

        // Show success modal
        setShowSuccessModal(true);
    };

    const handleModalClose = () => {
        setShowSuccessModal(false);
        navigate('/diver')
    };

    return (
        <>
            <div className="pt-6 border-t">
                {/* Validation Alert */}
                {showValidationAlert && (
                    <Alert className="mb-4 border-red-200 bg-red-50">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-700">
                            Please fill in all required fields before proceeding. Required fields are marked with a red asterisk (*).
                        </AlertDescription>
                    </Alert>
                )}

                <div className="flex justify-between items-center">
                    {/* Back Button */}
                    <div>
                        {!isFirstStep && (
                            <Button
                                onClick={onPrevious}
                                variant="outline"
                                className="flex items-center space-x-2"
                            >
                                <ChevronLeft size={16} />
                                <span>Back</span>
                            </Button>
                        )}
                    </div>

                    {/* Step Counter */}
                    <div className="text-sm text-gray-500">
                        {currentStep} of {totalSteps} forms completed
                    </div>

                    {/* Next / Submit Button with Tooltip */}
                    <div>
                        <TooltipProvider delayDuration={200}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span>
                                        {isLastStep ? (
                                            <Button
                                                onClick={handleSubmit}
                                                className={`flex items-center space-x-2 ${isValid
                                                    ? 'bg-gradient-to-r from-primaryBlue to-primary text-white'
                                                    : 'bg-gray-400 hover:bg-gray-500 cursor-not-allowed'
                                                    }`}
                                            >
                                                <Send size={16} />
                                                <span>Submit Report</span>
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={handleNext}
                                                className={`flex items-center space-x-2 ${isValid
                                                    ? 'bg-primary hover:bg-primary/90'
                                                    : 'bg-gray-400 hover:bg-gray-500 cursor-not-allowed'
                                                    }`}
                                            >
                                                <span>Next</span>
                                                <ChevronRight size={16} />
                                            </Button>
                                        )}
                                    </span>
                                </TooltipTrigger>
                                {!isValid && (
                                    <TooltipContent side="top" className='z-50 bg-white shadow-md border'>
                                        <p className="text-red-600">Please fill all required fields before continuing</p>
                                    </TooltipContent>
                                )}
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            <AlertCustomModal
                isVisible={showSuccessModal}
                onClose={handleModalClose}
                title="Report Submitted Successfully!"
                message="Thank you for your submission."
            />
        </>
    );
};

export default FormNavigation;