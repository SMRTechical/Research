
-- =============================================
-- Author:		Sajid Riaz
-- Create date: 27/09/2017
-- Description:	Gets all patient details along with data within Baseline
-- =============================================
CREATE PROCEDURE [dbo].[GetPatientDetails]
@PasId VARCHAR(10),
@OrganisationCode VARCHAR(10)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    SELECT 
			PasId,
			FirstName,
			LastName,
			NHSNumber,
			DateOfBirth,
			OrganisationCode,
			OrganisationDescription,
			EthnicGroup,
			Gender,
			Address1,
			Address2,
			Address3,
			Address4,
			PostCode,
			Telephone,
			MobileNumber,
			GPLastName,
			GPInitials,
			GPAddress1,
			GPAddress2,
			GPAddress3,
			GPAddress4,
			GPPostCode,
			GPTelephone,
			NOKTitle,
			NOKFirstName,
			NOKLastName,
			NOKAddress1,
			NOKAddress2,
			NOKAddress3,
			NOKAddress4,
			NOKPostCode,
			NOKTelephone,
			NOKRelationship,
			RefreshDate,
			UserCreated,
			UserCreatedDate,
			UserModified,
			UserModifiedDate

	FROM [dbo].[Sjogrens_Patients]
	WHERE PasId = @PasId AND OrganisationCode = @OrganisationCode
	
	SELECT [InclusionCriteriaId]
		  ,[PasId]
		  ,[AttendedUHBpSSClinic]
		  ,[WarrantingInvestigationForpSS]
		  ,[PhysicianDiagnosisOfpSS]
	FROM [dbo].[InclusionCriteria]
	WHERE PasId = @PasId

	SELECT [ExclusionCriteriaId]
		  ,[PasId]
		  ,[PreviousHeadAndNeckRadiotherapy]
		  ,[PreviousConfirmedDiagnosis]
		  ,[ExclusionDiseases]
	FROM [dbo].[ExclusionCriteria]
	WHERE PasId = @PasId
	
END
GO


GRANT EXECUTE ON [dbo].GetPatientDetails TO CDEA_Sjogrens_User
GO



	
