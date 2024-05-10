# Course Project

This project is a web version of my previous project. It combines Angular with a .NET Core Web API.

## Technologies

### Frontend
- **Angular**: Framework for building user interfaces
- **Bootstrap**: Styling and responsive design
- **jQuery**: JavaScript library (used primarily for Bootstrap functionality)
- **FontAwesome**: Icon toolkit
- **SB2-AdminPanel**: CSS library for admin panel design

### Backend
- **WebApi .NET Core v5**: Framework for building APIs
- **Swagger UI**: Tool for testing WebApi methods easily
- **Entity Framework (EF) Core**: Code-first database approach
- **JWT (JSON Web Tokens)**: For secure user authentication

### Database
- **PostgreSQL**: Open source object-relational database system

## Getting Started

### Database Setup

1. **Create the database:**
   - Use the base EF tool provided in JetBrains Rider for PostgreSQL.
   - Run the following commands:
     ```
     add-migration init
     update-database
     ```

2. **Populate the database:**
   - Navigate to `MaintenanceWeb/WebApplication/WebApplication/Data/MaintenanceDatabaseContext.cs`.
   - Uncomment line 16, then create a new migration by running:
     ```
     add-migration appendData
     ```
   - Comment out line 16 again and update the database:
     ```
     update-database
     ```

### Client Application Setup

1. **Install Node Modules:**
   - Navigate to the `ClientApplication` directory.
   - Run `npm install` to install all required node modules.


### Screenshots

Client area
![Screenshot_2021-03-04 Станция техобслуживания(1)](https://user-images.githubusercontent.com/60642588/109949727-60999e00-7ce4-11eb-95dc-1d67fae9ec70.png)

Admin page
![Screenshot_2021-03-04 Станция техобслуживания(2)](https://user-images.githubusercontent.com/60642588/109949726-5f687100-7ce4-11eb-95b3-1599f2ce8861.png)

Charts exapmle
![Screenshot_2021-03-04 Станция техобслуживания(3)](https://user-images.githubusercontent.com/60642588/109949730-61323480-7ce4-11eb-825d-121bde91bf62.png)
