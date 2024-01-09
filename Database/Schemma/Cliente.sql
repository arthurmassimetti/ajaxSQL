Use DbArthur
Go
Drop Table dbo.Cliente
go
Create Table dbo.Cliente
(
	 ClienteId		Int				Primary Key Identity 
	,Nome			Varchar(256)	Not Null
	,Email			Varchar(32)		Not Null
	,Celular		Varchar(16)		Not Null
	,Idade			Int				Not Null
)
