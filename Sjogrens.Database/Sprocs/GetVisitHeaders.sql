-- =============================================
-- Author:		Sajid Riaz
-- Create date: 04/10/2017
-- Description:	Gets all Visit Headers for Patient
-- =============================================
CREATE PROCEDURE [dbo].[GetVisitHeaders] 
@PasId VARCHAR(10),
@OrganisationCode VARCHAR(10)
AS
BEGIN

	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	
	DECLARE @PasId_local	VARCHAR(10) SET @PasId_local = @PasId
	DECLARE @OrganisationCode_local	VARCHAR(10) SET @OrganisationCode_local = @OrganisationCode

	 SELECT	VisitHeaderId,
			VisitId,
			DateOfVisit,
			Pid,
			PasId,
			OrganisationCode,
			Completed
	FROM [dbo].[VisitHeader]
	WHERE PasId = @PasId_local AND OrganisationCode = @OrganisationCode_local
	ORDER BY DateOfVisit DESC
END
GO

GRANT EXECUTE ON [dbo].GetVisitHeaders TO CDEA_Sjogrens_User
GO
