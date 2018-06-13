-- =============================================
-- Author:		Sajid Riaz
-- Create date: 30/08/2017
-- Description:	Searches for a patient in the patients table
--				Searches for a patient in the patients table across Trusts if requested
-- =============================================
CREATE PROCEDURE [dbo].[Sjogrens_Patients_Search]
@OrganisationCode VARCHAR(10),
@Authorised BIT,
@PasId VARCHAR(10) = null,
@NhsNumber VARCHAR(17) = null,
@LastName VARCHAR(20) = null,
@FirstName VARCHAR(20) = null,
@DateOfBirth VARCHAR(10) = null,
@PostCode VARCHAR(8) = null,
@SearchAllTrusts BIT = 0

AS
BEGIN
	
	SET CONCAT_NULL_YIELDS_NULL OFF 
	SET DATEFORMAT dmy
	DECLARE @OrganisationCode_local VARCHAR(10) SET @OrganisationCode_local = @OrganisationCode
	DECLARE @Authorised_local BIT SET @Authorised_local = @Authorised
	DECLARE @PasId_local			VARCHAR(10) SET @PasId_local = @PasId
	DECLARE @NhsNumber_local			VARCHAR(17) SET @NhsNumber_local = @NhsNumber
	DECLARE @LastName_local				VARCHAR(20) SET @LastName_local = @LastName
	DECLARE @FirstName_local			VARCHAR(20) SET @FirstName_local = @FirstName
	DECLARE @DateOfBirth_local			DATE
	
	IF (@DateOfBirth IS NOT NULL AND LEN(RTRIM(LTRIM(@DateOfBirth))) > 0)
		SET @DateOfBirth_local =    Convert(Date,Ltrim(Rtrim(@DateOfBirth)))
	ELSE
		SET @DateOfBirth_local = NULL

	DECLARE @PostCode_local				VARCHAR(8) SET @PostCode_local = @PostCode

	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
		IF @Authorised_local = 1
			BEGIN
				SELECT Pid, PasId, STUFF(STUFF(ISNULL(NHSNumber,''),4,0,' '),8,0,' ') AS 'NHSNumber', LastName, FirstName, DateOfBirth, PostCode,OrganisationCode
				FROM dbo.Sjogrens_Patients
				WHERE 
				(@PasId_local IS NULL OR PasId LIKE Ltrim(Rtrim(@PasId_local)) + '%') AND
				(@NhsNumber_local IS NULL OR NHSNumber LIKE  REPLACE(LTRIM(RTRIM(@NhsNumber_local)), ' ', '') + '%') AND
				(@LastName_local IS NULL OR LastName LIKE Ltrim(Rtrim(@LastName_local)) + '%') AND
				(@FirstName_local IS NULL OR FirstName LIKE Ltrim(Rtrim(@FirstName_local)) + '%') AND
					(@DateOfBirth_local IS NULL OR DateOfBirth = @DateOfBirth_local) AND
				(@PostCode_local IS NULL OR replace(postcode, ' ', '') LIKE '%'+replace(Ltrim(Rtrim(@PostCode_local)),' ','') + '%') AND
				(@SearchAllTrusts = 1 OR (@SearchAllTrusts = 0 AND OrganisationCode = @OrganisationCode_local))
				ORDER BY LastName, FirstName
			END
END
GO

GRANT EXECUTE ON [dbo].Sjogrens_Patients_Search TO CDEA_Sjogrens_User
GO

