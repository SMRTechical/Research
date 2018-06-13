using Insight.Database.Structure;
using System.Collections.Generic;
using System.Data;
using System.Threading;
using System.Threading.Tasks;

namespace Sjogrens.Data.Insight
{
    public interface IInsightDatabase
    {
        Task<T> QueryAsync<T>(string sql, object parameters, IQueryReader<T> returns, CommandType commandType = CommandType.StoredProcedure, CommandBehavior commandBehavior = CommandBehavior.Default, int? commandTimeout = default(int?), IDbTransaction transaction = null, CancellationToken? cancellationToken = default(CancellationToken?), object outputParameters = null);
        Task<T> SingleAsync<T>(string sql, object parameters, CommandType commandType = CommandType.StoredProcedure, CommandBehavior commandBehavior = CommandBehavior.Default, int? commandTimeout = default(int?), IDbTransaction transaction = null, CancellationToken? cancellationToken = default(CancellationToken?), object outputParameters = null);
        IEnumerable<T> GetReaderAsEnumerable<T>(string sql, object parameters, CommandType commandType = CommandType.StoredProcedure, CommandBehavior commandBehavior = CommandBehavior.Default, int? commandTimeout = default(int?), IDbTransaction transaction = null);
    }
}
