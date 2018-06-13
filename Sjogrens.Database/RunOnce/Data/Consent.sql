
DECLARE @CategoryDescription AS VARCHAR(50) = 'Baseline'
DECLARE @CategoryId AS INT = 1
DECLARE @ControlId AS INT
DECLARE @ControlDescription AS VARCHAR(250)
DECLARE @ControlValueId AS INT

SELECT @CategoryId = CategoryId FROM  Categories WHERE Description = @CategoryDescription

SELECT @ControlId = max(controlId) + 1  FROM Controls WHERE CategoryId = @CategoryId

SET @ControlDescription = 'optConsentWithdrawFutureParticipation'
INSERT INTO Controls VALUES (@CategoryId, @ControlId, @ControlDescription)

SET @ControlDescription = 'optConsentWithdrawFutureParticipationRemoveData'
INSERT INTO Controls VALUES (@CategoryId, @ControlId, @ControlDescription)

INSERT INTO ControlValues VALUES (@CategoryId, @ControlId,concat(@ControlId,1), 'Patient is withdrawing from all future participation:')
INSERT INTO ControlValues VALUES (@CategoryId, @ControlId,concat(@ControlId,2), 'Patient is withdrawing from all participation and no longer wishes their data to be held:')

SELECT @ControlId = max(controlId) + 1  FROM Controls WHERE CategoryId = @CategoryId

SET @ControlDescription = 'chkConsentGiven'
INSERT INTO Controls VALUES (@CategoryId, @ControlId, @ControlDescription,1)


INSERT INTO ControlValues VALUES (@CategoryId, @ControlId,concat(@ControlId,1), 'Consent Given:')