import React from 'react';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { formSteps } from '@/config/formConfig';

interface Props {
    currentStep: number;
    totalSteps: number;
}

const FormProgressBar: React.FC<Props> = ({ currentStep, totalSteps }) => {
    const progressPercentage = (currentStep / totalSteps) * 100;
    
    // Calculate which steps to show based on screen size
    const getVisibleSteps = () => {
        const mobileStepsToShow = 3; // Show 3 steps on mobile
        // const tabletStepsToShow = 4; // Show 4 steps on tablet
        // const desktopStepsToShow = 5; // Show 5 steps on desktop
        
        // Default to mobile logic, will be handled by CSS classes
        let stepsToShow = mobileStepsToShow;
        let startIndex = 0;
        
        // Mobile logic (3 steps)
        if (currentStep <= 2) {
            startIndex = 0;
        } else if (currentStep > totalSteps - 1) {
            startIndex = Math.max(0, totalSteps - stepsToShow);
        } else {
            startIndex = currentStep - 2;
        }
        
        const endIndex = Math.min(startIndex + stepsToShow, totalSteps);
        return formSteps.slice(startIndex, endIndex).map((step, index) => ({
            ...step,
            actualIndex: startIndex + index + 1
        }));
    };

    const visibleSteps = getVisibleSteps();
    const showLeftDots = visibleSteps[0]?.actualIndex > 1;
    const showRightDots = visibleSteps[visibleSteps.length - 1]?.actualIndex < totalSteps;

    return (
        <div className="w-full space-y-4 px-2 sm:px-4 lg:px-6">
            {/* Progress bar */}
            <div className="relative">
                <Progress value={progressPercentage} className="h-2 sm:h-3" />
                <div className="absolute -top-1 -right-1 bg-gradient-to-r from-primaryBlue to-primary text-white text-xs px-2 py-1 rounded-full shadow-sm">
                    {currentStep}/{totalSteps}
                </div>
            </div>

            {/* Step indicators */}
            <div className="flex justify-between items-center">
                {/* Left dots indicator - hidden on mobile for space */}
                {showLeftDots && (
                    <div className="hidden sm:flex flex-col items-center space-y-2 flex-shrink-0">
                        <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center bg-gray-100 border border-gray-300">
                            <ChevronLeft size={14} className="text-gray-400 lg:w-5 lg:h-5" />
                        </div>
                        <span className="text-xs text-gray-400">
                            ...
                        </span>
                    </div>
                )}

                {/* Mobile left indicator */}
                {showLeftDots && (
                    <div className="sm:hidden flex items-center">
                        <ChevronLeft size={16} className="text-gray-400" />
                        <span className="text-xs text-gray-400 ml-1">...</span>
                    </div>
                )}

                {/* Visible steps */}
                <div className="flex justify-between items-center flex-1 mx-2 sm:mx-4">
                    {visibleSteps.map((step) => {
                        const isCompleted = step.actualIndex < currentStep;
                        const isCurrent = step.actualIndex === currentStep;
                        const IconComponent = step.icon;

                        return (
                            <div key={step.id} className="flex flex-col items-center space-y-1 sm:space-y-2 flex-1 min-w-0">
                                {/* Step circle */}
                                <div
                                    className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 shadow-sm ${
                                        isCompleted
                                            ? 'bg-green-600 border-green-600 text-white shadow-green-200'
                                            : isCurrent
                                                ? 'bg-gradient-to-r from-primaryBlue to-primary border-primaryBlue text-white shadow-blue-200'
                                                : 'bg-gray-100 border-gray-300 text-gray-400'
                                    }`}
                                >
                                    <IconComponent 
                                        size={14} 
                                        className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" 
                                    />
                                </div>
                                
                                {/* Step title and number */}
                                <div className="flex flex-col items-center max-w-full">
                                    {/* Step title - responsive text sizing */}
                                    <div
                                        className={`text-xs sm:text-sm lg:text-base text-center transition-colors duration-200 ${
                                            isCompleted || isCurrent 
                                                ? 'text-gray-900 font-medium' 
                                                : 'text-gray-400'
                                        }`}
                                        title={step.title} // Show full title on hover
                                    >
                                        {/* Mobile: Show abbreviated or smart truncation */}
                                        <div className="sm:hidden w-12 sm:w-16">
                                            {step.title.length <= 6 ? (
                                                <span className="whitespace-nowrap">{step.title}</span>
                                            ) : (
                                                <span className="block leading-3">
                                                    {step.title.split(' ').length > 1 ? (
                                                        // If multiple words, show first word + ...
                                                        step.title.split(' ')[0].length <= 8 ? 
                                                            step.title.split(' ')[0] : 
                                                            `${step.title.split(' ')[0].substring(0, 6)}...`
                                                    ) : (
                                                        // Single word, truncate
                                                        `${step.title.substring(0, 5)}...`
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                        
                                        {/* Tablet: Show more text but still constrained */}
                                        <div className="hidden sm:block lg:hidden w-16 lg:w-20">
                                            {step.title.length <= 10 ? (
                                                <span className="whitespace-nowrap">{step.title}</span>
                                            ) : (
                                                <span className="block leading-4">
                                                    {step.title.split(' ').length > 1 ? (
                                                        // Multiple words, show first 2 words or truncate
                                                        step.title.split(' ').slice(0, 2).join(' ').length <= 12 ?
                                                            step.title.split(' ').slice(0, 2).join(' ') :
                                                            `${step.title.split(' ')[0]}...`
                                                    ) : (
                                                        // Single word, truncate
                                                        `${step.title.substring(0, 8)}...`
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                        
                                        {/* Desktop: Show full title with proper wrapping */}
                                        <div className="hidden lg:block w-20 xl:w-24">
                                            <span className="leading-4 break-words hyphens-auto">
                                                {step.title}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {/* Step number */}
                                    <span className="text-xs text-gray-500 mt-1 font-medium">
                                        {step.actualIndex}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Right dots indicator - hidden on mobile for space */}
                {showRightDots && (
                    <div className="hidden sm:flex flex-col items-center space-y-2 flex-shrink-0">
                        <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center bg-gray-100 border border-gray-300">
                            <ChevronRight size={14} className="text-gray-400 lg:w-5 lg:h-5" />
                        </div>
                        <span className="text-xs text-gray-400">
                            ...
                        </span>
                    </div>
                )}

                {/* Mobile right indicator */}
                {showRightDots && (
                    <div className="sm:hidden flex items-center">
                        <span className="text-xs text-gray-400 mr-1">...</span>
                        <ChevronRight size={16} className="text-gray-400" />
                    </div>
                )}
            </div>

            {/* Progress text - responsive layout */}
            <div className="text-center">
                <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center sm:space-x-2 space-y-1 sm:space-y-0">
                    <span className="text-sm lg:text-base text-gray-600">
                        Step {currentStep} of {totalSteps}:
                    </span>
                    <span className="font-medium text-gray-800 text-sm lg:text-base">
                        {formSteps[currentStep - 1]?.title}
                    </span>
                </div>
            </div>

            {/* Mobile summary - shows current range */}
            <div className="block sm:hidden text-center text-xs text-gray-500 bg-gray-50 rounded-lg py-2 px-3">
                <div className="flex justify-between items-center">
                    <span>Steps {visibleSteps[0]?.actualIndex} - {visibleSteps[visibleSteps.length - 1]?.actualIndex}</span>
                    <span className="text-primaryBlue font-medium">
                        {Math.round(progressPercentage)}% Complete
                    </span>
                </div>
            </div>

            {/* Desktop/Tablet additional info */}
            <div className="hidden lg:block text-center text-sm text-gray-500">
                <div className="flex justify-center items-center space-x-4">
                    <span>Progress: {Math.round(progressPercentage)}%</span>
                    <span>•</span>
                    <span>{totalSteps - currentStep} steps remaining</span>
                </div>
            </div>
        </div>
    );
};

export default FormProgressBar;