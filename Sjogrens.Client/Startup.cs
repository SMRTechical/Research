using Microsoft.Owin;
using Owin;


[assembly: OwinStartupAttribute(typeof(Sjogrens.Client.Startup))]
namespace Sjogrens.Client
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {

            ConfigureAuth(app);

        }
    }
}
