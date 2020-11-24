using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Maintenance.Models.MaintenanceEntities;

namespace WebApplication.Models.ViewModels
{
    public class ClientViewModel {
        // id клиента
        public int Id { get; set; }
        // фамилия
        public string Surname { get; set; }
        // имя
        public string Name { get; set; }
        // отчество
        public string Patronymic { get; set; }
        // паспорт
        public string Passport { get; set; }
        // дата рождения
        public DateTime DateOfBorn { get; set; }
        // улица проживания
        public string Street { get; set; }
        // дом проживания
        public string Building { get; set; }
        // квартира проживания
        public int Flat { get; set; }

        public ClientViewModel(Client client, Person person, Address address)
        {
            Id = client.Id;
            Surname = person.Surname;
            Name = person.Name;
            Patronymic = person.Patronymic;
            Passport = person.Passport;
            DateOfBorn = client.DateOfBorn;
            Street = address.Street;
            Building = address.Building;
            if (address.Flat != null) Flat = (int) address.Flat;
        }
    }
}
