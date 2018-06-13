using Sjogrens.Core.Data.Interfaces.Models;
using Sjogrens.Core.Data.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;

namespace Sjogrens.Core.Data.Models
{
    //[DataContract]
    public class CompleteVisitKeyValue
    {
        public CompleteVisitKeyValue()
        {
            VisitKeyValues = new List<VisitKeyValue>();
        }


        public int VisitHeaderId { get; set; }
        public int VisitId { get; set; }
        public DateTime DateOfVisit { get; set; }
        public string PasId { get; set; }
        public string OrganisationCode { get; set; }
        public bool Completed { get; set; }
        public int CdeaId { get; set; }


        public List<VisitKeyValue> VisitKeyValues { get; set; }

    }
}