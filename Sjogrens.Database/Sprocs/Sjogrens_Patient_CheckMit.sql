
CREATE PROCEDURE [dbo].[Sjogrens_Patient_CheckMit]
@PasId VARCHAR(10)
AS 
BEGIN

SET NOCOUNT ON

DECLARE
	@sql VARCHAR(500)
    
SET @sql = 'SELECT * FROM OPENQUERY(READONLYHECTOR,
				''SELECT RptPASID AS PasId, Fname1 AS Forename_1, Sname AS Surname, dob, NHSNumber, Sex as Gender, PCode as PostCode FROM [PASActivity].[dbo].[mit] WHERE RptPASID = '''''+ @PasId +''''''')'

EXEC( @sql)

END
GO

GRANT EXECUTE ON [dbo].Sjogrens_Patient_CheckMit TO CDEA_Sjogrens_User
GO

