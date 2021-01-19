using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Maintenance.Models.MaintenanceEntities;

namespace WebApplication.Models.ViewData
{
    public class PersonRequestViewData {
        // id
        public int Id { get; set; }
        // имя персоны
        public string Name { get; set; }
        // фамилия персоны
        public string Surname { get; set; }
        // отчество персоны
        public string Patronymic { get; set; }
        // паспорт персоны
        public string Passport { get; set; }
        // телефон персоны
        public string Telephone { get; set; }
        // описание проблемы
        public string DescriptionOfTheProblem { get; set; }
        // статус
        public string Status { get; set; }

        public PersonRequestViewData() { }
        public PersonRequestViewData(PersonRequest personRequest, Person person, PersonRequestStatus personRequestStatus) {
            Id = personRequest.Id;
            Name = person.Name;
            Surname = person.Surname;
            Patronymic = person.Patronymic;
            Passport = person.Passport;
            Telephone = personRequest.TelephoneNumber;
            DescriptionOfTheProblem = personRequest.DescriptionOfTheProblem;
            Status = personRequestStatus.Title;
        }
    }
}
