using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Maintenance.Models.MaintenanceEntities;
using Microsoft.EntityFrameworkCore;
using WebApplication.Data;
using WebApplication.Models.ViewData;

namespace WebApplication.Models.Processes
{
    public class WorkerProcess {
        // доступ к БД
        private readonly MaintenanceDatabaseContext _context;
        // обработка для персоны
        private readonly PersonProcess _personProcess;
        public WorkerProcess(MaintenanceDatabaseContext context) {
            _context = context;
            _personProcess = new PersonProcess(context);
        }

        // получить всех клиентов
        public List<WorkerViewData> GetWorkersData() =>
            _context.Workers.Select(w => new WorkerViewData(w, w.Person, w.Status, w.Specialty)).ToList();

        // получить определенного клиента
        public WorkerViewData GetWorkerData(int id)
        {
            Worker result = _context.Workers.FirstOrDefault(w => w.Id == id);
            if (result == null) throw new Exception("Работник не был найден");
            return new WorkerViewData(result, _context.Persons.First(p => p.Id == result.PersonId),
                _context.WorkerStatuses.First(ws => ws.Id == result.StatusId),
                _context.Specialties.First(s => s.Id == result.SpecialtyId));
        }

        // добавление нового работника
        public async Task AppendWorker(WorkerViewData workerViewData) {
            Person person = new Person {
                Surname = workerViewData.Surname, Name = workerViewData.Name, Patronymic = workerViewData.Patronymic,
                Passport = workerViewData.Passport
            };

            // проверяем есть ли уже человек с таким паспортом но с другими ФИО. Если есть то мы будем кидать исключение
            if (_context.Persons.Any(p =>
                p.Passport == person.Passport && (p.Surname != person.Surname || p.Patronymic != person.Patronymic ||
                                                  p.Name != person.Name)))
                throw new Exception("Человек с таким паспортом уже существует. Проверьте корректность данных");

            // если у нас нет такого человека с такими данными, то мы добавляем его
            if (_context.Persons.Any(p =>
                p.Passport == person.Passport && p.Surname == person.Surname && p.Name == person.Name &&
                p.Patronymic == person.Patronymic || p.Passport != person.Passport))
                await _personProcess.AppendPerson(person);

            // ищем данные о статусе. если мы не находим, то кидаем исклчение
            WorkerStatus status = _context.WorkerStatuses.First(ws => ws.Status == workerViewData.Status);
            if(status == null) throw new Exception("Данный статус не существует. Данные недействительны");

            // ищем специальность. если не находим то кидаем исключение
            Specialty specialty = _context.Specialties.First(s => s.Title == workerViewData.Specialty);
            if(specialty == null) throw new Exception("Данной специальности не существует. Данные недействительны");

            // создание и добавление нового работника
            Worker worker = new Worker {
                // поиск персоны. можно было найти его раньше, но данные могли быть недействительны
                PersonId = _context.Persons.First(p => p.Passport == person.Passport).Id,
                SpecialtyId = specialty.Id,
                StatusId = status.Id,
                WorkExperience = workerViewData.WorkExperience,
                Discharge = workerViewData.Discharge
            };

            _context.Workers.Add(worker);
            await _context.SaveChangesAsync();
        }

        // увольнение работника. по факту - изменение статуса
        public async Task SafeRemoveWorker(int id) {
            // поиск работника. Если мы не нашли его, говорим что работника не существует и что данные некорректны.
            Worker worker = _context.Workers.FirstOrDefault(w => w.Id == id);
            if(worker == null) throw new Exception("Данного работника не существует. Некорректные данные");

            // находим статус работника для изменения. если же нет, то мв ругаемся и говорим чо такого статуса не существует
            WorkerStatus workerStatus = _context.WorkerStatuses.FirstOrDefault(ws => ws.Status == "Уволен");
            if(workerStatus == null) throw new Exception("Статус \"Уволен\" отсутствует. Операция не может быть осуществлена");
            
            // меняем статус и сохраняем изменения
            worker.StatusId = workerStatus.Id;
            await _context.SaveChangesAsync();
        }

        // проверка на существование работника для обработки при добавлении новой заявки на ремонт
        public async Task<bool> isSetWorker(string passport) =>
            await _context.Workers.Include(w => w.Person).AnyAsync(w => w.Person.Passport == passport);
    }
}
