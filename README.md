# Course project

This is web version of my last project. This is Angular + WebApi application

### Technologies

On frontend:
* Angular
* Botstrap
* jQuery (for Bootstrap)
* FontAwsome
* Sb2-AdminPanel (css library)
	
On backend:
* WebApi .Net Core v.5
* Swagger UI (just for simple testing of WebApi methods
* EF Core (_Code_ _First_)
	
Database:
* MsSQL
	
### Get Start

First of all you must creat database.
You must create **two** migration for create and use database.
You create the first migration as usual:

```` add-migration init ````

```` update-database ````

Then in file `"MaintenanceWeb/WebApplication/WebApplication/Data/MaintenanceDatabaseContext.cs"`, uncomment 16 line, create new Migration

```` add-migration appendData ````

Comment out this line again (16 line) and update databse

```` update-database ````

After that you must install node_modules on ClientApplication

```` npm i ````

and run application. You must run WebApi-Application and Client-Application as you wish.
