using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Maintenance.Models.MaintenanceEntities;
using WebApplication.Data;

namespace WebApplication.Models.Processes
{
    public class PersonProcess {
        private readonly MaintenanceDatabaseContext _context;
        public PersonProcess(MaintenanceDatabaseContext context)
        {
            _context = context;
        }

        // получить персону по id
        public Person GetPerson(int id) => _context.Persons.FirstOrDefault(p => p.Id == id);

        // добавить персону
        public async void AppendPerson(Person person)
        {
            _context.Persons.Add(person);
            await _context.SaveChangesAsync();
        }

        // изменение персоны
        public async void ChangePerson(Person person)
        {
            var templPerson = _context.Persons.FirstOrDefault(p => p.Passport == person.Passport);

            if (templPerson == null) throw new Exception("Человека не было найдено");

            templPerson.Surname = person.Surname;
            templPerson.Name = person.Name;
            templPerson.Patronymic = person.Patronymic;

            await _context.SaveChangesAsync();
        }
    }
}
