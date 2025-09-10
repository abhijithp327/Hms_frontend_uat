import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import type { FormData } from '@/types/FormTypes';
import { formSteps, initialFormData } from '@/config/formConfig';
import FormProgressBar from '@/components/FormProgressBar';
import FormNavigation from '@/components/FormNavigation';

// Forms
import GeneralInformationForm from '@/components/diver/forms/GeneralInfomationForm';
import DiveWorkInformationForm from '@/components/diver/forms/DiveWorkInformationForm';
import ActivityLogForm from '@/components/diver/forms/ActivityLogForm';
import DivingTeamForm from '@/components/diver/forms/DivingTeamForm';
import PointsToNoteForm from '@/components/diver/forms/PointsToNoteForm';
import FacilitiesDeployedForm from '@/components/diver/forms/FacilitiesDeployedForm';
import ScopeOfWorkForm from '@/components/diver/forms/ScopeOfWorkForm';
import ReportSignOffForm from '@/components/diver/forms/ReportSignOffForm';
import MarineGrowthConditionForm from '@/components/diver/forms/MarineGrowthConditionForm';
import BowAreaForm from '@/components/diver/forms/BoxAreaForm';
import PortVerticalSideForm from '@/components/diver/forms/PortVerticalSideForm';
import StbdVerticalSideForm from '@/components/diver/forms/StbdVerticalSideForm';
import FlatBottomForm from '@/components/diver/forms/FlatBottomForm';
import BilgeKeelForm from '@/components/diver/forms/BilgeKeelForm';
import StabilisersForm from '@/components/diver/forms/StabilisersForm';
import SeaChestGratingsForm from '@/components/diver/forms/SeaChestGratingsForm';
import SeaChestInternalForm from '@/components/diver/forms/SeaChestInternalForm';
import IICPCathodicProtectionForm from '@/components/diver/forms/IICPCathodicProtectionForm';
import BowThrustersForm from '@/components/diver/forms/BowThrusterForm';
import SternThrusterForm from '@/components/diver/forms/SternThrusterForm';
import RopeGuardForm from '@/components/diver/forms/RopeGuardForm';
import PropellerForm from '@/components/diver/forms/PropellerForm';
import RudderForm from '@/components/diver/forms/RudderForm';
import RudderSkegForm from '@/components/diver/forms/RudderSkegForm';
import DischargesPipesForm from '@/components/diver/forms/DischargePipesForm';
import SensorsForm from '@/components/diver/forms/SensorsForm';
import DraftMarksForm from '@/components/diver/forms/DraftMarksForm';
import DockingMarksForm from '@/components/diver/forms/DockingMarksForm';
import SternArchForm from '@/components/diver/forms/SternArch';
import AboveWaterlineAreasForm from '@/components/diver/forms/AboveWaterlineAreasForm';
import KortNozzleForm from '@/components/diver/forms/KortNozzleForm';
import TailShaftReadingsForm from '@/components/diver/forms/TailShaftReadingsForm';
import PintleClearanceReadingsForm from '@/components/diver/forms/PintleClearanceReadingsForm';
import InternalReportVerificationForm from '@/components/diver/forms/InternalReportVerificationForm';
import SurveyorVerificationForm from '@/components/diver/forms/SurveyorVerification';
import CompleteTaskForm from '@/components/diver/forms/completeTaskForm';

