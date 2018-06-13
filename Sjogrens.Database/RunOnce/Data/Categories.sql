
INSERT INTO [dbo].[Categories] VALUES
   ((SELECT MAX(CategoryId) + 1  FROM [dbo].[Categories])
   ,'Diagnosis'
   ,'Diagnosis'
   ,'Diagnosis'
   ,'Diagnosis')

 INSERT INTO [dbo].[Categories] VALUES
   ((SELECT MAX(CategoryId) + 1  FROM [dbo].[Categories])
   ,'Current Medications'
   ,'CurrentMedications'
   ,'Current Medications'
   ,'Current Medications')
  
  INSERT INTO [dbo].[Categories] VALUES
   ((SELECT MAX(CategoryId) + 1  FROM [dbo].[Categories])
   ,'ESSDAI'
   ,'ESSDAI'
   ,'ESSDAI'
   ,'ESSDAI')

  INSERT INTO [dbo].[Categories] VALUES
   ((SELECT MAX(CategoryId) + 1  FROM [dbo].[Categories])
   ,'Activity Score'
   ,'ActivityScore'
   ,'Activity Score'
   ,'Activity Score')

  INSERT INTO [dbo].[Categories] VALUES
   ((SELECT MAX(CategoryId) + 1  FROM [dbo].[Categories])
   ,'Damage Indices'
   ,'DamageIndices'
   ,'Damage Indices'
   ,'Damage Indices')

     INSERT INTO [dbo].[Categories] VALUES
   ((SELECT MAX(CategoryId) + 1  FROM [dbo].[Categories])
   ,'Past Medical History'
   ,'PastMedicalHistory'
   ,'Past Medical History'
   ,'Past Medical History')

     INSERT INTO [dbo].[Categories] VALUES
   ((SELECT MAX(CategoryId) + 1  FROM [dbo].[Categories])
   ,'Investigations Requested'
   ,'InvestigationsRequested'
   ,'Investigations Requested'
   ,'Investigations Requested')

 INSERT INTO [dbo].[Categories] VALUES
   ((SELECT MAX(CategoryId) + 1  FROM [dbo].[Categories])
   ,'Ultrasound Results'
   ,'UltrasoundResults'
   ,'Ultrasound Results'
   ,'Ultrasound Results')

 INSERT INTO [dbo].[Categories] VALUES
   ((SELECT MAX(CategoryId) + 1  FROM [dbo].[Categories])
   ,'Salivary Flow'
   ,'SalivaryFlow'
   ,'Salivary Flow'
   ,'Salivary Flow')


    INSERT INTO [dbo].[Categories] VALUES
   ((SELECT MAX(CategoryId) + 1  FROM [dbo].[Categories])
   ,'Routine Bloods'
   ,'RoutineBloods'
   ,'Routine Bloods'
   ,'Routine Bloods')


       INSERT INTO [dbo].[Categories] VALUES
   ((SELECT MAX(CategoryId) + 1  FROM [dbo].[Categories])
   ,'Research Bloods'
   ,'ResearchBloods'
   ,'Research Bloods'
   ,'Research Bloods')


        INSERT INTO [dbo].[Categories] VALUES
   ((SELECT MAX(CategoryId) + 1  FROM [dbo].[Categories])
   ,'Other research biomaterials'
   ,'OtherResearchBiomaterials'
   ,'Other research biomaterials'
   ,'Other research biomaterials')

