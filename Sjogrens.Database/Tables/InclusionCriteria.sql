

CREATE TABLE [dbo].[InclusionCriteria](
	[InclusionCriteriaId] [int] NOT NULL,
	[PasId] [varchar](10) NOT NULL,
	[AttendedUHBpSSClinic] [bit] NOT NULL,
	[WarrantingInvestigationForpSS] [bit] NOT NULL,
	[PhysicianDiagnosisOfpSS] [bit] NOT NULL,
 CONSTRAINT [PK_InclusionCriteria] PRIMARY KEY CLUSTERED 
(
	[InclusionCriteriaId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO


ALTER TABLE [dbo].[InclusionCriteria]  WITH CHECK ADD  CONSTRAINT [FK_InclusionCriteria_Patients] FOREIGN KEY([PasId])
REFERENCES [dbo].[Sjogrens_Patients] ([PasId])
GO

ALTER TABLE [dbo].[InclusionCriteria] CHECK CONSTRAINT [FK_InclusionCriteria_Patients]
GO

CREATE UNIQUE NONCLUSTERED INDEX [IX_Sjogrens_Patients_PasId] ON [dbo].[Sjogrens_Patients]
(
	[PasId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO


