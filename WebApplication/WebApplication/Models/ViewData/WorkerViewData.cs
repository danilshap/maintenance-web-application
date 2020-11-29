using Maintenance.Models.MaintenanceEntities;

namespace WebApplication.Models.ViewData
{
    public class WorkerViewData {
        // id работника
        public int Id { get; set; }
        // фамилия работника
        public string Surname { get; set; }
        // имя работника
        public string Name { get; set; }
        // отчество работника
        public string Patronymic { get; set; }
        // паспорт работника
        public string Passport { get; set; }
        // разряд
        public string Discharge { get; set; }
        // опыт работы
        public int WorkExperience { get; set; }
        // статус работника
        public string Status { get; set; }
        // специальность работника
        public string Specialty { get; set; }

        public WorkerViewData(Worker worker, Person person, WorkerStatus status, Specialty specialty)
        {
            Id = worker.Id;
            Surname = person.Surname;
            Name = person.Name;
            Patronymic = person.Patronymic;
            Passport = person.Passport;
            Discharge = worker.Discharge;
            WorkExperience = worker.WorkExperience;
            Status = status.Status;
            Specialty = specialty.Title;
        }
    }
}
