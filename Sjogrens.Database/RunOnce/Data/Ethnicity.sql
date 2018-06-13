IF NOT EXISTS(SELECT 1 FROM Sjogrens_Ethnicity)
INSERT INTO Sjogrens_Ethnicity
 SELECT Return_Value, Reference_Value_Description FROM pasactivity.dbo.Domain WHERE tbl_name = N'ETHGR'
 GO