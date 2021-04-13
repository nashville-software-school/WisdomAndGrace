USE [master]
GO

IF db_id('WisdomAndGrace') IS NULL
  CREATE DATABASE WisdomAndGrace
GO

USE [WisdomAndGrace]
GO


DROP TABLE IF EXISTS [Quote];
DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [UserType];
GO 


CREATE TABLE [UserType] (
  [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
  [Name] NVARCHAR(50) NOT NULL
)

CREATE TABLE [UserProfile] (
  [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
  [FirebaseUserId] NVARCHAR(28) NOT NULL,
  [Name] NVARCHAR(50) NOT NULL,
  [Email] NVARCHAR(255) NOT NULL,
  [UserTypeId] INTEGER NOT NULL,

  CONSTRAINT FK_UserProfile_UserType FOREIGN KEY (UserTypeId) REFERENCES UserType(Id),
  CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId)
)

CREATE TABLE [Quote] (
  [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
  [Text] TEXT NOT NULL,
  [UserProfileId] INTEGER NOT NULL,

  CONSTRAINT FK_Quote_UserProfile FOREIGN KEY (UserProfileId) REFERENCES UserProfile(id)
)
GO


SET IDENTITY_INSERT [UserType] ON
INSERT INTO [UserType]
  ([Id], [Name])
VALUES 
  (1, 'admin'), 
  (2, 'user');
SET IDENTITY_INSERT [UserType] OFF
  

SET IDENTITY_INSERT [UserProfile] ON
INSERT INTO [UserProfile]
  ([Id], [FirebaseUserId], [Name], [Email], [UserTypeId])
VALUES
  (1, '4oULyNuszpUGbNkTqGS0T8Iqs1L2', 'Foo Barington', 'foo@bar.com', 1),
  (2, 'vP3tkzRXWmRzwSLGwNTBS5fJs2N2', 'Bar Bazaar', 'bar@baz.com', 2);
SET IDENTITY_INSERT [UserProfile] OFF


SET IDENTITY_INSERT [Quote] ON
INSERT INTO [Quote]
  ([Id], [UserProfileId], [Text])
VALUES
  (1, 1, 'To me programming is more than an important practical art. It is also a gigantic undertaking in the foundations of knowledge.'),
  (2, 1, 'I am now going to make you a gift that will stay with you the rest of your life. For the rest of your life, every time you say, "We''ve always done it that way," my ghost will appear and haunt you for twenty-four hours.'),
  (3, 1, 'The glass is neither half empty nor half full. It''s simply larger than it needs to be. It is easier to get forgiveness than permission.'),
  (4, 1, 'A ship in port is safe, but that''s not what ships are built for.');
SET IDENTITY_INSERT [Quote] OFF


