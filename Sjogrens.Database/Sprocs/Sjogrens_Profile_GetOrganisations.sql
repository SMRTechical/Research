-- ==-- =============================================
-- Author:		Sajid Riaz
-- Create date:  31/08/2017
-- Description:	Gets a list of trusts
-- =============================================
CREATE PROCEDURE [dbo].[Sjogrens_Profile_GetOrganisations]
AS
BEGIN
SET NOCOUNT ON
 
DECLARE @sql varchar(max)

SET @sql = 
'select  Organisation_Code, Organisation_Name 
 from PasActivity.dbo.Trusts ' 

SET @sql = 'SELECT * FROM OPENQUERY(READONLYHECTOR,''' + @sql + ''')'


If NOT EXISTS(SELECT 1 FROM Sjogrens_Organisations)
INSERT INTO Sjogrens_Organisations (Code,[Description])
EXEC (@sql)

SELECT Code, [Description] FROM Sjogrens_Organisations WHERE active = 1


END
GO

GRANT EXECUTE ON [dbo].Sjogrens_Profile_GetOrganisations TO CDEA_Sjogrens_User
GO