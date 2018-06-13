﻿using Sjogrens.Core.Data.Interfaces.Models;
using Sjogrens.Core.Data.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Models
{
    public class VisitKeyValue : IVisitKeyValue
    {
        public int VisitHeaderId { get; set; }
        public int CategoryId { get; set; }
        public int SectionId { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }
        public string CreatedUser { get; set; }
        public DateTime? CreatedDateTime { get; set; }
        public string LastUpdatedUser { get; set; }
        public DateTime? LastUpdatedDateTime { get; set; }

    }
}
