using Maintenance.Models.MaintenanceEntities;

namespace WebApplication.Models.ViewData
{
    public class CarViewData {
        // id машины
        public int Id { get; set; }
        // гос. номер автомобиля
        public string StateNumber { get; set; }
        // цвет автомобиля
        public string Color { get; set; }
        // год выпуска авто`
        public int YearOfIssue { get; set; }
        // марка автомобиля
        public string MarkTitle { get; set; }
        // модель автомобиля
        public string MarkModel { get; set; }
        // фамилия владельца
        public string Surname { get; set; }
        // имя владельца
        public string Name { get; set; }
        // отчество владельца
        public string Patronymic { get; set; }
        // паспорт владельца
        public string Passport { get; set; }

        public CarViewData(Car car, Person person, Mark mark) {
            Id = car.Id;
            StateNumber = car.StateNumber;
            Color = car.Color;
            YearOfIssue = car.YearOfIssue;
            MarkTitle = mark.Title;
            MarkModel = mark.Model;
            Surname = person.Surname;
            Name = person.Name;
            Patronymic = person.Patronymic;
            Passport = person.Passport;
        }
    }
}
