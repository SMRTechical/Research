

CREATE TABLE [dbo].[Sjogrens_Patients](
	[Pid] [int] IDENTITY(1,1) NOT NULL,
	[PasId] [varchar](10) NOT NULL,
	[FirstName] [varchar](50) NOT NULL,
	[LastName] [varchar](50) NOT NULL,
	[NHSNumber] [varchar](10) NULL,
	[DateOfBirth] [date] NULL,
	[OrganisationCode] [varchar](10) NOT NULL,
	[OrganisationDescription] [varchar](200) NOT NULL,
	[EthnicGroup] [varchar](250) NULL,
	[Gender] [char](1) NOT NULL,
	[Address1] [varchar](50) NULL,
	[Address2] [varchar](50) NULL,
	[Address3] [varchar](50) NULL,
	[Address4] [varchar](50) NULL,
	[PostCode] [varchar](8) NULL,
	[Telephone] [varchar](20) NULL,
	[MobileNumber] [varchar](50) NULL,
	[GPLastName] [varchar](50) NULL,
	[GPInitials] [varchar](4) NULL,
	[GPAddress1] [varchar](50) NULL,
	[GPAddress2] [varchar](50) NULL,
	[GPAddress3] [varchar](50) NULL,
	[GPAddress4] [varchar](50) NULL,
	[GPPostCode] [varchar](8) NULL,
	[GPTelephone] [varchar](20) NULL,
	[NOKTitle] [varchar](10) NULL,
	[NOKFirstName] [varchar](50) NULL,
	[NOKLastName] [varchar](50) NULL,
	[NOKAddress1] [varchar](50) NULL,
	[NOKAddress2] [varchar](50) NULL,
	[NOKAddress3] [varchar](50) NULL,
	[NOKAddress4] [varchar](50) NULL,
	[NOKPostCode] [varchar](8) NULL,
	[NOKTelephone] [varchar](20) NULL,
	[NOKRelationship] [varchar](20) NULL,
	[RefreshDate] [datetime] NULL,
	[ConsentGiven] [bit] NULL,
	[ConsentGivenDate] [datetime] NULL,
	[ConsentWithdrawnDate] [datetime] NULL,
	[UserCreated] [varchar](100) NOT NULL,
	[UserCreatedDate] [datetime] NOT NULL,
	[UserModified] [varchar](100) NULL,
	[UserModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_Sjogrens_Patients] PRIMARY KEY CLUSTERED 
(
	[Pid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90) ON [PRIMARY]
) ON [PRIMARY]

GO


ALTER TABLE [dbo].[Sjogrens_Patients] ADD  CONSTRAINT [DF_Sjogrens_Patients_ObtainedConsent]  DEFAULT ((0)) FOR [ConsentGiven]
GO

ALTER TABLE [dbo].[Sjogrens_Patients] ADD  CONSTRAINT [DF_Sjogrens_Patients_UserCreatedDate]  DEFAULT (getdate()) FOR [UserCreatedDate]
GO

ALTER TABLE [dbo].[Sjogrens_Patients] ADD  CONSTRAINT [DF_Sjogrens_Patients_UserModifiedDate]  DEFAULT (getdate()) FOR [UserModifiedDate]
GO



CREATE UNIQUE NONCLUSTERED INDEX [IX_Sjogrens_Patients_PasId] ON [dbo].[Sjogrens_Patients]
(
	[PasId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO


