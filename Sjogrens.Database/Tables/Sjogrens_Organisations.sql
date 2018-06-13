
CREATE TABLE [dbo].[Sjogrens_Organisations](
	[OrganisationId] [int] IDENTITY(1,1) NOT NULL,
	[Code] [varchar](10) NOT NULL,
	[Description] [varchar](250) NOT NULL,
	[active] [bit] NOT NULL,
 CONSTRAINT [PK_Sjogrens_Organisations] PRIMARY KEY CLUSTERED 
(
	[OrganisationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO



ALTER TABLE [dbo].[Sjogrens_Organisations] ADD  CONSTRAINT [DF_Sjogrens_Organisations_active]  DEFAULT ((1)) FOR [active]
GO

