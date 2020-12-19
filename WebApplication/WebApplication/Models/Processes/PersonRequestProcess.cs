using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Maintenance.Models.MaintenanceEntities;
using Microsoft.EntityFrameworkCore;
using WebApplication.Data;
using WebApplication.Models.ViewData;

namespace WebApplication.Models.Processes
{
    public class PersonRequestProcess
    {
        private readonly MaintenanceDatabaseContext _context;
        private readonly PersonProcess _personProcess;

        public PersonRequestProcess(MaintenanceDatabaseContext context) {
            _context = context;
            _personProcess = new PersonProcess(context);
        }

        // получение всех запросов клиентов
        public List<PersonRequestViewData> PersonRequestsViewData() =>
            _context.PersonRequests
                .Include(pr => pr.Person)
                .Include(pr => pr.PersonRequestStatus)
                .Select(pr => new PersonRequestViewData(pr, pr.Person, pr.PersonRequestStatus)).ToList();

        // получение конкретного обращение в сервисный центр
        public PersonRequestViewData PersonRequestViewData(int id) {
            PersonRequest personRequest =
                _context.PersonRequests
                    .Include(pr => pr.Person)
                    .Include(pr => pr.PersonRequestStatus)
                    .FirstOrDefault(pr => pr.Id == id);
            if(personRequest == null) throw new Exception("Данное обращение не было найдено");
            return new PersonRequestViewData(personRequest, personRequest.Person, personRequest.PersonRequestStatus);
        }
    }
}