const DiverJobReport: React.FC = () => {

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  // Track validation states for each step
  const [validationStates, setValidationStates] = useState<{
    [key: number]: { isValid: boolean; errors: Record<string, string> }
  }>({
    1: { isValid: false, errors: {} },
    2: { isValid: false, errors: {} },
    3: { isValid: true, errors: {} },
    4: { isValid: true, errors: {} },
    5: { isValid: false, errors: {} },
    6: { isValid: true, errors: {} },
    7: { isValid: true, errors: {} },
    8: { isValid: false, errors: {} },
    9: { isValid: false, errors: {} },
    10: { isValid: false, errors: {} },
    11: { isValid: false, errors: {} },
    12: { isValid: false, errors: {} },
    13: { isValid: false, errors: {} },
    14: { isValid: false, errors: {} },
    15: { isValid: false, errors: {} },
    16: { isValid: false, errors: {} },
    17: { isValid: false, errors: {} },
    18: { isValid: false, errors: {} },
    19: { isValid: false, errors: {} },
    20: { isValid: false, errors: {} },
    21: { isValid: false, errors: {} },
    22: { isValid: false, errors: {} },
    23: { isValid: true, errors: {} },
    24: { isValid: true, errors: {} },
    25: { isValid: true, errors: {} },
    26: { isValid: true, errors: {} },
    27: { isValid: true, errors: {} },
    28: { isValid: true, errors: {} },
    29: { isValid: true, errors: {} },
    30: { isValid: true, errors: {} },
    31: { isValid: true, errors: {} },
    32: { isValid: true, errors: {} },
    33: { isValid: true, errors: {} },
    34: { isValid: true, errors: {} },
    35: { isValid: false, errors: {} },
    36: { isValid: true, errors: {} },
  });

  const totalSteps = formSteps.length;

  // Get current step validation status
  const isCurrentStepValid = validationStates[currentStep]?.isValid ?? false;

  // Create validation change handler for each step
  const handleValidationChange = (stepNumber: number) =>
    (isValid: boolean, errors: Record<string, string>) => {
      setValidationStates(prev => ({
        ...prev,
        [stepNumber]: { isValid, errors }
      }));
    };

  const handleNext = () => {
    if (!isCurrentStepValid) {
      toast.error("Please fill in all required fields before proceeding.");
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Check if all steps are valid before submitting
    const allStepsValid = Object.values(validationStates).every(state => state.isValid);

    if (!allStepsValid) {
      toast.error("Please ensure all required fields in all sections are completed before submitting.");
      return;
    }

    // Here you would typically send the data to your backend
    console.log('Submitting form data:', formData);
    toast.success("Diver job report submitted successfully!");

    // Reset form after submission
    setFormData(initialFormData);
    setCurrentStep(1);
    // Reset validation states
    setValidationStates({
      1: { isValid: false, errors: {} },
      2: { isValid: false, errors: {} },
      3: { isValid: true, errors: {} },
      4: { isValid: true, errors: {} },
      5: { isValid: false, errors: {} },
      6: { isValid: true, errors: {} },
      7: { isValid: true, errors: {} },
      8: { isValid: false, errors: {} },
      9: { isValid: false, errors: {} },
      10: { isValid: false, errors: {} },
      11: { isValid: false, errors: {} },
      12: { isValid: false, errors: {} },
      13: { isValid: false, errors: {} },
      14: { isValid: false, errors: {} },
      15: { isValid: false, errors: {} },
      16: { isValid: false, errors: {} },
      17: { isValid: false, errors: {} },
      18: { isValid: false, errors: {} },
      19: { isValid: false, errors: {} },
      20: { isValid: false, errors: {} },
      21: { isValid: false, errors: {} },
      22: { isValid: false, errors: {} },
      23: { isValid: true, errors: {} },
      24: { isValid: true, errors: {} },
      25: { isValid: true, errors: {} },
      26: { isValid: true, errors: {} },
      27: { isValid: true, errors: {} },
      28: { isValid: true, errors: {} },
      29: { isValid: true, errors: {} },
      30: { isValid: true, errors: {} },
      31: { isValid: true, errors: {} },
      32: { isValid: true, errors: {} },
      33: { isValid: true, errors: {} },
      34: { isValid: true, errors: {} },
      35: { isValid: false, errors: {} },
      36: { isValid: true, errors: {} },
    });
  };

  const renderCurrentForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <GeneralInformationForm
            data={formData.generalInfo}
            onChange={(data) => setFormData(prev => ({ ...prev, generalInfo: data }))}
            onValidationChange={handleValidationChange(1)}
          />
        );
      case 2:
        return (
          <DiveWorkInformationForm
            data={formData.diveWorkInfo}
            onChange={(data) => setFormData(prev => ({ ...prev, diveWorkInfo: data }))}
            onValidationChange={handleValidationChange(2)}
          />
        );
      case 3:
        return (
          <ActivityLogForm
            data={formData.activityLog}
            onChange={(data) => setFormData(prev => ({ ...prev, activityLog: data }))}
          />
        );
      case 4:
        return (
          <DivingTeamForm
            data={formData.divingTeam}
            onChange={(data) => setFormData(prev => ({ ...prev, divingTeam: data }))}
          />
        );
      case 5:
        return (
          <FacilitiesDeployedForm
            data={formData.facilitiesDeployed}
            onChange={(data) => setFormData(prev => ({ ...prev, facilitiesDeployed: data }))}
            onValidationChange={handleValidationChange(5)}
          />
        );
      case 6:
        return (
          <ScopeOfWorkForm
            data={formData.scopeOfWork}
            onChange={(data) => setFormData(prev => ({ ...prev, scopeOfWork: data }))}
          />
        );
      case 7:
        return (
          <ReportSignOffForm
            data={formData.reportSignOff}
            onChange={(data) => setFormData(prev => ({ ...prev, reportSignOff: data }))}
          />
        );
      case 8:
        return (
          <MarineGrowthConditionForm
            data={formData.marineGrowthCondition}
            onChange={(data) => setFormData(prev => ({ ...prev, marineGrowthCondition: data }))}
            onValidationChange={handleValidationChange(8)}
          />
        );
      case 9:
        return (
          <BowAreaForm
            data={formData.bowArea}
            onChange={(data) => setFormData(prev => ({ ...prev, bowArea: data }))}
            onValidationChange={handleValidationChange(9)}
          />
        );
      case 10:
        return (
          <PortVerticalSideForm
            data={formData.portVerticalSide}
            onChange={(data) => setFormData(prev => ({ ...prev, portVerticalSide: data }))}
            onValidationChange={handleValidationChange(10)}
          />
        );
      case 11:
        return (
          <StbdVerticalSideForm
            data={formData.stbdVerticalSide}
            onChange={(data) => setFormData(prev => ({ ...prev, stbdVerticalSide: data }))}
            onValidationChange={handleValidationChange(11)}
          />
        );
      case 12:
        return (
          <FlatBottomForm
            data={formData.flatBottom}
            onChange={(data) => setFormData(prev => ({ ...prev, flatBottom: data }))}
            onValidationChange={handleValidationChange(12)}
          />
        );
      case 13:
        return (
          <BilgeKeelForm
            data={formData.bilgeKeel}
            onChange={(data) => setFormData(prev => ({ ...prev, bilgeKeel: data }))}
            onValidationChange={handleValidationChange(13)}
          />
        );
      case 14:
        return (
          <StabilisersForm
            data={formData.stabilisers}
            onChange={(data) => setFormData(prev => ({ ...prev, stabilisers: data }))}
            onValidationChange={handleValidationChange(14)}
          />
        );
      case 15:
        return (
          <SeaChestGratingsForm
            data={formData.seaChestGratings}
            onChange={(data) => setFormData(prev => ({ ...prev, seaChestGratings: data }))}
            onValidationChange={handleValidationChange(15)}
          />
        );
      case 16:
        return (
          <SeaChestInternalForm
            data={formData.seaChestInternal}
            onChange={(data) => setFormData(prev => ({ ...prev, seaChestInternal: data }))}
            onValidationChange={handleValidationChange(16)}
          />
        );
      case 17:
        return (
          <IICPCathodicProtectionForm
            data={formData.iicpAndCathodicProtection}
            onChange={(data) => setFormData(prev => ({ ...prev, iicpAndCathodicProtection: data }))}
            onValidationChange={handleValidationChange(17)}
          />
        );
      case 18:
        return (
          <BowThrustersForm
            data={formData.bowThrusters}
            onChange={(data) => setFormData(prev => ({ ...prev, bowThrusters: data }))}
            onValidationChange={handleValidationChange(18)}
          />
        );
      case 19:
        return (
          <SternThrusterForm
            data={formData.sternThruster}
            onChange={(data) => setFormData(prev => ({ ...prev, sternThruster: data }))}
            onValidationChange={handleValidationChange(19)}
          />
        );
      case 20:
        return (
          <PropellerForm
            data={formData.propeller}
            onChange={(data) => setFormData(prev => ({ ...prev, propeller: data }))}
            onValidationChange={handleValidationChange(20)}
          />
        );
      case 21:
        return (
          <RopeGuardForm
            data={formData.ropeGuard}
            onChange={(data) => setFormData(prev => ({ ...prev, ropeGuard: data }))}
            onValidationChange={handleValidationChange(21)}
          />
        );
      case 22:
        return (
          <RudderForm
            data={formData.rudder}
            onChange={(data) => setFormData(prev => ({ ...prev, rudder: data }))}
            onValidationChange={handleValidationChange(22)}
          />
        );
      case 23:
        return (
          <RudderSkegForm
            data={formData.rudderSkeg}
            onChange={(data) => setFormData(prev => ({ ...prev, rudderSkeg: data }))}
            onValidationChange={handleValidationChange(23)}
          />
        );
      case 24:
        return (
          <DischargesPipesForm
            data={formData.dischargePipes}
            onChange={(data) => setFormData(prev => ({ ...prev, dischargePipes: data }))}
            onValidationChange={handleValidationChange(24)}
          />
        );
      case 25:
        return (
          <SensorsForm
            data={formData.sensors}
            onChange={(data) => setFormData(prev => ({ ...prev, sensors: data }))}
            onValidationChange={handleValidationChange(25)}
          />
        );
      case 26:
        return (
          <DraftMarksForm
            data={formData.draftMarks}
            onChange={(data) => setFormData(prev => ({ ...prev, draftMarks: data }))}
            onValidationChange={handleValidationChange(26)}
          />
        );
      case 27:
        return (
          <DockingMarksForm
            data={formData.dockingMarks}
            onChange={(data) => setFormData(prev => ({ ...prev, dockingMarks: data }))}
            onValidationChange={handleValidationChange(27)}
          />
        );
      case 28:
        return (
          <SternArchForm
            data={formData.sternArch}
            onChange={(data) => setFormData(prev => ({ ...prev, sternArch: data }))}
            onValidationChange={handleValidationChange(28)}
          />
        );
      case 29:
        return (
          <AboveWaterlineAreasForm
            data={formData.aboveWaterlineAreas}
            onChange={(data) => setFormData(prev => ({ ...prev, aboveWaterlineAreas: data }))}
            onValidationChange={handleValidationChange(29)}
          />
        );
      case 30:
        return (
          <KortNozzleForm
            data={formData.kortNozzle}
            onChange={(data) => setFormData(prev => ({ ...prev, kortNozzle: data }))}
            onValidationChange={handleValidationChange(30)}
          />
        );
      case 31:
        return (
          <TailShaftReadingsForm
            data={formData.tailShaftReadings}
            onChange={(data) => setFormData(prev => ({ ...prev, tailShaftReadings: data }))}
            onValidationChange={handleValidationChange(31)}
          />
        );
      case 32:
        return (
          <PintleClearanceReadingsForm
            data={formData.pintleClearanceReadings}
            onChange={(data) => setFormData(prev => ({ ...prev, pintleClearanceReadings: data }))}
            onValidationChange={handleValidationChange(32)}
          />
        );
      case 33:
        return (
          <InternalReportVerificationForm
            data={formData.internalReportVerification}
            onChange={(data) => setFormData(prev => ({ ...prev, internalReportVerification: data }))}
            onValidationChange={handleValidationChange(33)}
          />
        );
      case 34:
        return (
          <SurveyorVerificationForm
            data={formData.surveyorVerification}
            onChange={(data) => setFormData(prev => ({ ...prev, surveyorVerification: data }))}
            onValidationChange={handleValidationChange(34)}
          />
        );
      case 35:
        return (
          <PointsToNoteForm
            data={formData.pointsToNote}
            onChange={(data) => setFormData(prev => ({ ...prev, pointsToNote: data }))}
            onValidationChange={handleValidationChange(35)}
          />
        );
      case 36:
        return (
          <CompleteTaskForm
            data={formData.completeTask}
            onChange={(data) => setFormData(prev => ({ ...prev, completeTask: data }))}
            onValidationChange={handleValidationChange(36)}
          />
        );
      default:
        return null;
    }
  };

  const currentFormTitle = formSteps[currentStep - 1]?.title || '';

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Diver Job Report</h1>
          <p className="mt-2 text-gray-600">Complete the multi-step form to submit your diving report</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <FormProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        </div>

        {/* Form Card */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-primaryBlue to-primary text-white rounded-t-lg">
            <CardTitle className="text-xl font-semibold">
              {currentFormTitle}
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6 md:p-8">
            {/* Form Content */}
            <div className="min-h-[400px]">
              {renderCurrentForm()}
            </div>

            {/* Navigation */}
            <FormNavigation
              currentStep={currentStep}
              totalSteps={totalSteps}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onSubmit={handleSubmit}
              isValid={isCurrentStepValid}
            />
          </CardContent>
        </Card>

        {/* Help Text */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            All fields marked as required must be completed before proceeding to the next step.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DiverJobReport;