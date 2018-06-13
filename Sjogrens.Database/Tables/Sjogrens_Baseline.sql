


CREATE TABLE [dbo].[Baseline](
	[BaselineId] [int] IDENTITY(1,1) NOT NULL,
	[Pid] [int] NOT NULL,
	[PasId] [varchar](10) NOT NULL,
	[TrustCode] [varchar](10) NOT NULL,
	[Completed] [bit] NOT NULL,
	[UserModified] [varchar](100) NOT NULL,
	[UserModifiedDate] [datetime] NOT NULL,
	
 CONSTRAINT [PK_Baseline] PRIMARY KEY CLUSTERED 
(
	[BaselineId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90) ON [PRIMARY]
) ON [PRIMARY]

GO

