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
* Swagger UI (just for simple testing of WebApi methods)
* EF Core (_Code_ _First_)
* JWT
	
Database:
* Postgres
	
### Get Start
-----------------------------------

First of all you must creat database.
You must create **two** migration for create and use database.
You create the first migration as usual:

For postgres use base EF tool in Rider

add-migration init

update-database

Then in file "MaintenanceWeb/WebApplication/WebApplication/Data/MaintenanceDatabaseContext.cs", uncomment 16 line, create new Migration

add-migration appendData

Comment out this line again (16 line) and update databse

update-database

After that you must install node_modules on ClientApplication

### Screenshots

Client area
![Screenshot_2021-03-04 Станция техобслуживания(1)](https://user-images.githubusercontent.com/60642588/109949727-60999e00-7ce4-11eb-95dc-1d67fae9ec70.png)

Admin page
![Screenshot_2021-03-04 Станция техобслуживания(2)](https://user-images.githubusercontent.com/60642588/109949726-5f687100-7ce4-11eb-95b3-1599f2ce8861.png)

Charts exapmle
![Screenshot_2021-03-04 Станция техобслуживания(3)](https://user-images.githubusercontent.com/60642588/109949730-61323480-7ce4-11eb-825d-121bde91bf62.png)
