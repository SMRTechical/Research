using System.Data;
using System.Threading;
using System.Threading.Tasks;
using Insight.Database.Structure;
using Insight.Database;
using System.Collections.Generic;

namespace Sjogrens.Data.Insight
{
    public class InsightDatabase : IInsightDatabase
    {
        private readonly IDbConnection _connection;

        public InsightDatabase(IDbConnection connection)
        {
            _connection = connection;
        }

        public async Task<T> QueryAsync<T>(string sql, object parameters, IQueryReader<T> returns, CommandType commandType = CommandType.StoredProcedure, CommandBehavior commandBehavior = CommandBehavior.Default, int? commandTimeout = default(int?), IDbTransaction transaction = null, CancellationToken? cancellationToken = default(CancellationToken?), object outputParameters = null)
        {
            return await _connection.QueryAsync(sql, parameters, returns, commandType, commandBehavior, commandTimeout, transaction, cancellationToken, outputParameters);
        }

        public async Task<T> SingleAsync<T>(string sql, object parameters, CommandType commandType = CommandType.StoredProcedure, CommandBehavior commandBehavior = CommandBehavior.Default, int? commandTimeout = default(int?), IDbTransaction transaction = null, CancellationToken? cancellationToken = default(CancellationToken?), object outputParameters = null)
        {
            return await _connection.SingleAsync<T>(sql, parameters, commandType, commandBehavior, commandTimeout, transaction, cancellationToken, outputParameters);
        }

        public IEnumerable<T> GetReaderAsEnumerable<T>(string sql, object parameters, CommandType commandType = CommandType.StoredProcedure, CommandBehavior commandBehavior = CommandBehavior.Default, int? commandTimeout = default(int?), IDbTransaction transaction = null)
        {
            using (var conn = _connection.OpenConnection())
            {
                using (var reader = conn.GetReader(sql, parameters, commandType, commandBehavior, commandTimeout, transaction))
                {
                    foreach (var result in reader.AsEnumerable<T>())
                    {
                        yield return result;
                    }
                }
            }
        }
    }
}