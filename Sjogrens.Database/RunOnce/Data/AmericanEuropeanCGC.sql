
DECLARE @CategoryName AS VARCHAR(50) = 'AmericanEuropeanCGC'
DECLARE @CategoryId AS INT
DECLARE @ControlId AS INT
DECLARE @ControlName AS VARCHAR(250)
DECLARE @ControlValueId AS INT

SELECT @CategoryId = CategoryId FROM Categories WHERE Name = @CategoryName

SET @ControlId = 1
INSERT INTO Controls VALUES (@CategoryId, @ControlId, 'optOcularSymptomsAYes',1,1)
INSERT INTO Controls VALUES (@CategoryId, @ControlId, 'optOcularSymptomsANo',2,1)
INSERT INTO Controls VALUES (@CategoryId, @ControlId, 'optOcularSymptomsANA',3,1)

INSERT INTO ControlValues VALUES (@CategoryId, @ControlId,concat(@ControlId,1),'Yes', 1)
INSERT INTO ControlValues VALUES (@CategoryId, @ControlId,concat(@ControlId,2),'No', 1)
INSERT INTO ControlValues VALUES (@CategoryId, @ControlId,concat(@ControlId,3),'N/A', 1)

SET @ControlId = 2
INSERT INTO Controls VALUES (@CategoryId, @ControlId, 'optOralSymptomsBYes',1,1)
INSERT INTO Controls VALUES (@CategoryId, @ControlId, 'optOralSymptomsBNo',2,1)
INSERT INTO Controls VALUES (@CategoryId, @ControlId, 'optOralSymptomsBNA',3,1)

INSERT INTO ControlValues VALUES (@CategoryId, @ControlId,concat(@ControlId,1),'Yes', 1)
INSERT INTO ControlValues VALUES (@CategoryId, @ControlId,concat(@ControlId,2),'No', 1)
INSERT INTO ControlValues VALUES (@CategoryId, @ControlId,concat(@ControlId,3),'N/A', 1)


SET @ControlId = 3
INSERT INTO Controls VALUES (@CategoryId, @ControlId, 'optOralSymptomsCYes',1,1)
INSERT INTO Controls VALUES (@CategoryId, @ControlId, 'optOralSymptomsCNo',2,1)
INSERT INTO Controls VALUES (@CategoryId, @ControlId, 'optOralSymptomsCNA',3,1)

INSERT INTO ControlValues VALUES (@CategoryId, @ControlId,concat(@ControlId,1),'Yes', 1)
INSERT INTO ControlValues VALUES (@CategoryId, @ControlId,concat(@ControlId,2),'No', 1)
INSERT INTO ControlValues VALUES (@CategoryId, @ControlId,concat(@ControlId,3),'N/A', 1)
GO

