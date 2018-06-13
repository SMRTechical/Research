


CREATE TABLE [dbo].[Audit_VisitHeader](
	[ChangeType] [nvarchar](10) NULL,
	[VisitHeaderId] [int] NOT NULL,
	[VisitId] [int] NOT NULL,
	[DateOfVisit] [date] NOT NULL,
	[Pid] [int] NOT NULL,
	[PasId] [varchar](10) NOT NULL,
	[OrganisationCode] [varchar](10) NOT NULL,
	[NewCompleted] [bit] NULL,
	[PrevCompleted] [bit] NULL,
	[UserName] [nvarchar](100) NOT NULL,
	[DateTimeChanged] [datetime] NOT NULL
) ON [PRIMARY]

GO