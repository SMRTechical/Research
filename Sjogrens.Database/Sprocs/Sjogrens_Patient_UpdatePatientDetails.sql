
-- =============================================
-- Author:		Sajid Riaz
-- Create date: 26/09/2017
-- Description:	Update Sjogrens Patient
-- =============================================
CREATE PROCEDURE [dbo].[Sjogrens_Patient_UpdatePatientDetails]
	@PasId				VARCHAR(10) = null,
	@OrganisationCode	VARCHAR(10),
	@ConsentGiven BIT = NULL,
	@ConsentGivenDate DATETIME = NULL,
	@ConsentWithDrawnDate DATETIME = NULL,
	@UserCreated		VARCHAR(100),
	@ReturnVal int output
AS
BEGIN

	SET @ReturnVal = 0;
	BEGIN TRY
	BEGIN TRANSACTION
	IF EXISTS(SELECT 1 FROM dbo.Sjogrens_Patients WHERE PasId = @PasId AND OrganisationCode = @OrganisationCode)
		BEGIN
				UPDATE	dbo.Sjogrens_Patients
						SET ConsentGiven = @ConsentGiven,
						ConsentGivenDate = @ConsentGivenDate,
						ConsentWithdrawnDate = @ConsentWithdrawnDate,
						UserModified = @userCreated,
						UserModifiedDate = GETDATE()
						WHERE PasId = @PasId AND OrganisationCode = @OrganisationCode
		
				
				SET @ReturnVal = (SELECT Pid FROM [dbo].[Sjogrens_Patients] WHERE PasId = @PasId AND OrganisationCode = @OrganisationCode)
		
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
GRANT EXECUTE ON [dbo].Sjogrens_Patient_UpdatePatientDetails TO CDEA_Sjogrens_User
GO