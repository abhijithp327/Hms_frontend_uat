import React, { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { FormData } from '@/types/FormTypes';
import { Input } from '@/components/ui/input';
import { pointToNoteSchema } from '@/validationSchema/diver/pointToNoteSchema';



interface Props {
  data: FormData['pointsToNote'];
  onChange: (data: FormData['pointsToNote']) => void;
  onValidationChange?: (isValid: boolean, errors: Record<string, string>) => void
}

const PointsToNoteForm: React.FC<Props> = ({ data, onChange, onValidationChange }) => {

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    validateForm(data);
  }, [data]);

  const validateForm = (formData: FormData['pointsToNote']) => {
    const result = pointToNoteSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as string;
        fieldErrors[path] = issue.message;
      });
      setErrors(fieldErrors);
      onValidationChange?.(false, fieldErrors);
    } else {
      setErrors({});
      onValidationChange?.(true, {});
    }
  };

  const handleChange = (field: keyof FormData['pointsToNote'], value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6 pb-4">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
          <Label htmlFor="actualDraftInMeters">Actual Draft In Meters</Label>
          <Input
            id="actualDraftInMeters"
            value={data.actualDraftInMeters || ""}
            onChange={(e) => handleChange('actualDraftInMeters', e.target.value)}
            placeholder="Actual draft in meters"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="overallFouling">Overall Fouling</Label>
          <Input
            id="overallFouling"
            value={data.overallFouling || ""}
            onChange={(e) => handleChange('overallFouling', e.target.value)}
            placeholder="Overall fouling"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="anyNightDivingDone">Any Night Diving Done? (1800 to 0600) <span className='text-red-500'>*</span></Label>
          <Select value={data.anyNightDivingDone} onValueChange={(value) => handleChange('anyNightDivingDone', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select Any Night Diving Done?" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-white shadow-md" position="popper">
              <SelectItem className="hover:bg-gray-100 cursor-pointer" value="yes">Yes</SelectItem>
              <SelectItem className="hover:bg-gray-100 cursor-pointer" value="no">No</SelectItem>
            </SelectContent>
          </Select>
          {errors.anyNightDivingDone && <p className="text-red-500 text-sm">{errors.anyNightDivingDone}</p>}
        </div>

        <div>
          <Label htmlFor="entanglementRemovalDone">Entanglement Removal Done? <span className='text-red-500'>*</span></Label>
          <Select value={data.entanglementRemovalDone} onValueChange={(value) => handleChange('entanglementRemovalDone', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select Entanglement Removal done? " />
            </SelectTrigger>
            <SelectContent className="z-50 bg-white shadow-md" position="popper">
              <SelectItem className="hover:bg-gray-100 cursor-pointer" value="yes">Yes</SelectItem>
              <SelectItem className="hover:bg-gray-100 cursor-pointer" value="no">No</SelectItem>
            </SelectContent>
          </Select>
          {errors.entanglementRemovalDone && <p className="text-red-500 text-sm">{errors.entanglementRemovalDone}</p>}
        </div>


        <div>
          <Label htmlFor="actualDistanceOfVesselFromPortInNauticalMiles">Actual Distance Of Vessel From Port In Nautical Miles</Label>
          <Input
            id="actualDistanceOfVesselFromPortInNauticalMiles"
            value={data.actualDistanceOfVesselFromPortInNauticalMiles || ""}
            onChange={(e) => handleChange('actualDistanceOfVesselFromPortInNauticalMiles', e.target.value)}
            placeholder="Actual distance of vessel from port in nautical miles"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="totalNumberOfSeaChestsGridsCleaned">Total Number Of Sea Chests Grids Cleaned?</Label>
          <Input
            id="totalNumberOfSeaChestsGridsCleaned"
            value={data.totalNumberOfSeaChestsGridsCleaned || ""}
            onChange={(e) => handleChange('totalNumberOfSeaChestsGridsCleaned', e.target.value)}
            placeholder="Total number of sea chests grids cleaned"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="howManyMobilizationsWeDid">How Many Mobilizations We Did?</Label>
          <Input
            id="howManyMobilizationsWeDid"
            value={data.howManyMobilizationsWeDid || ""}
            onChange={(e) => handleChange('howManyMobilizationsWeDid', e.target.value)}
            placeholder="How many mobilizations we did"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="anyStandByTimeReported">Any Stand By Time Reported?</Label>
          <Select value={data.anyStandByTimeReported} onValueChange={(value) => handleChange('anyStandByTimeReported', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select Any Stand By Time Reported " />
            </SelectTrigger>
            <SelectContent className="z-50 bg-white shadow-md" position="popper">
              <SelectItem className="hover:bg-gray-100 cursor-pointer" value="yes">Yes</SelectItem>
              <SelectItem className="hover:bg-gray-100 cursor-pointer" value="no">No</SelectItem>
            </SelectContent>
          </Select>
          {/* {errors.entanglementRemovalDone && <p className="text-red-500 text-xs">{errors.entanglementRemovalDone}</p>} */}
        </div>

        <div>
          <Label htmlFor="anythingElseImportantToNote">Anything Else Important To Note?</Label>
          <Input
            id="anythingElseImportantToNote"
            value={data.anythingElseImportantToNote || ""}
            onChange={(e) => handleChange('anythingElseImportantToNote', e.target.value)}
            placeholder="Anything else important to note"
            className="mt-1"
          />
        </div>

      </div>

    </div>
  );
};

export default PointsToNoteForm;