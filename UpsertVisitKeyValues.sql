USE [CDEA_Sjogrens]
GO
/****** Object:  StoredProcedure [dbo].[UpsertVisit]    Script Date: 27/02/2018 17:49:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Sajid Riaz
-- Create date: 27/02/2018
-- Description:	Upserts the visit key values 
-- =============================================
--CREATE PROCEDURE [dbo].[usp_UpsertVisitKeyValues]
DECLARE
@VisitHeaderId INT,
@CategoryId INT,
@SectionId INT,
@VisitKeyValues dbo.VisitKeyValuesType,
@UserCreated VARCHAR(100)


INSERT INTO @VisitKeyValues values (1,5,51,'sajid','riaz')
SELECT * FROM @VisitKeyValues

select * from [dbo].[tbl_VisitKeyValues]


/*AS
BEGIN*/
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	DECLARE @Success BIT = 0
	DECLARE @VisitHeaderId_local	INT SET @VisitHeaderId_local = @VisitHeaderId
	DECLARE @CategoryId_local	INT SET @CategoryId_local = @CategoryId
	DECLARE @SectionId_local	INT SET @SectionId_local = @SectionId
	DECLARE @UserCreated_local	VARCHAR(100) SET @UserCreated_local = @UserCreated

	
	BEGIN TRY
	BEGIN TRANSACTION
	
	IF EXISTS(SELECT 1 FROM @VisitKeyValues)
	BEGIN

	select 'Exists'

	IF NOT EXISTS(SELECT 1 FROM tbl_VisitKeyValues WHERE VisitHeaderId = @VisitHeaderId AND CategoryId = @CategoryId AND SectionId =  @SectionId)
	BEGIN
	SELECT 'NOT EXISTS'
		MERGE [dbo].[tbl_VisitKeyValues] AS [Target]
		USING @VisitKeyValues AS [Source]
		ON [Target].[VisitHeaderId] = [Source].[VisitHeaderId] AND 
		   [Target].[CategoryId] = [Source].[CategoryId] AND
		   [Target].[SectionId] = [Source].[SectionId] AND
		   [Target].[Key] = [Source].[Key]
		WHEN MATCHED AND EXISTS (SELECT source.Value EXCEPT SELECT target.Value) THEN
			UPDATE SET 
				[value] = [Source].[Value],
				[LastUpdatedUser] = @UserCreated_local, 
				[LastUpdatedDateTime] = GETDATE()
		WHEN NOT MATCHED BY TARGET THEN 
			INSERT ( [VisitHeaderId], [CategoryId],[SectionId], [Key],[Value],[CreatedUser],[CreatedDateTime] )
			VALUES ( [Source].[VisitHeaderId], [Source].[CategoryId], [Source].[SectionId],[Source].[Key], [Source].[Value], @UserCreated_local, GETDATE() )
		WHEN NOT MATCHED BY SOURCE AND [Target].[VisitHeaderId] = @visitHeaderId  
								AND [Target].[CategoryId] = @CategoryId 
								AND [Target].[SectionId] = @SectionId
 		    THEN DELETE 
		OUTPUT
		   $ACTION ChangeType,
		   coalesce (inserted.VisitKeyValueId, deleted.VisitKeyValueId) VisitKeyValueId,
		   coalesce (inserted.VisitHeaderId, deleted.VisitHeaderId) VisitHeaderId,
		   coalesce (inserted.CategoryId, deleted.CategoryId) CategoryId,
		   coalesce (inserted.SectionId, deleted.SectionId) SectionId,
		   inserted.[Key] NewKey,
		   deleted.[Key] PrevKey,
   		   inserted.[Value] NewValue,
		   deleted.[Value] PrevValue,
		   @UserCreated_local,
		   GetDate() 
			INTO tbl_Audit_VisitKeyValues;
	END
	ELSE
	MERGE [dbo].[tbl_VisitKeyValues] AS [Target]
		USING @VisitKeyValues AS [Source]
		ON [Target].[VisitHeaderId] = [Source].[VisitHeaderId] AND 
		   [Target].[CategoryId] = [Source].[CategoryId] AND
		   [Target].[SectionId] = [Source].[SectionId] AND
		   [Target].[Key] = [Source].[Key]
		WHEN MATCHED AND EXISTS (SELECT source.Value EXCEPT SELECT target.Value) THEN
			UPDATE SET 
				[value] = [Source].[Value],
				[LastUpdatedUser] = @UserCreated_local, 
				[LastUpdatedDateTime] = GETDATE()
		WHEN NOT MATCHED BY TARGET THEN 
			INSERT ( [VisitHeaderId], [CategoryId],[SectionId], [Key],[Value],[CreatedUser],[CreatedDateTime],[LastUpdatedUser],[LastUpdatedDateTime] )
			VALUES (  [Source].[VisitHeaderId], [Source].[CategoryId],  [Source].[SectionId],[Source].[Key], [Source].[Value],@UserCreated_local, GETDATE(), @UserCreated_local, GETDATE() )
		WHEN NOT MATCHED BY SOURCE AND [Target].[VisitHeaderId] = @visitHeaderId  
								AND [Target].[CategoryId] = @CategoryId 
								AND [Target].[SectionId] = @SectionId
		    THEN DELETE 
		OUTPUT
		   $ACTION ChangeType,
		   coalesce (inserted.VisitKeyValueId, deleted.VisitKeyValueId) VisitKeyValueId,
		   coalesce (inserted.VisitHeaderId, deleted.VisitHeaderId) VisitHeaderId,
		   coalesce (inserted.CategoryId, deleted.CategoryId) CategoryId,
		   coalesce (inserted.SectionId, deleted.SectionId) SectionId,
		   inserted.[Key] NewKey,
		   deleted.[Key] PrevKey,
   		   inserted.[Value] NewValue,
		   deleted.[Value] PrevValue,
		   @UserCreated_local,
		   GetDate() 
			INTO tbl_Audit_VisitKeyValues;
	END
	ELSE
		BEGIN

			DECLARE @VisitKeyValueEmpty TABLE
			(
			  VisitHeaderId int, 
			  CategoryId int,
			  SectionId int
			)

			INSERT INTO @VisitKeyValueEmpty VALUES (@VisitHeaderId, @CategoryId, @SectionId)

			MERGE [dbo].[tbl_VisitKeyValues] AS [Target]
				USING @VisitKeyValueEmpty AS [Source]
				ON [Target].[VisitHeaderId] = [Source].[VisitHeaderId] AND 
				   [Target].[CategoryId] = [Source].[CategoryId]  AND 
				   [Target].[SectionId] = [Source].[SectionId] 
				WHEN MATCHED 
					THEN DELETE 
				OUTPUT
				   $ACTION ChangeType,
				   coalesce (inserted.VisitKeyValueId, deleted.VisitKeyValueId) VisitKeyValueId,
				   coalesce (inserted.VisitHeaderId, deleted.VisitHeaderId) VisitHeaderId,
				   coalesce (inserted.CategoryId, deleted.CategoryId) CategoryId,
				   coalesce (inserted.SectionId, deleted.SectionId) SectionId,
				   inserted.[Key] NewKey,
				   deleted.[Key] PrevKey,
   				   inserted.[Value] NewValue,
				   deleted.[Value] PrevValue,
				   @UserCreated_local,
				   GetDate() 
					INTO tbl_Audit_VisitKeyValues;

		END


			SET @success = 1;

	COMMIT;

	SELECT @success;
	END TRY
	BEGIN CATCH
	SELECT ERROR_MESSAGE() AS ErrorMessage;  
		ROLLBACK;
			SELECT @success;
	END CATCH
/*END*/
