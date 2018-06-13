CREATE TABLE [dbo].[VisitHeader](
	[VisitHeaderId] [int] IDENTITY(1,1) NOT NULL,
	/*[VisitId] [int] NOT NULL,*/
	[DateOfVisit] [date] NOT NULL,
	[Pid] [int] NOT NULL,
	[PasId] [varchar](10) NOT NULL,
	[OrganisationCode] [varchar](10) NOT NULL,
	[Completed] [bit] NULL,
	[CreatedUser] [varchar](100) NOT NULL,
	[CreatedDateTime] [datetime] NOT NULL,
	[LastUpdatedUser] [varchar](100) NULL,
	[LastUpdatedDateTime] [datetime] NULL,
 CONSTRAINT [PK_VisitHeader] PRIMARY KEY CLUSTERED 
(
	[VisitHeaderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90) ON [PRIMARY]
) ON [PRIMARY]

GO


ALTER TABLE [dbo].[VisitHeader] ADD  CONSTRAINT [DF_VisitHeader_Completed]  DEFAULT ((0)) FOR [Completed]
GO
