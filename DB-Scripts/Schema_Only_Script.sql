USE [master]
GO
/****** Object:  Database [InsuranceClient]    Script Date: 2/15/2021 1:55:30 PM ******/
CREATE DATABASE [InsuranceClient]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'InsuranceClient', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS\MSSQL\DATA\InsuranceClient.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'InsuranceClient_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS\MSSQL\DATA\InsuranceClient_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [InsuranceClient] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [InsuranceClient].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [InsuranceClient] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [InsuranceClient] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [InsuranceClient] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [InsuranceClient] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [InsuranceClient] SET ARITHABORT OFF 
GO
ALTER DATABASE [InsuranceClient] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [InsuranceClient] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [InsuranceClient] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [InsuranceClient] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [InsuranceClient] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [InsuranceClient] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [InsuranceClient] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [InsuranceClient] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [InsuranceClient] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [InsuranceClient] SET  DISABLE_BROKER 
GO
ALTER DATABASE [InsuranceClient] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [InsuranceClient] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [InsuranceClient] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [InsuranceClient] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [InsuranceClient] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [InsuranceClient] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [InsuranceClient] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [InsuranceClient] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [InsuranceClient] SET  MULTI_USER 
GO
ALTER DATABASE [InsuranceClient] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [InsuranceClient] SET DB_CHAINING OFF 
GO
ALTER DATABASE [InsuranceClient] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [InsuranceClient] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [InsuranceClient] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [InsuranceClient] SET QUERY_STORE = OFF
GO
USE [InsuranceClient]
GO
/****** Object:  Table [dbo].[TBL_CLIENT_POLICIES_DATA]    Script Date: 2/15/2021 1:55:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBL_CLIENT_POLICIES_DATA](
	[POLICY_ID] [bigint] NOT NULL,
	[DATE_OF_PURCHASE] [date] NOT NULL,
	[CUSTOMER_ID] [bigint] NOT NULL,
	[FUEL] [nvarchar](50) NOT NULL,
	[VEHICLE_SEGMENT] [nvarchar](50) NOT NULL,
	[PREMIUM] [bigint] NOT NULL,
	[BODILY_INJURY_LIABILITY] [smallint] NOT NULL,
	[PERSONAL_INJURY_PROTECTION] [smallint] NOT NULL,
	[PROPERTY_DAMAGE_LIABILITY] [smallint] NOT NULL,
	[COLLISION] [smallint] NOT NULL,
	[COMPREHENSIVE] [smallint] NOT NULL,
 CONSTRAINT [PK_TBL_CLIENT_POLICIES_DATA] PRIMARY KEY CLUSTERED 
(
	[POLICY_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TBL_CLIENT_PERSONAL_DATA]    Script Date: 2/15/2021 1:55:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBL_CLIENT_PERSONAL_DATA](
	[CUSTOMER_ID] [bigint] NOT NULL,
	[CUSTOMER_GENDER] [nvarchar](50) NOT NULL,
	[CUSTOMER_INCOME_GROUP] [nvarchar](250) NOT NULL,
	[CUSTOMER_REGION] [nvarchar](50) NOT NULL,
	[CUSTOMER_MARITAL_STATUS] [smallint] NOT NULL,
 CONSTRAINT [PK_TBL_CLIENT_PERSONAL_DATA] PRIMARY KEY CLUSTERED 
(
	[CUSTOMER_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[VW_POLICY_AND_CUSTOMER_DETAILS_DATA]    Script Date: 2/15/2021 1:55:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[VW_POLICY_AND_CUSTOMER_DETAILS_DATA]
AS
SELECT        TOP (100) PERCENT ploicyData.POLICY_ID, ploicyData.DATE_OF_PURCHASE, ploicyData.CUSTOMER_ID, ploicyData.FUEL, ploicyData.VEHICLE_SEGMENT, ploicyData.PREMIUM, ploicyData.BODILY_INJURY_LIABILITY, 
                         ploicyData.PERSONAL_INJURY_PROTECTION, ploicyData.PROPERTY_DAMAGE_LIABILITY, ploicyData.COLLISION, ploicyData.COMPREHENSIVE, clientData.CUSTOMER_ID AS Expr1, clientData.CUSTOMER_GENDER, 
                         clientData.CUSTOMER_INCOME_GROUP, clientData.CUSTOMER_REGION, clientData.CUSTOMER_MARITAL_STATUS
FROM            dbo.TBL_CLIENT_POLICIES_DATA AS ploicyData INNER JOIN
                         dbo.TBL_CLIENT_PERSONAL_DATA AS clientData ON ploicyData.CUSTOMER_ID = clientData.CUSTOMER_ID
ORDER BY ploicyData.POLICY_ID
GO
/****** Object:  View [dbo].[VW_POLICY_KPIS_TILE_DATA]    Script Date: 2/15/2021 1:55:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[VW_POLICY_KPIS_TILE_DATA]
AS
SELECT        TOP (1) CUSTOMER_REGION, UNIQUE_MONTH, SUM(NO_OF_POLICIES_BOUGHT) AS TOTAL_POLICIES_BOUGHT, VEHICLE_SEGMENT
FROM            (SELECT        CUSTOMER_REGION, DATENAME(MONTH, DATEADD(MONTH, MONTH(DATE_OF_PURCHASE) - 1, '1900-01-01')) AS UNIQUE_MONTH, COUNT(*) AS NO_OF_POLICIES_BOUGHT, VEHICLE_SEGMENT
                          FROM            dbo.VW_POLICY_AND_CUSTOMER_DETAILS_DATA
                          GROUP BY MONTH(DATE_OF_PURCHASE), CUSTOMER_REGION, VEHICLE_SEGMENT) AS x
GROUP BY UNIQUE_MONTH, CUSTOMER_REGION, VEHICLE_SEGMENT
ORDER BY TOTAL_POLICIES_BOUGHT DESC
GO
/****** Object:  Table [dbo].[TBL_BOOL_VALUES]    Script Date: 2/15/2021 1:55:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBL_BOOL_VALUES](
	[MASTER_ID] [bigint] IDENTITY(1,1) NOT NULL,
	[BOOL_VALUES] [int] NOT NULL,
 CONSTRAINT [PK_TBL_BOOL_VALUES] PRIMARY KEY CLUSTERED 
(
	[MASTER_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TBL_CLIENT_INSURANCE_DATA]    Script Date: 2/15/2021 1:55:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBL_CLIENT_INSURANCE_DATA](
	[POLICY_ID] [bigint] NOT NULL,
	[DATE_OF_PURCHASE] [date] NOT NULL,
	[CUSTOMER_ID] [bigint] NOT NULL,
	[FUEL] [nvarchar](50) NOT NULL,
	[VEHICLE_SEGMENT] [nvarchar](50) NOT NULL,
	[PREMIUM] [bigint] NOT NULL,
	[BODILY_INJURY_LIABILITY] [smallint] NOT NULL,
	[PERSONAL_INJURY_PROTECTION] [smallint] NOT NULL,
	[PROPERTY_DAMAGE_LIABILITY] [smallint] NOT NULL,
	[COLLISION] [smallint] NOT NULL,
	[COMPREHENSIVE] [smallint] NOT NULL,
	[CUSTOMER_GENDER] [nvarchar](50) NOT NULL,
	[CUSTOMER_INCOME_GROUP] [nvarchar](50) NOT NULL,
	[CUSTOMER_REGION] [nvarchar](50) NOT NULL,
	[CUSTOMER_MARITAL_STATUS] [smallint] NOT NULL,
 CONSTRAINT [PK_TBL_CLIENT_INSURANCE_DATA] PRIMARY KEY CLUSTERED 
(
	[POLICY_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TBL_CUSTOMER_GENDER]    Script Date: 2/15/2021 1:55:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBL_CUSTOMER_GENDER](
	[MASTER_ID] [bigint] IDENTITY(1,1) NOT NULL,
	[CUSTOMER_GENDER] [varchar](50) NOT NULL,
 CONSTRAINT [PK_TBL_CUSTOMER_GENDER] PRIMARY KEY CLUSTERED 
(
	[MASTER_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TBL_CUSTOMER_INCOME_GROUP]    Script Date: 2/15/2021 1:55:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBL_CUSTOMER_INCOME_GROUP](
	[MASTER_ID] [bigint] IDENTITY(1,1) NOT NULL,
	[INCOME_GROUP] [nvarchar](250) NOT NULL,
 CONSTRAINT [PK_TBL_CUSTOMER_INCOME_GROUP] PRIMARY KEY CLUSTERED 
(
	[MASTER_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TBL_CUSTOMER_REGION]    Script Date: 2/15/2021 1:55:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBL_CUSTOMER_REGION](
	[MASTER_ID] [bigint] IDENTITY(1,1) NOT NULL,
	[CUSTOMER_REGION] [nvarchar](250) NOT NULL,
 CONSTRAINT [PK_TBL_CUSTOMER_REGION] PRIMARY KEY CLUSTERED 
(
	[MASTER_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TBL_FUEL_TYPE]    Script Date: 2/15/2021 1:55:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBL_FUEL_TYPE](
	[MASTER_ID] [bigint] IDENTITY(1,1) NOT NULL,
	[FUEL] [varchar](50) NOT NULL,
 CONSTRAINT [PK_TBL_FUEL_TYPE] PRIMARY KEY CLUSTERED 
(
	[MASTER_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TBL_VEHICLE_SEGMENT]    Script Date: 2/15/2021 1:55:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBL_VEHICLE_SEGMENT](
	[MASTER_ID] [bigint] IDENTITY(1,1) NOT NULL,
	[VEHICLE_SEGMENT] [nvarchar](250) NOT NULL,
 CONSTRAINT [PK_TBL_VEHICLE_SEGMENT] PRIMARY KEY CLUSTERED 
(
	[MASTER_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[TBL_CLIENT_POLICIES_DATA]  WITH CHECK ADD  CONSTRAINT [FK_TBL_CLIENT_POLICIES_DATA_TBL_CLIENT_PERSONAL_DATA] FOREIGN KEY([CUSTOMER_ID])
REFERENCES [dbo].[TBL_CLIENT_PERSONAL_DATA] ([CUSTOMER_ID])
GO
ALTER TABLE [dbo].[TBL_CLIENT_POLICIES_DATA] CHECK CONSTRAINT [FK_TBL_CLIENT_POLICIES_DATA_TBL_CLIENT_PERSONAL_DATA]
GO
/****** Object:  StoredProcedure [dbo].[SP_NO_OF_POLICY_BOUGHT_IN_REGION]    Script Date: 2/15/2021 1:55:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SP_NO_OF_POLICY_BOUGHT_IN_REGION] 
@region varchar(50) = null
as 

if(@region = 'North')

Begin

SELECT CUSTOMER_REGION,UNIQUE_MONTH
       ,North = SUM(CASE WHEN CUSTOMER_REGION = 'North' THEN NO_OF_POLICIES_BOUGHT END)
  FROM 
  ( SELECT CUSTOMER_REGION, Month(DATE_OF_PURCHASE) as NO_OF_MONTH , 
  DATENAME(MONTH, DATEADD(MONTH, MONTH(DATE_OF_PURCHASE) - 1, '1900-01-01')) AS UNIQUE_MONTH, COUNT(*) AS NO_OF_POLICIES_BOUGHT
FROM  dbo.VW_POLICY_AND_CUSTOMER_DETAILS_DATA where CUSTOMER_REGION = 'North'

GROUP BY MONTH(DATE_OF_PURCHASE),CUSTOMER_REGION,DATE_OF_PURCHASE ) x

group by UNIQUE_MONTH, CUSTOMER_REGION,NO_OF_MONTH ORDER BY NO_OF_MONTH
End

else if(@region = 'South')

Begin

SELECT CUSTOMER_REGION,UNIQUE_MONTH
       ,South = SUM(CASE WHEN CUSTOMER_REGION = 'South' THEN NO_OF_POLICIES_BOUGHT END)
  FROM 
  ( SELECT CUSTOMER_REGION, Month(DATE_OF_PURCHASE) as NO_OF_MONTH , 
  DATENAME(MONTH, DATEADD(MONTH, MONTH(DATE_OF_PURCHASE) - 1, '1900-01-01')) AS UNIQUE_MONTH, COUNT(*) AS NO_OF_POLICIES_BOUGHT
FROM  dbo.VW_POLICY_AND_CUSTOMER_DETAILS_DATA where CUSTOMER_REGION = 'South'

GROUP BY MONTH(DATE_OF_PURCHASE),CUSTOMER_REGION,DATE_OF_PURCHASE ) x

group by UNIQUE_MONTH, CUSTOMER_REGION,NO_OF_MONTH ORDER BY NO_OF_MONTH
End

else if(@region = 'East')

Begin

SELECT CUSTOMER_REGION,UNIQUE_MONTH
       ,East = SUM(CASE WHEN CUSTOMER_REGION = 'East' THEN NO_OF_POLICIES_BOUGHT END)
  FROM 
  ( SELECT CUSTOMER_REGION, Month(DATE_OF_PURCHASE) as NO_OF_MONTH , 
  DATENAME(MONTH, DATEADD(MONTH, MONTH(DATE_OF_PURCHASE) - 1, '1900-01-01')) AS UNIQUE_MONTH, COUNT(*) AS NO_OF_POLICIES_BOUGHT
FROM  dbo.VW_POLICY_AND_CUSTOMER_DETAILS_DATA where CUSTOMER_REGION = 'East'

GROUP BY MONTH(DATE_OF_PURCHASE),CUSTOMER_REGION,DATE_OF_PURCHASE ) x

group by UNIQUE_MONTH, CUSTOMER_REGION,NO_OF_MONTH ORDER BY NO_OF_MONTH

End

else if(@region = 'West')

Begin

SELECT CUSTOMER_REGION,UNIQUE_MONTH
       ,West = SUM(CASE WHEN CUSTOMER_REGION = 'West' THEN NO_OF_POLICIES_BOUGHT END)
  FROM 
  ( SELECT CUSTOMER_REGION, Month(DATE_OF_PURCHASE) as NO_OF_MONTH , 
  DATENAME(MONTH, DATEADD(MONTH, MONTH(DATE_OF_PURCHASE) - 1, '1900-01-01')) AS UNIQUE_MONTH, COUNT(*) AS NO_OF_POLICIES_BOUGHT
FROM  dbo.VW_POLICY_AND_CUSTOMER_DETAILS_DATA where CUSTOMER_REGION = 'West'

GROUP BY MONTH(DATE_OF_PURCHASE),CUSTOMER_REGION,DATE_OF_PURCHASE ) x

group by UNIQUE_MONTH, CUSTOMER_REGION,NO_OF_MONTH ORDER BY NO_OF_MONTH

End

else

Begin

SELECT CUSTOMER_REGION,UNIQUE_MONTH
       ,North = SUM(CASE WHEN CUSTOMER_REGION = 'North' THEN NO_OF_POLICIES_BOUGHT END)
       ,South = SUM(CASE WHEN CUSTOMER_REGION = 'South' THEN NO_OF_POLICIES_BOUGHT END)
       ,East = SUM(CASE WHEN  CUSTOMER_REGION = 'East' THEN NO_OF_POLICIES_BOUGHT  END)
	   ,West = SUM(CASE WHEN  CUSTOMER_REGION = 'West' THEN NO_OF_POLICIES_BOUGHT  END)
  FROM 
  ( SELECT CUSTOMER_REGION, Month(DATE_OF_PURCHASE) as NO_OF_MONTH , 
  DATENAME(MONTH, DATEADD(MONTH, MONTH(DATE_OF_PURCHASE) - 1, '1900-01-01')) AS UNIQUE_MONTH, COUNT(*) AS NO_OF_POLICIES_BOUGHT
FROM  dbo.VW_POLICY_AND_CUSTOMER_DETAILS_DATA

GROUP BY MONTH(DATE_OF_PURCHASE),CUSTOMER_REGION,DATE_OF_PURCHASE ) x

group by UNIQUE_MONTH, CUSTOMER_REGION,NO_OF_MONTH ORDER BY NO_OF_MONTH
End

GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[40] 4[20] 2[20] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
         Begin Table = "ploicyData"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 136
               Right = 321
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "clientData"
            Begin Extent = 
               Top = 6
               Left = 359
               Bottom = 136
               Right = 628
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 1440
         Alias = 900
         Table = 1170
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'VW_POLICY_AND_CUSTOMER_DETAILS_DATA'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'VW_POLICY_AND_CUSTOMER_DETAILS_DATA'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[40] 4[20] 2[20] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
         Begin Table = "x"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 136
               Right = 287
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 12
         Column = 1440
         Alias = 900
         Table = 1170
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'VW_POLICY_KPIS_TILE_DATA'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'VW_POLICY_KPIS_TILE_DATA'
GO
USE [master]
GO
ALTER DATABASE [InsuranceClient] SET  READ_WRITE 
GO
