using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HREmp.Data.Models
{
    public class Employee
    {
        #region Constructor
        public Employee()
        {

        }
        #endregion

        #region Properties
        /// <summary>
        /// The unique id and primary key for this Employee
        /// </summary>
        [Key]
        [Required]
        public int Id { get; set; }

        /// <summary>
        /// Employee name (in UTF8 format)
        /// </summary>
        public string EmpName { get; set; }

        /// <summary>
        /// Email (in UTF8 format)
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// Address (in UTF8 format)
        /// </summary>
        public string Address { get; set; }

        /// <summary>
        /// Bithday (in DateTime format)
        /// </summary>
        public DateTime DOB { get; set; }

        /// <summary>
        /// Country Id (foreign key)
        /// </summary>
        [ForeignKey("Country")]
        public int CountryId { get; set; }

        /// <summary>
        /// Department Id (foreign key)
        /// </summary>
        [ForeignKey("Department")]
        public int DepartmentId { get; set; }
        #endregion

        #region Navigation Properties
        /// <summary>
        /// The country related to this Employee.
        /// </summary>
        public virtual Country Country { get; set; }

        /// <summary>
        /// The country related to this Employee.
        /// </summary>
        public virtual Department Department { get; set; }
        #endregion
    }
}
