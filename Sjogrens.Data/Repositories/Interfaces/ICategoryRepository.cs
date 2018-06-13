﻿
using Sjogrens.Core.Data.Models;
using Sjogrens.Core.Data.Interfaces.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sjogrens.Core.Data.Interfaces.Params;
using Sjogrens.Core.Data.Params;

namespace Sjogrens.Data.Repositories.Interfaces
{
   public interface ICategoryRepository
    {
        Task<IEnumerable<VisitCategory>> GetCategoriesAsync(CategoryGetParams categoryGetParams);
    }
}
