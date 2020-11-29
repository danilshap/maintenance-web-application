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
    public class ClientProcess {
        private readonly MaintenanceDatabaseContext _context;
        public ClientProcess(MaintenanceDatabaseContext context) {
            _context = context;
        }

        // получить персону по id
        private Person GetPerson(int id) => _context.Persons.FirstOrDefault(p => p.Id == id);

        // добавить персону
        private async void AppendPerson(Person person) {
            _context.Persons.Add(person);
            await _context.SaveChangesAsync();
        }

        // изменение персоны
        private async void ChangePerson(Person person){
            var templPerson = _context.Persons.FirstOrDefault(p => p.Passport == person.Passport);
            
            if(templPerson == null) throw new Exception("Человека не было найдено");

            templPerson.Surname = person.Surname;
            templPerson.Name = person.Name;
            templPerson.Patronymic = person.Patronymic;

            await _context.SaveChangesAsync();
        }

        // получить адрес по id
        private Address GetAddress(int id) => _context.Addresses.FirstOrDefault(a => a.Id == id);

        // добавить адрес
        private async void AppendAddress(Address address) {
            _context.Addresses.Add(address);
            await _context.SaveChangesAsync();
        }

        // получить всех клиентов
        public List<ClientViewData> GetClientsData() =>
            _context.Clients.Select(c => new ClientViewData(c, c.Person, c.Address)).ToList();

        // получить определенного клиента
        public ClientViewData GetClientData(int id) {
            Client result = _context.Clients.FirstOrDefault(p => p.Id == id);
            if (result == null) throw new Exception("Клиент не был найден");
            return new ClientViewData(result, GetPerson(result.PersonId), GetAddress(result.AddressId));
        }

        // добавить нового клиента
        public async void AppendClient(ClientViewData clientViewData) {
            // проверка данных по персоне
            Person person = new Person{
                Surname = clientViewData.Surname,
                Name = clientViewData.Name,
                Patronymic = clientViewData.Patronymic,
                Passport = clientViewData.Passport
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
                AppendPerson(person);

            // проверка данных по адресу
            Address address = new Address {
                Building = clientViewData.Building, 
                Street = clientViewData.Street, 
                Flat = clientViewData.Flat
            };

            // в случае если мы не нашли такой адрес, то мы просто будем добавлять его
            if (!_context.Addresses.Any(a =>
                a.Street == address.Street && a.Building == address.Building && a.Flat == address.Flat))
                AppendAddress(address);

            // создание и добавление клиента в БД
            Client client = new Client {
                PersonId = _context.Persons.First(p => p.Passport == person.Passport).Id,
                AddressId = _context.Addresses.First(a => a.Street == address.Street && a.Building == address.Building && a.Flat == address.Flat).Id,
                DateOfBorn = clientViewData.DateOfBorn,
                TelephoneNumber = clientViewData.TelephoneNumber
            };
            _context.Clients.Add(client);
            await _context.SaveChangesAsync();
        }

        // изменение данных клиента
        public async void ChangeClient(ClientViewData clientViewData) {
            // получаем клиента для изменения
            Client client = _context.Clients.First(c => c.Id == clientViewData.Id);

            if(client == null) throw new Exception("Клиента не был найден");

            // создание человека
            Person person = new Person {
                Surname = clientViewData.Surname,
                Name = clientViewData.Name,
                Patronymic = clientViewData.Patronymic,
                Passport = clientViewData.Passport
            }; 
            // изменение данных персоны
            ChangePerson(person);

            Address address = new Address {
                Street = clientViewData.Street,
                Building = clientViewData.Building,
                Flat = clientViewData.Flat
            };
            // добавление нового адреса
            // тут на самом деле очень спорный момент что именно нам делать,
            // менять адрес или добавлять его
            // с одной стороны адрес может измениться только потому что у клиента изменилось место жительство
            // с другой стороны может быть была какая-то опечатка. Поэтому я поставлю добавление, так будет правильнее на мой взгляд
            AppendAddress(address);

            client.TelephoneNumber = clientViewData.TelephoneNumber;
            await _context.SaveChangesAsync();
        }
    }
}
