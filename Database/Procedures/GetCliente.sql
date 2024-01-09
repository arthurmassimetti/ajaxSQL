use DbArthur
Go
IF OBJECT_ID('dbo.GetCliente') IS NOT NULL Drop Procedure dbo.GetCliente
GO
Create Procedure dbo.GetCliente
(
	 @ClienteId							Int				= 0
	,@DescricaoFiltro					Varchar(128)	= Null
	,@PageNumber						Int				= 0
    ,@PageSize							Int				= 0
	,@OrderColumn						Int				= 0
	,@OrderDir							Char(4)			= Null

)
As
Begin	

	Declare @RegCount Int	= 0;
	Set		@PageNumber			= (Case When @PageNumber	= 0 Then 1	Else @PageNumber	End);
	Set		@PageSize			= (Case When @PageSize		= 0 Then 10 Else @PageSize		End);


		Select 			
			 ClienteId	
			,Nome		
			,Email		
			,Celular	
			,Idade		
			,RegCount				= Count(*) Over()
		From dbo.Cliente
		Where
				(@ClienteId = 0 Or ClienteId = @ClienteId )
			  And (
 					 @DescricaoFiltro			Is Null
				OR	(
						ClienteId													Like '%'+ @DescricaoFiltro +'%'
					OR	Email				collate sql_latin1_general_cp1251_ci_as Like '%'+ @DescricaoFiltro +'%'
					OR	Nome				collate sql_latin1_general_cp1251_ci_as Like '%'+ @DescricaoFiltro +'%'
					OR	Celular				collate sql_latin1_general_cp1251_ci_as Like '%'+ @DescricaoFiltro +'%'
				)
)
		Order By
			(Case When @OrderColumn = 0 And @OrderDir = 'asc'	Then  ClienteId		else '' End) Asc,
			(Case When @OrderColumn = 0 And @OrderDir = 'desc'	Then  ClienteId		else '' End) Desc,
			(Case When @OrderColumn = 1 And @OrderDir = 'asc'	Then  Nome			else '' End) Asc,
			(Case When @OrderColumn = 1 And @OrderDir = 'desc'	Then  Nome			else '' End) Desc,
			(Case When @OrderColumn = 2 And @OrderDir = 'asc'	Then  Email			else '' End) Asc,
			(Case When @OrderColumn = 2 And @OrderDir = 'desc'	Then  Email			else '' End) Desc,
			(Case When @OrderColumn = 3 And @OrderDir = 'asc'	Then  Celular			else '' End) Asc,
			(Case When @OrderColumn = 3 And @OrderDir = 'desc'	Then  Celular			else '' End) Desc,
			(Case When @OrderColumn = 4 And @OrderDir = 'asc'	Then  Idade			else '' End) Asc,
			(Case When @OrderColumn = 4 And @OrderDir = 'desc'	Then  Idade			else '' End) Desc,
		ClienteId Desc
		OFFSET ((@PageNumber - 1) * @PageSize)  ROWS
					FETCH NEXT @PageSize ROWS ONLY 
End