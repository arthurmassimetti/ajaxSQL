use DbArthur
Go
IF OBJECT_ID('dbo.SetCliente') IS NOT NULL Drop Procedure dbo.SetCliente
GO
Create Procedure dbo.SetCliente
(
	 @ClienteId		Int				= 0 
	,@Nome			Varchar(256)	= Null
	,@Email			Varchar(32)		= Null
	,@Celular		Varchar(16)		= Null
	,@Idade			Int				= 0
)
As
Begin	 

	 If Not Exists(Select * From Cliente Where ClienteId = @ClienteId)
		 Begin

			Insert Into dbo.Cliente
			(
				 Nome		
				,Email		
				,Celular	
				,Idade	
			)
			Values
			(
				 @Nome		
				,@Email		
				,@Celular	
				,@Idade		
			)

			Set @ClienteId = @@IDENTITY
		 End
	 Else 
		 Begin
			Update dbo.Cliente Set
				 Nome		 = IsNull(@Nome,Nome)		
				,Email		 = IsNull(@Email,Email)		
				,Celular	 = IsNull(@Celular,Celular)
				,Idade		 = (Case When @Idade = 0 Then Idade Else @Idade End) 
			Where
				ClienteId = @ClienteId
		 End

		Select @ClienteId
End