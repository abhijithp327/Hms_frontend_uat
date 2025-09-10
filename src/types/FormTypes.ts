export interface FormData {

    generalInfo: {
        jobNumber: number;
        date: string;
        vesselPicture: string;
        vesselName: string;
        imoNumber: number;
        loa: number;
        width: number;
        client: string;
        clientContactPerson: string;
        agent: string;
        agentContactPerson: string;
        location: string;
        distanceFromBase: number;
        bowDraft: number;
        midShipDraft: number;
        sternDraft: number;

    };

    diveWorkInfo: {
        maximumDivingDepth: number;
        underWaterVisibility: string;
        seaWaterCurrent: string;
    };

    activityLog: {
        activityStartDate: string;
        onBoardDivingBoat: string;
        completedLoadingToDivingBoat: string;
        leftPort: string;
        reachedAlongSideTheVessel: string;
        sendTheDocumentsForDivingPermission: string;
        receivedDocumentAfterSignAndStamp: string;
        divingStartDate: string;
        commencedDivingOperation: string;
        divingEndDate: string;
        completedDivingOperation: string;
        sendDocumentAfterJobCompletionForSignAndStamp: string;
        receivedDocumentsDutySignedAndStamp: string;
        castOffFromTheVessel: string;
        reachedPort: string;
        activityEndDate: string;
    };

    divingTeam: {
        divingSupervisor: string;
        leadDriver: string;
        stillCameraman: string;
        videoCameraman: string;
        tailShaftReadings: string;
        pintleReadings: string;
        standByDivers: string;
        tenders: string;
        brushKartCleaning: string;
        marinaCleaning: string;
        polishing: string;
        scraping: string;
        otherTaskAndRespectiveOperators: string;
    };

    facilitiesDeployed: {
        divingBoat: string;
        divingEquipmentUsed: string[];
    };

    scopeOfWork: {
        operationCarriedOut: string[];
        classOfSurvey: string;
        attendingSurveyorName: string;
        attendingSurveyorBusinessCardPicture: string;
        attendingSurveyorSignature: string;
        summaryRemarks: string;
    };

    reportSignOff: {
        vesselRepresentativeName: string;
        vesselRepresentativeDesignation: string;
        stamp: string;
    };

    marineGrowthCondition: {
        hullSections: string[];
        appurtenanceSections: string[];
        initialHullReport: string;
    };

    bowArea: {
        portSideAreaOfTheBowLookingFwdBeforeCleaning: string;
        keelPlateAreaOfTheBowLookingFwdBeforeCleaning: string;
        stbdSideAreaOfTheBowLookingFwdBeforeCleaning: string;
        portSideAreaOfTheBowLookingFwdAfterCleaning: string;
        keelPlateAreaOfTheBowLookingFwdAfterCleaning: string;
        stbdSideAreaOfTheBowLookingFwdAfterCleaning: string;
        paintCondition: string;
        paintDeterioration: string[];
        areaAffected: number;
        growthType: string[];
        thickness: string;
        coverage: string;
        severity: string;
        shellPlateCondition: string;
        weldSeamCondition: string;
        corrosion: string;
        corrosionSeverity: string;
        corrosionAreaAndDescription: string;
        mechanicalDamage: string;
        typeOfDamage: string;
        remarks: string;
    };

    portVerticalSide: {
        portVerticalSideNearToTheFwdAreaBeforeCleaning: string[];
        portVerticalSideNearToTheFwdAreaAfterCleaning: string[];
        portVerticalSideNearToTheMidAreaBeforeCleaning: string[];
        portVerticalSideNearToTheMidAreaAfterCleaning: string[];
        portVerticalSideNearToTheAftAreaBeforeCleaning: string[];
        portVerticalSideNearToTheAftAreaAfterCleaning: string[];
        paintCondition: string;
        paintDeterioration: string[];
        areaAffected: number;
        growthType: string[];
        thickness: string;
        coverage: string;
        severity: string;
        shellPlateCondition: string;
        weldSeamCondition: string;
        corrosion: string;
        corrosionSeverity: string;
        corrosionAreaAndDescription: string;
        mechanicalDamage: string;
        typeOfDamage: string;
        remarks: string;
    };

    stbdVerticalSide: {
        stbdVerticalSideNearToTheFwdAreaBeforeCleaning: string[];
        stbdVerticalSideNearToTheFwdAreaAfterCleaning: string[];
        stbdVerticalSideNearToTheMidAreaBeforeCleaning: string[];
        stbdVerticalSideNearToTheMidAreaAfterCleaning: string[];
        stbdVerticalSideNearToTheAftAreaBeforeCleaning: string[];
        stbdVerticalSideNearToTheAftAreaAfterCleaning: string[];
        paintCondition: string;
        paintDeterioration: string[];
        areaAffected: number;
        growthType: string[];
        thickness: string;
        coverage: string;
        severity: string;
        shellPlateCondition: string;
        weldSeamCondition: string;
        corrosion: string;
        corrosionSeverity: string;
        corrosionAreaAndDescription: string;
        mechanicalDamage: string;
        typeOfDamage: string;
        remarks: string;
    };

    flatBottom: {
        flatBottomSideNearToTheFwdAreaAfterCleaning: string[];
        flatBottomSideNearToTheFwdAreaBeforeCleaning: string[];
        flatBottomSideNearToTheMidAreaBeforeCleaning: string[];
        flatBottomSideNearToTheMidAreaAfterCleaning: string[];
        flatBottomSideNearToTheAftAreaBeforeCleaning: string[];
        flatBottomSideNearToTheAftAreaAfterCleaning: string[];
        paintCondition: string;
        paintDeterioration: string[];
        areaAffected: number;
        growthType: string[];
        thickness: string;
        coverage: string;
        severity: string;
        shellPlateCondition: string;
        weldSeamCondition: string;
        corrosion: string;
        corrosionSeverity: string;
        corrosionAreaAndDescription: string;
        groundingDamage: string,
        plateIndentations: string,
        drainPlugs: string,
        navigationalAids: string,
        dryDockMarksPresent: string,
        dryDockMarksFouled: string,
        dryDockMarksPainted: string,
        bulbousBow: string,
        bowCondition: string,
        mechanicalDamage: string,
        anchorChainLocation: string,
        remarks: string;
    };

    bilgeKeel: {

        leadingEdgeOfThePortSideBilgeKeelSectionPlateBeforeCleaning: string,
        leadingEdgeOfThePortSideBilgeKeelSectionPlateAfterCleaning: string,
        fullViewOfThePortSideBilgeKeelSectionPlateBeforeCleaning: string,
        fullViewOfThePortSideBilgeKeelSectionPlateAfterCleaning: string,
        trailingEdgeOfThePortSideBilgeKeelSectionPlateBeforeCleaning: string,
        trailingEdgeOfThePortSideBilgeKeelSectionPlateAfterCleaning: string,
        fullViewOfTheStbdSideBilgeKeelSectionPlateBeforeCleaning: string,
        fullViewOfTheStbdSideBilgeKeelSectionPlateAfterCleaning: string,
        leadingEdgeOfTheStbdSideBilgeKeelSectionPlateBeforeCleaning: string,
        leadingEdgeOfTheStbdSideBilgeKeelSectionPlateAfterCleaning: string,
        trailingEdgeOfTheStbdSideBilgeKeelSectionPlateBeforeCleaning: string,
        trailingEdgeOfTheStbdSideBilgeKeelSectionPlateAfterCleaning: string,

        numberOfSegments: number,


        paintCondition: string,
        paintDeterioration: string[],
        areaAffected: number,
        growthType: string[],
        thickness: string,
        coverage: string,
        severity: string,
        weldSeamCondition: string,
        corrosion: string,
        corrosionSeverity: string,
        corrosionAreaAndDescription: string,
        mechanicalDamage: string,
        presenceOfSacrificalAnodes: string,
        typeOfDamage: string,
        remarks: string,
    };

    stabilisers: {

        beforeCleaning: string[],
        afterCleaning: string[],
        numberOfStabilisers: number,
        stabiliserLocation: string,
        paintCondition: string,
        paintDeterioration: string[],
        areaAffected: number,
        growthType: string[],
        thickness: string,
        coverage: string,
        severity: string,
        plateCondition: string,
        weldSeam: string,
        corrosion: string,
        corrosionSeverity: string,
        corrosionAreaAndDescription: string,
        mechanicalDamage: string,
        remarks: string,

    };

    seaChestGratings: {

        beforeCleaning: string[],
        afterCleaning: string[],
        paintCondition: string,
        paintDeterioration: string[],
        areaAffected: number,
        growthType: string[],
        thickness: string,
        coverage: string,
        severity: string,
        generalCondition: string,
        numberOfSeaChestGrids: number,
        connectionType: string,
        boltMissing: string,
        remarks: string,

    };

    seaChestInternal: {

        beforeCleaning: string[],
        afterCleaning: string[],
        paintCondition: string,
        paintDeterioration: string[],
        areaAffected: number,
        growthType: string[],
        thickness: string,
        coverage: string,
        severity: string,
        generalCondition: string,
        remarks: string,

    };

    iicpAndCathodicProtection: {

        beforeCleaning: string[],
        afterCleaning: string[],
        presenceOfSacrificialAnodes: string,
        presenceOfImpressedCurrentAnodes: string,
        remarks: string,

    };

    bowThrusters: {

        beforeCleaning: string[],
        afterCleaning: string[],
        numberOfBlades: number,
        bladePitch: string,
        bladeCondition: string,
        growthType: string[],
        thickness: string,
        coverage: string,
        irregularities: string[],
        bossConeAndHubType: string,
        condition: string,
        mechanicalDamage: string,
        remarks: string,
        cementCoversIntact: string,
        thrusterGridsCondition: string,
        typeOfGridAssembly: string,

    };


    sternThruster: {

        beforeCleaning: string[],
        afterCleaning: string[],
        numberOfBlades: number,
        bladePitch: string,
        bladeCondition: string,
        growthType: string[],
        thickness: string,
        coverage: string,
        irregularities: string[],
        bossConeAndHubType: string,
        condition: string,
        mechanicalDamage: string,
        remarks: string,
        cementCoversIntact: string,
        thrusterGridsCondition: string,
        typeOfGridAssembly: string,

    };


    propeller: {

        beforeCleaning: string[],
        afterCleaning: string[],
        numberOfPropellersAssembly: number,
        numberOfBlades: number,
        bladePitch: string,
        bladeCondition: string,
        growthType: string[],
        thickness: string,
        coverage: string,
        irregularities: string[],
        bossConeAndHubType: string,
        condition: string,
        mechanicalDamage: string,
        cementCoversIntact: string,
        remarks: string,
    };


    ropeGuard: {

        beforeCleaning: string[],
        afterCleaning: string[],
        paintCondition: string,
        paintDeterioration: string[],
        areaAffected: number,
        growthType: string[],
        thickness: string,
        coverage: string,
        severity: string,
        generalCondition: string,
        plateAssembly: string,
        mechanicalDamage: string,
        corrosionVisible: string,
        weldCondition: string,
        ropeNetCable: string,
        remarks: string,
    };

    rudder: {
        portSideAreaOfTheRudderBeforeCleaning: string,
        portSideAreaOfTheRudderAfterCleaning: string,
        stbdSideAreaOfTheRudderBeforeCleaning: string,
        stbdSideAreaOfTheRudderAfterCleaning: string,
        noseAndSoleOfTheRudderBeforeCleaning: string,
        noseAndSoleOfTheRudderAfterCleaning: string,
        portSideAreaOfTheRudderCutoutBeforeCleaning: string,
        portSideAreaOfTheRudderCutoutAfterCleaning: string,
        stbdSideAreaOfTheRudderCutoutBeforeCleaning: string,
        stbdSideAreaOfTheRudderCutoutAfterCleaning: string,
        numberOfRudders: number,
        paintCondition: string,
        paintDeterioration: string[],
        areaAffected: number,
        growthType: string[],
        thickness: string,
        coverage: string,
        severity: string,
        generalCondition: string,
        weldSeam: string,
        corrosionVisible: string,
        coverPlateAssembly: string,
        coverPlateLocation: string,
        coverPlateCondition: string,
        mechanicalDamage: string,
        remarks: string
    };

    rudderSkeg: {
        beforeCleaning: string[],
        afterCleaning: string[],
        generalCondition: string,
        weldSeam: string,
    };

    dischargePipes: {
        beforeCleaning: string[],
        afterCleaning: string[],
        growthCondition: string,
        visualCondition: string,
        paintCondition: string,
    };

    sensors: {
        beforeCleaning: string[],
        afterCleaning: string[],
        growthCondition: string,
        visualCondition: string,
        mechanicalDamage: string,
    };

    draftMarks: {
        beforeCleaning: string[],
        afterCleaning: string[],
        growthCondition: string,
        visualCondition: string,
        paintCondition: string,
    };

    dockingMarks: {
        beforeCleaning: string[],
        afterCleaning: string[],
        growthCondition: string,
        visualCondition: string,
        paintCondition: string,
    };

    sternArch: {
        beforeCleaning: string[],
        afterCleaning: string[],
        growthCondition: string,
        visualCondition: string,
        paintCondition: string,
    };

    aboveWaterlineAreas: {
        beforeCleaning: string[],
        afterCleaning: string[],
        growthCondition: string,
        visualCondition: string,
        paintCondition: string,
    };

    kortNozzle: {
        beforeCleaning: string[],
        afterCleaning: string[],
        generalCondition: string,
        plateAssembly: string,
    };

    tailShaftReadings: {
        tailShaftReadingPicture: string[],
        wearDownReadingsTop: string,
        wearDownReadingsBottom: string,
        remarks: string,
    };

    pintleClearanceReadings: {
        pintleClearanceReadingsPicture: string[],
        upperPintleClearanceReading: string,
        lowerPintleClearanceReading: string,
        remarks: string,
    };

    internalReportVerification: {
        preparedBy: string,
        preparedSignature: string,
        verifiedBy: string,
        verifiedSignature: string,
        approvedBy: string,
        approvedSignature: string
    };

    surveyorVerification: {
        approvedBy: string,
        classOfSurvey: string,
        approvedSignature: string
    };

    pointsToNote: {
        actualDraftInMeters: string,
        overallFouling: string,
        anyNightDivingDone: string,
        entanglementRemovalDone: string,
        actualDistanceOfVesselFromPortInNauticalMiles: string,
        totalNumberOfSeaChestsGridsCleaned: string,
        howManyMobilizationsWeDid: string,
        anyStandByTimeReported: string,
        anythingElseImportantToNote: string,
    };

    completeTask: {
        email: string,
    };

}

export interface FormStepConfig {
    id: number;
    title: string;
    icon: any;
}
