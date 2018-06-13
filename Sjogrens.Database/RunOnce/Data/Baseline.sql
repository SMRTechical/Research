
DECLARE @CategoryDescription AS VARCHAR(50) = 'Baseline'
DECLARE @CategoryName AS VARCHAR(50) = 'Baseline'
DECLARE @CategoryHeaderText AS VARCHAR(50) = 'Baseline'
DECLARE @CategoryDescriptionText AS VARCHAR(50) = 'Baseline'
DECLARE @CategoryLinkText AS VARCHAR(50) = 'Baseline'
DECLARE @CategoryId AS INT = 1
DECLARE @ControlId AS INT
DECLARE @ControlDescription AS VARCHAR(250)
DECLARE @ControlValueId AS INT

INSERT INTO Categories VALUES (@CategoryId, @CategoryName, @CategoryHeaderText, @CategoryDescriptionText, @CategoryLinkText, @CategoryDescription)

SET @ControlId = 1
SET @ControlDescription = 'optAttendedUHBpSSClinicYes'
INSERT INTO Controls VALUES (@CategoryId, @ControlId, @ControlDescription)

SET @ControlDescription = 'optAttendedUHBpSSClinicNo'
INSERT INTO Controls VALUES (@CategoryId, @ControlId, @ControlDescription)

SET @ControlDescription = 'optAttendedUHBpSSClinicNA'
INSERT INTO Controls VALUES (@CategoryId, @ControlId, @ControlDescription)


INSERT INTO ControlValues VALUES (@CategoryId, @ControlId,concat(@ControlId,1), 'Yes')
INSERT INTO ControlValues VALUES (@CategoryId, @ControlId,concat(@ControlId,2), 'No')
INSERT INTO ControlValues VALUES (@CategoryId, @ControlId,concat(@ControlId,3), 'N/A')


SET @ControlId = 2
SET @ControlDescription = 'optWarrantingInvestigationForpSSYes'
INSERT INTO Controls VALUES (@CategoryId, @ControlId, @ControlDescription)

SET @ControlDescription = 'optWarrantingInvestigationForpSSNo'
INSERT INTO Controls VALUES (@CategoryId, @ControlId, @ControlDescription)

SET @ControlDescription = 'optWarrantingInvestigationForpSSNA'
INSERT INTO Controls VALUES (@CategoryId, @ControlId, @ControlDescription)


INSERT INTO ControlValues VALUES (@CategoryId, @ControlId,concat(@ControlId,1), 'Yes')
INSERT INTO ControlValues VALUES (@CategoryId, @ControlId,concat(@ControlId,2), 'No')
INSERT INTO ControlValues VALUES (@CategoryId, @ControlId,concat(@ControlId,3), 'N/A')


SET @ControlId = 3
SET @ControlDescription = 'optPhysicianDiagnosisOfpSSYes'
INSERT INTO Controls VALUES (@CategoryId, @ControlId, @ControlDescription)

SET @ControlDescription = 'optPhysicianDiagnosisOfpSSNo'
INSERT INTO Controls VALUES (@CategoryId, @ControlId, @ControlDescription)

SET @ControlDescription = 'optPhysicianDiagnosisOfpSSNA'
INSERT INTO Controls VALUES (@CategoryId, @ControlId, @ControlDescription)


INSERT INTO ControlValues VALUES (@CategoryId, @ControlId,concat(@ControlId,1), 'Yes')
INSERT INTO ControlValues VALUES (@CategoryId, @ControlId,concat(@ControlId,2), 'No')
INSERT INTO ControlValues VALUES (@CategoryId, @ControlId,concat(@ControlId,3), 'N/A')


SET @ControlId = 4
SET @ControlDescription = 'optPreviousHeadAndNeckRadiotherapyYes'
INSERT INTO Controls VALUES (@CategoryId, @ControlId, @ControlDescription)

SET @ControlDescription = 'optPreviousHeadAndNeckRadiotherapyNo'
INSERT INTO Controls VALUES (@CategoryId, @ControlId, @ControlDescription)

SET @ControlDescription = 'optPreviousHeadAndNeckRadiotherapyNA'
INSERT INTO Controls VALUES (@CategoryId, @ControlId, @ControlDescription)


INSERT INTO ControlValues VALUES (@CategoryId, @ControlId,concat(@ControlId,1), 'Yes')
INSERT INTO ControlValues VALUES (@CategoryId, @ControlId,concat(@ControlId,2), 'No')
INSERT INTO ControlValues VALUES (@CategoryId, @ControlId,concat(@ControlId,3), 'N/A')


SET @ControlId = 5
SET @ControlDescription = 'optPreviousConfirmedDiagnosisYes'
INSERT INTO Controls VALUES (@CategoryId, @ControlId, @ControlDescription)

SET @ControlDescription = 'optPreviousConfirmedDiagnosisNo'
INSERT INTO Controls VALUES (@CategoryId, @ControlId, @ControlDescription)

SET @ControlDescription = 'optPreviousConfirmedDiagnosisNA'
INSERT INTO Controls VALUES (@CategoryId, @ControlId, @ControlDescription)


INSERT INTO ControlValues VALUES (@CategoryId, @ControlId,concat(@ControlId,1), 'Yes')
INSERT INTO ControlValues VALUES (@CategoryId, @ControlId,concat(@ControlId,2), 'No')
INSERT INTO ControlValues VALUES (@CategoryId, @ControlId,concat(@ControlId,3), 'N/A')

GO

