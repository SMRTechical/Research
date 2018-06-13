
-- =============================================
-- Author:		Sajid Riaz
-- Create date: 30/08/2017
-- Description:	Searches for a patient in the patients table by PasId Only 
--				Used when adding a patient
-- =============================================
CREATE PROCEDURE [dbo].[Sjogrens_Patient_Search]
@OrganisationCode VARCHAR(10),
@Authorized BIT,
@PasId VARCHAR(10) = null
AS
BEGIN
	
	SET CONCAT_NULL_YIELDS_NULL OFF 

	DECLARE @OrganisationCode_local VARCHAR(10) SET @OrganisationCode_local = @OrganisationCode
	DECLARE @Authorized_local BIT SET @Authorized_local = @Authorized
	DECLARE @PasId_local			VARCHAR(10) SET @PasId_local = @PasId

	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
		IF @Authorized_local = 1
			BEGIN
						SELECT Pid, PasId, STUFF(STUFF(ISNULL(NHSNumber,''),4,0,' '),8,0,' ') AS 'NHSNumber', LastName, FirstName, DateOfBirth, PostCode, OrganisationCode, ConsentGiven
						FROM dbo.Sjogrens_Patients
						WHERE 
						(@PasId_local IS NULL OR PasId = @PasId_local) AND OrganisationCode = @OrganisationCode_local
						ORDER BY LastName, FirstName
			END
END
GO

GRANT EXECUTE ON [dbo].Sjogrens_Patient_Search TO CDEA_Sjogrens_User
GO
