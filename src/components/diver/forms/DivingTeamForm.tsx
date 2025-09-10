import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { FormData } from '@/types/FormTypes';
import { Textarea } from '@/components/ui/textarea';


interface Props {
    data: FormData['divingTeam'];
    onChange: (data: FormData['divingTeam']) => void;
}

const DivingTeamForm: React.FC<Props> = ({ data, onChange }) => {
    const handleChange = (field: keyof FormData['divingTeam'], value: string) => {
        onChange({ ...data, [field]: value });
    };

    return (
        <div className="space-y-6 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="divingSupervisor">Diving Supervisor</Label>
                    <Input
                        id="divingSupervisor"
                        value={data.divingSupervisor || ''}
                        onChange={(e) => handleChange('divingSupervisor', e.target.value)}
                        placeholder="Diving supervisor name"
                        className="mt-1"
                    />
                </div>
                <div>
                    <Label htmlFor="leadDriver">Lead Diver</Label>
                    <Input
                        id="leadDriver"
                        value={data.leadDriver || ''}
                        onChange={(e) => handleChange('leadDriver', e.target.value)}
                        placeholder="Lead diver name"
                        className="mt-1"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="surfaceSupport">Still Cameraman/s</Label>
                    <Input
                        id="stillCameraman"
                        value={data.stillCameraman || ''}
                        onChange={(e) => handleChange('stillCameraman', e.target.value)}
                        placeholder="Still cameraman name"
                        className="mt-1"
                    />
                </div>
                <div>
                    <Label htmlFor="videoCameraman">Video Cameraman</Label>
                    <Input
                        id="videoCameraman"
                        value={data.videoCameraman || ''}
                        onChange={(e) => handleChange('videoCameraman', e.target.value)}
                        placeholder="Video cameraman name"
                        className="mt-1"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="tailShaftReadings">Tail Shaft Reading/s</Label>
                    <Input
                        id="tailShaftReadings"
                        value={data.tailShaftReadings || ''}
                        onChange={(e) => handleChange('tailShaftReadings', e.target.value)}
                        placeholder="Tail shaft readings name"
                        className="mt-1"
                    />
                </div>
                <div>
                    <Label htmlFor="pintleReadings">Pintle Readings</Label>
                    <Input
                        id="pintleReadings"
                        value={data.pintleReadings || ''}
                        onChange={(e) => handleChange('pintleReadings', e.target.value)}
                        placeholder="Pintle readings name"
                        className="mt-1"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="standByDivers">Standby Diver/s</Label>
                    <Input
                        id="standByDivers"
                        value={data.standByDivers || ''}
                        onChange={(e) => handleChange('standByDivers', e.target.value)}
                        placeholder="Standby divers name"
                        className="mt-1"
                    />
                </div>
                <div>
                    <Label htmlFor="tenders">Tender/s</Label>
                    <Input
                        id="tenders"
                        value={data.tenders || ''}
                        onChange={(e) => handleChange('tenders', e.target.value)}
                        placeholder="Tender name"
                        className="mt-1"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="brushKartCleaning">Brush Kart Cleaning</Label>
                    <Input
                        id="brushKartCleaning"
                        value={data.brushKartCleaning || ''}
                        onChange={(e) => handleChange('brushKartCleaning', e.target.value)}
                        placeholder="Brush kart cleaning name"
                        className="mt-1"
                    />
                </div>
                <div>
                    <Label htmlFor="marinaCleaning">Marina Cleaning</Label>
                    <Input
                        id="marinaCleaning"
                        value={data.marinaCleaning || ''}
                        onChange={(e) => handleChange('marinaCleaning', e.target.value)}
                        placeholder="Marina cleaning name"
                        className="mt-1"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="polishing">Polishing</Label>
                    <Input
                        id="polishing"
                        value={data.polishing || ''}
                        onChange={(e) => handleChange('polishing', e.target.value)}
                        placeholder="Polishing name"
                        className="mt-1"
                    />
                </div>
                <div>
                    <Label htmlFor="scraping">Scraping</Label>
                    <Input
                        id="scraping"
                        value={data.scraping || ''}
                        onChange={(e) => handleChange('scraping', e.target.value)}
                        placeholder="Scraping name"
                        className="mt-1"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="otherTaskAndRespectiveOperators">Other Tasks & Respective Operators</Label>
                    <Textarea
                        id="otherTaskAndRespectiveOperators"
                        value={data.otherTaskAndRespectiveOperators || ''}
                        onChange={(e) => handleChange('otherTaskAndRespectiveOperators', e.target.value)}
                        placeholder="Enter other tasks and respective operators details"
                        className="mt-1"
                        rows={6} // controls height
                    />
                </div>
            </div>


        </div>
    );
};

export default DivingTeamForm;