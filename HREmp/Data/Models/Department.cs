using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace HREmp.Data.Models
{
    public class Department
    {
        #region Constructor
        public Department()
        {

        }
        #endregion

        #region Properties
        /// <summary>
        /// The unique id and primary key for this Department
        /// </summary>
        [Key]
        [Required]
        public int Id { get; set; }

        /// <summary>
        /// Department name (in UTF8 format)
        /// </summary>
        public string Name { get; set; }


        #endregion


        #region Navigation Properties
        /// <summary>
        /// A list containing all the cities related to this Department.
        /// </summary>
        [JsonIgnore]
        public virtual List<Employee> Employees { get; set; }
        #endregion
    }
}
