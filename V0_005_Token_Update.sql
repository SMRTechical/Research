USE [CDEA_Sjogrens]
GO
/****** Object:  StoredProcedure [dbo].[GetCategories]    Script Date: 29/01/2018 16:23:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Sajid Riaz
-- Create date: 13/11/2017
-- Description:	Gets all categories for CDEA
-- Modified By:	Sajid Riaz
-- Modified date: 15/11/2017
-- Description:	Gets all categories for CDEA With Visit Details
--				So that viist Token can be built
-- Modified date: 29/01/2017
-- Description:	Set initialvisit = true if visitid == 1
-- =============================================
CREATE PROCEDURE [dbo].[GetCategories] 
@VisitId INT,
@PasId VARCHAR(10),
@OrganisationCode VARCHAR(10),
@CdeaId INT,
@AdvancedSearch BIT = 0
AS
BEGIN

	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	
	SET NOCOUNT ON;
	DECLARE @PasId_local	VARCHAR(10) SET @PasId_local = @PasId
	DECLARE @VisitId_local	INT SET @VisitId_local = @VisitId
	DECLARE @OrganisationCode_local	VARCHAR(10) SET @OrganisationCode_local = @OrganisationCode	
	DECLARE @CdeaId_local	VARCHAR(10) SET @CdeaId_local = @CdeaId
	DECLARE @AdvancedSearch_local BIT SET @AdvancedSearch_local = @AdvancedSearch

	DECLARE @InitialVisit AS BIT
	DECLARE @NewVisit AS BIT
	DECLARE @Completed AS BIT

	SELECT    @VisitId =  [VisitId],
				@InitialVisit = CASE WHEN @VisitId = 1 THEN 1 ELSE 0 END,
				@NewVisit = 0,
				@Completed = [Completed]
			  FROM [dbo].[VisitHeader]
			   WHERE VisitId = @VisitId_local and PasId = @PasId_local AND OrganisationCode = @OrganisationCode_local AND CdeaId = @CdeaId_local


	SELECT [CategoryId]
		  ,[Name]
		  ,[HeaderText]
		  ,[Description]
		  ,[LinkText]
		  ,[VisitCategory]
		  ,[CdeaId]
		  ,[OrganisationCode]
		  ,[Sequence]
		  ,@PasId_local AS PasId
		  ,@VisitId_local AS VisitId
		  ,@InitialVisit AS InitialVisit
		  ,@NewVisit as NewVisit
		  ,@Completed as Completed
		  ,@AdvancedSearch_local AdvancedSearch
	  FROM [dbo].[Categories]
	  WHERE OrganisationCode = @OrganisationCode_local AND CdeaId = @CdeaId_local
	  ORDER BY Sequence ASC

END

GO
/****** Object:  StoredProcedure [dbo].[GetVisitHeader]    Script Date: 29/01/2018 16:23:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Sajid Riaz
-- Create date: 05/10/2017
-- Description: Get Visit Header
-- Modified date: 29/01/2017
-- Description:	Set initialvisit = true if visitid == 1
-- =============================================

CREATE PROCEDURE [dbo].[GetVisitHeader]
	@DateOfVisit DATE = NULL,
	@VisitId INT = 0,
	@PasId VARCHAR(10),
	@OrganisationCode VARCHAR(10),
	@CdeaId INT,
	@AdvancedSearch BIT
AS
BEGIN

	DECLARE @DateOfVisit_local DATE SET @DateOfVisit_local = @DateOfVisit
	DECLARE @PasId_local	VARCHAR(10) SET @PasId_local = @PasId
	DECLARE @OrganisationCode_local	VARCHAR(10) SET @OrganisationCode_local = @OrganisationCode
	DECLARE @AdvancedSearch_local BIT SET @AdvancedSearch_local = @AdvancedSearch
	DECLARE @CdeaId_local	INT SET @CdeaId_local = @CdeaId
	DECLARE @VisitId_local	INT SET @VisitId_local = @VisitId




IF (EXISTS(SELECT 1 FROM [dbo].[VisitHeader] WHERE DateofVisit = @DateOfVisit_local and PasId = @PasId_local AND OrganisationCode = @OrganisationCode_local AND CdeaId = @CdeaId_local))
		SELECT
		   [VisitHeaderId]
		  ,[VisitId]
		  ,[DateOfVisit]
		  ,[CdeaId]
		  ,[PasId]
		  ,[OrganisationCode]
		  ,CASE WHEN VISITID = 1 THEN 1 ELSE 0 END InitialVisit
		  ,0 AS NewVisit
		  ,[Completed],
		   @AdvancedSearch AdvancedSearch,
		   1 as IsDuplicate,
		   CreatedUser,
		   CreatedDateTime,
		   LastUpdatedUser,
		   LastUpdatedDateTime
	  FROM [dbo].[VisitHeader]
	  WHERE DateofVisit = @DateOfVisit_local and PasId = @PasId_local AND OrganisationCode = @OrganisationCode_local AND CdeaId = @CdeaId_local
	
  ELSE
   BEGIN

		IF @VisitId_local > 0
			SELECT
				[VisitHeaderId]
				,[VisitId]
				,[DateOfVisit]
				,[CdeaId]
				,[PasId]
				,[OrganisationCode]
				 ,CASE WHEN VISITID = 1 THEN 1 ELSE 0 END InitialVisit
				,0 NewVisit
				,[Completed],
				 @AdvancedSearch AdvancedSearch,
				 0 as IsDuplicate,
				 CreatedUser,
			     CreatedDateTime,
			     LastUpdatedUser,
			     LastUpdatedDateTime
			  FROM [dbo].[VisitHeader]
			   WHERE VisitId = @VisitId_local and PasId = @PasId_local AND OrganisationCode = @OrganisationCode_local AND CdeaId = @CdeaId_local
		ELSE

			BEGIN
		
				SELECT @VisitId = COUNT(visitid) + 1  
							FROM [dbo].[VisitHeader] 
							WHERE PasId = @PasId_local AND 
								  OrganisationCode = @OrganisationCode_local AND 
								  CdeaId = @CdeaId_local

				 SELECT 
					0 VisitHeaderId,
					@VisitId  VisitId,
					@DateOfVisit_local DateOfVisit,
					(SELECT [CdeaId] FROM [dbo].[PatientOrgs]  where pasId = @PasId_local and OrganisationCode = @OrganisationCode_local) as CdeaId,
					@PasId_local  PasId,
					@OrganisationCode_local  OrganisationCode,
					CASE WHEN @VisitId = 1 THEN 1 ELSE 0 END InitialVisit,
					1  NewVisit,
					0  Completed,
					@AdvancedSearch AdvancedSearch,
					0  IsDuplicate
			END
   END
END



GO
/****** Object:  StoredProcedure [dbo].[GetVisitHeaders]    Script Date: 29/01/2018 16:23:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Sajid Riaz
-- Create date: 04/10/2017
-- Description:	Gets all Visit Headers for Patient
-- Modified date: 29/01/2017
-- Description:	Set initialvisit = true if visitid == 1
-- =============================================
CREATE PROCEDURE [dbo].[GetVisitHeaders] 
@PasId VARCHAR(10),
@OrganisationCode VARCHAR(10),
@CdeaId INT,
@AdvancedSearch BIT = 0
AS
BEGIN

	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	
	DECLARE @PasId_local	VARCHAR(10) SET @PasId_local = @PasId
	DECLARE @OrganisationCode_local	VARCHAR(10) SET @OrganisationCode_local = @OrganisationCode	
	DECLARE @CdeaId_local	VARCHAR(10) SET @CdeaId_local = @CdeaId
	
	 SELECT	VisitHeaderId
			,DateOfVisit
			,VisitId
			,CdeaId
			,PasId
			,OrganisationCode
			,CASE WHEN VisitId = 1 THEN 1 ELSE 0 END InitialVisit
			,0 AS NewVisit
			,Completed
			,@AdvancedSearch AdvancedSearch
	FROM [dbo].[VisitHeader]
	WHERE PasId = @PasId_local AND OrganisationCode = @OrganisationCode_local AND CdeaId = @CdeaId_local
	ORDER BY VisitId DESC
END

GO
