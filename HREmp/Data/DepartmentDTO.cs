using System.Text.Json.Serialization;

namespace HREmp.Data
{
    public class DepartmentDTO
    {
        public DepartmentDTO() { }

        #region Properties
        public int Id { get; set; }

        public string Name { get; set; }

        #endregion
    }
}
