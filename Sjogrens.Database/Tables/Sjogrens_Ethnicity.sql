CREATE TABLE [dbo].[Sjogrens_Ethnicity](
	[EthnicityId] [int] IDENTITY(1,1) NOT NULL,
	[PasActivityCode] [varchar](10) NOT NULL,
	[Description] [varchar](250) NOT NULL,
 CONSTRAINT [PK_Sjogrens_Ethnicity] PRIMARY KEY CLUSTERED 
(
	[EthnicityId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO