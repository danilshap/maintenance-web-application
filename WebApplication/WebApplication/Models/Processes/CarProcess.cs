using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Maintenance.Models.MaintenanceEntities;
using WebApplication.Data;
using WebApplication.Models.ViewData;

namespace WebApplication.Models.Processes
{
    public class CarProcess {
        private readonly MaintenanceDatabaseContext _context;
        private readonly PersonProcess _personProcess;
        public CarProcess(MaintenanceDatabaseContext context) {
            _context = context;
            _personProcess = new PersonProcess(_context);
        }

        // получить адрес по id
        private Mark GetMark(int id) => _context.Marks.FirstOrDefault(m => m.Id == id);

        // добавить адрес
        private async void AppendMark(Mark mark) {
            _context.Marks.Add(mark);
            await _context.SaveChangesAsync();
        }

        // получить всех клиентов
        public List<CarViewData> GetCarsData() =>
            _context.Cars.Select(c => new CarViewData(c, _personProcess.GetPerson(c.OwnerId), GetMark(c.MarkId))).ToList();

        // получить определенного клиента
        public CarViewData GetCarData(int id) {
            Car result = _context.Cars.FirstOrDefault(p => p.Id == id);
            if (result == null) throw new Exception("Авто не было найдено");
            return new CarViewData(result, _personProcess.GetPerson(result.OwnerId), GetMark(result.MarkId));
        }

        // добавить нового клиента
        public async void AppendCar(CarViewData carViewData) {
            // проверка данных по персоне
            Person person = new Person {
                Surname = carViewData.Surname,
                Name = carViewData.Name,
                Patronymic = carViewData.Patronymic,
                Passport = carViewData.Passport
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
                _personProcess.AppendPerson(person);


            // проверка данных по адресу
            Mark mark = new Mark {
                Title = carViewData.MarkTitle,
                Model = carViewData.MarkModel
            };

            // в случае если мы не нашли такой адрес, то мы просто будем добавлять его
            if (!_context.Marks.Any(m => m.Title == mark.Title && m.Model == mark.Model))
                AppendMark(mark);

            // создание и добавление клиента в БД
            Car car = new Car {
                Color = carViewData.Color,
                StateNumber = carViewData.StateNumber,
                YearOfIssue = carViewData.YearOfIssue,
                OwnerId = _context.Persons.First(p => p.Passport == person.Passport).Id,
                MarkId = _context.Marks.First(m => m.Title == mark.Title && m.Model == mark.Model).Id
            };
            _context.Cars.Add(car);
            await _context.SaveChangesAsync();
        }

        // изменение данных клиента
        public async void ChangeCar(CarViewData carViewData) {
            // получаем клиента для изменения
            Car car = _context.Cars.First(c => c.Id == carViewData.Id);

            if (car == null) throw new Exception("Автомобиль не был найден");

            // создание человека
            Person person = new Person {
                Surname = carViewData.Surname,
                Name = carViewData.Name,
                Patronymic = carViewData.Patronymic,
                Passport = carViewData.Passport
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
                _personProcess.AppendPerson(person);

            car.Color = carViewData.Color;
            car.StateNumber = carViewData.StateNumber;
            car.OwnerId = _context.Persons.First(p => p.Passport == person.Passport).Id;
            await _context.SaveChangesAsync();
        }
    }
}
