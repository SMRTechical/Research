
-- =============================================
-- Author:		Sajid Riaz
-- Create date: 07/09/2017
-- Description:	Adds Patient into Sjogrens
-- =============================================
CREATE PROCEDURE [dbo].[Sjogrens_Patient_InsertPatientDetails]
	@NhsNumber			VARCHAR(10) = null,
	@PasId				VARCHAR(10),
	@DateOfBirth		DATE = null,
	@GenderCode			CHAR(1) = null,
	@LastName			VARCHAR(50) = null,
	@FirstName			VARCHAR(50) = null,
	@Address1			VARCHAR(50) = null,
	@Address2			VARCHAR(50) = null,
	@Address3			VARCHAR(50) = null,
	@Address4			VARCHAR(50) = null,
	@PostCode			VARCHAR(8) = null,
	@Telephone			VARCHAR(20) = null,
	@Mobile1			varchar(15) = null,
	@EthnicGroup		VARCHAR(250) = null,
	@GPLastName			VARCHAR(20) = null,
	@GPInitials			VARCHAR(4) = null,
	@GPAddress1			VARCHAR(50) = null,
	@GPAddress2			VARCHAR(50) = null,
	@GPAddress3			VARCHAR(50) = null,
	@GPAddress4			VARCHAR(50) = null,
	@GPPostCode			VARCHAR(8) = null,
	@GPTelephone		VARCHAR(20) = null,
	@NOKTitle			VARCHAR(10) = null,
	@NOKFirstName		VARCHAR(50) = null,
	@NOKLastName		VARCHAR(50) = null,
	@NOKRelationship	VARCHAR(20) = null,
	@NOKAddress1		VARCHAR(50) = null,
	@NOKAddress2		VARCHAR(50) = null,
	@NOKAddress3		VARCHAR(50) = null,
	@NOKAddress4		VARCHAR(50) = null,
	@NOKPostCode		VARCHAR(8) = null,
	@NOKTelephone		VARCHAR(20) = null,
	@OrganisationCode			VARCHAR(10),
	@OrganisationDescription	VARCHAR(200),
	@ConsentGiven BIT = NULL,
	--@ConsentGivenDate DATETIME = NULL,
	--@ConsentWithDrawnDate DATETIME = NULL, 
	@RefreshDate		DATETIME,
	@UserCreated		VARCHAR(100),
	@ReturnVal int output
AS
BEGIN

	SET @ReturnVal = 0;
	BEGIN TRY
	BEGIN TRANSACTION
	IF NOT EXISTS(SELECT 1 FROM dbo.Sjogrens_Patients WHERE PasId = @PasId AND OrganisationCode = @OrganisationCode)
		BEGIN
				INSERT INTO dbo.Sjogrens_Patients (
							PasId,
							FirstName,
							LastName,
							NHSNumber,
							DateOfBirth,
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
							OrganisationCode,
							OrganisationDescription,
							ConsentGiven,
							ConsentGivenDate,
							--ConsentWithdrawnDate,
							RefreshDate,
							UserCreated,
							UserCreatedDate
						)
						VALUES
						(
							@PasID,
							@FirstName,
							@LastName,
							@NhsNumber,
							@DateOfBirth,
							@EthnicGroup,
							@GenderCode,
							@Address1,
							@Address2,
							@Address3,
							@Address4,
							@PostCode,
							@Telephone,
							@Mobile1,
							@GPLastName,
							@GPInitials,
							@GPAddress1,
							@GPAddress2,
							@GPAddress3,
							@GPAddress4,
							@GPPostCode,
							@GPTelephone,
							@NOKTitle,
							@NOKFirstName,
							@NOKLastName,
							@NOKAddress1,
							@NOKAddress2,
							@NOKAddress3,
							@NOKAddress4,
							@NOKPostCode,
							@NOKTelephone,
							@NOKRelationship,
							@OrganisationCode,
							@OrganisationDescription,
							@ConsentGiven,
							CASE WHEN @ConsentGiven =1 THEN GETDATE() ELSE NULL END,
							--@ConsentGivenDate,
							--@ConsentWithDrawnDate,
							@RefreshDate,
							@UserCreated,
							GETDATE()
						)


				SET @ReturnVal = SCOPE_IDENTITY();
		END


	COMMIT;

	SELECT @ReturnVal;
	END TRY
	BEGIN CATCH
		ROLLBACK;
		SET @ReturnVal = -1
		RETURN @ReturnVal
	END CATCH
END
GO
GRANT EXECUTE ON [dbo].Sjogrens_Patient_InsertPatientDetails TO CDEA_Sjogrens_User
GO
