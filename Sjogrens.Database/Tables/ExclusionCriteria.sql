
CREATE TABLE [dbo].[ExclusionCriteria](
	[ExclusionCriteriaId] [int] IDENTITY(1,1) NOT NULL,
	[PasId] [varchar](10) NOT NULL,
	[OrganisationCode] [varchar](10) NOT NULL,
	[PreviousHeadAndNeckRadiotherapy] [bit] NULL,
	[PreviousConfirmedDiagnosis] [bit] NULL,
	[ExclusionDiseases] [bit] NULL,
 CONSTRAINT [PK_ExclusionCriteria] PRIMARY KEY CLUSTERED 
(
	[ExclusionCriteriaId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO




CREATE UNIQUE NONCLUSTERED INDEX [IX_ExclusionCriteria_PasId] ON [dbo].[ExclusionCriteria]
(
	[PasId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO


