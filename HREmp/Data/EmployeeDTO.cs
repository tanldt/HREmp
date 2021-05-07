using System;

namespace HREmp.Data
{
    public class EmployeeDTO
    {
        public EmployeeDTO() { }

        public int Id { get; set; }

        public string EmpName { get; set; }

        public string Email { get; set; }

        public string Address { get; set; }

        public DateTime DOB { get; set; }

        public int CountryId { get; set; }

        public string CountryName { get; set; }

        public int DepartmentId { get; set; }

        public string DepartmentName { get; set; }
    }
}
