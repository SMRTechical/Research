using Sjogrens.Core.Data.Interfaces.Models;
using Sjogrens.Core.Data.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Models
{
    public class Category : ICategory, IAudit
    {
       public int CategoryId { get; set; }
        public string Name { get; set; }
        public string HeaderText { get; set; }
        public string Description { get; set; }
        public string LinkText { get; set; }
        public int Sequence { get; set; }
        public bool VisitCategory { get; set; }
        public int CdeaId { get; set; }
        public  string OrganisationCode { get; set; }
        public string CreatedUser { get; set; }
        public DateTime? CreatedDateTime { get; set; }
        public string LastUpdatedUser { get; set; }
        public DateTime? LastUpdatedDateTime { get; set; }

    }
}
