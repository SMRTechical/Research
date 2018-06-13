using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Interfaces.Models
{
    public interface ICategory
    {
        int CategoryId { get; set; }
        string Name { get; set; }
        string HeaderText { get; set; }
        string Description { get; set; }
        string LinkText { get; set; }
        int Sequence { get; set; }
        bool VisitCategory { get; set; }
        int CdeaId { get; set; }
        string OrganisationCode { get; set; }

    }
}
