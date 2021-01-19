using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Maintenance.Models.MaintenanceEntities;
using Microsoft.EntityFrameworkCore;
using WebApplication.Data;
using WebApplication.Models.Utils;
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
                .Where(pr => pr.PersonRequestStatus.Title == "Необходимо перезвонить!")
                .Select(pr => new PersonRequestViewData(pr, pr.Person, pr.PersonRequestStatus)).ToList();

        // получение конкретного обращение в сервисный центр
        public PersonRequestViewData PersonRequestViewData(int id) {
            PersonRequest personRequest =
                _context.PersonRequests
                    .Include(pr => pr.Person)
                    .Include(pr => pr.PersonRequestStatus)
                    .FirstOrDefault(pr => pr.Id == id);
            if(personRequest == null) throw new WebApiException("Данное обращение не было найдено");
            return new PersonRequestViewData(personRequest, personRequest.Person, personRequest.PersonRequestStatus);
        }

        // добавление нового обращения
        public async Task AppendPersonRequest(PersonRequestViewData personRequestViewData) {
            Person person = new Person {
                Surname = personRequestViewData.Surname,
                Name = personRequestViewData.Name,
                Patronymic = personRequestViewData.Patronymic,
                Passport = personRequestViewData.Passport
            };

            // проверяем есть ли уже человек с таким паспортом но с другими ФИО. Если есть то мы будем кидать исключение
            if (_context.Persons.Any(p =>
                p.Passport == person.Passport && (p.Surname != person.Surname || p.Patronymic != person.Patronymic ||
                                                  p.Name != person.Name)))
                throw new WebApiException("Человек с таким паспортом уже существует. Проверьте корректность данных");

            // если у нас нет такого человека с такими данными, то мы добавляем его
            if (_context.Persons.Any(p =>
                p.Passport == person.Passport && p.Surname == person.Surname && p.Name == person.Name &&
                p.Patronymic == person.Patronymic || p.Passport != person.Passport))
                await _personProcess.AppendPerson(person);

            PersonRequest personRequest = new PersonRequest {
                PersonId = _context.Persons.First(p => p.Passport == person.Passport).Id,
                PersonRequestStatusId = _context.PersonRequestStatuses.First(prs => prs.Title == "Необходимо перезвонить!").Id,
                DescriptionOfTheProblem = personRequestViewData.DescriptionOfTheProblem,
                TelephoneNumber = personRequestViewData.Telephone
            };

            _context.PersonRequests.Add(personRequest);
            await _context.SaveChangesAsync();
        }

        // изменение заявки на перезвон
        public async Task ChangePersonRequest(int id, string status) {
            // поиск заявки
            PersonRequest personRequest = _context.PersonRequests.FirstOrDefault(pr => pr.Id == id);
            // если ее нет, то мы кидаем исключение
            if(personRequest == null) throw new WebApiException("Данной заявки не существует");
            // поиск статуса для заявки
            PersonRequestStatus personRequestStatus =
                _context.PersonRequestStatuses.FirstOrDefault(prs => prs.Title.Equals(status));
            // если нет такого статуса то мы ругаемся
            if(personRequestStatus == null) throw new WebApiException("Данного статуса не существует");

            // изменяем статус
            personRequest.PersonRequestStatusId = personRequestStatus.Id;
            await _context.SaveChangesAsync();
        }
    }
}
