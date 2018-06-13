namespace Sjogrens.Client.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using System.Threading.Tasks;

    internal sealed class Configuration : DbMigrationsConfiguration<Sjogrens.Client.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
           // ContextKey = "Sjogrens.Client.Models.ApplicationDbContext";
        }

        protected override void Seed(Sjogrens.Client.Models.ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            var userStore = new UserStore<ApplicationUser>(context);
            var userManager = new UserManager<ApplicationUser>(userStore);

            context.Roles.AddOrUpdate(r => r.Name, new IdentityRole { Name = "Administrator" });
            context.Roles.AddOrUpdate(r => r.Name, new IdentityRole { Name = "Update" });
            context.Roles.AddOrUpdate(r => r.Name, new IdentityRole { Name = "Read" });

           ApplicationUser user =  userManager.FindByEmail("Sajid.Riaz@uhb.nhs.uk");
            
            userManager.AddToRole(user.Id, "Administrator");
            context.SaveChanges();

            //if (!context.Users.Any(t=>t.UserName == ))

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
        }
    }
}
