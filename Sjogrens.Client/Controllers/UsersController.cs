using System;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Sjogrens.Client.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Collections.Generic;
using Sjogrens.Client.Authorization;

namespace Sjogrens.Client.Controllers
{
    [MvcAuthorize(Roles = "Administrator")]
    public class UsersController : Controller
    {
        ApplicationDbContext context = new ApplicationDbContext();

        //
        // GET: /Roles/
        public ActionResult Index()
        {
            LoginRegisterViewModel m = new LoginRegisterViewModel();

            m.Users = context.Users.ToList();
            return View(m);
        }

       
        //
        // GET: /Roles/Edit/5
        public ActionResult Edit(string Id)
        {
            var thisUser = context.Users.Where(r => r.Id.Equals(Id, StringComparison.CurrentCultureIgnoreCase)).FirstOrDefault();

            List<ApplicationUser> Users = new List<ApplicationUser>();
            Users.Add(thisUser);

            LoginRegisterViewModel m = new LoginRegisterViewModel();

            m.Users = Users;
            return View(m);
        }

        //
        // POST: /Roles/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(LoginRegisterViewModel model)
        {
            try
            {

                ApplicationUser user = model.Users[0];
                context.Entry(user).State = System.Data.Entity.EntityState.Modified;
                context.SaveChanges();

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /Roles/Delete/5
        public ActionResult Delete(string userName)
        {
            var thisUser = context.Users.Where(r => r.UserName.Equals(userName, StringComparison.CurrentCultureIgnoreCase)).FirstOrDefault();
            context.Users.Remove(thisUser);
            context.SaveChanges();
            return RedirectToAction("Index");
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult UpdateClaim(string Id, string ClaimType, string ClaimValue)
        {
            try
            {

                var userStore = new UserStore<ApplicationUser>(context);
                var userManager = new UserManager<ApplicationUser>(userStore);

                var thisUser = context.Users.Where(r => r.Id.Equals(Id, StringComparison.CurrentCultureIgnoreCase)).FirstOrDefault();

                userManager.RemoveClaim(Id, new System.Security.Claims.Claim(ClaimType, ClaimValue));
                userManager.AddClaim(Id, new System.Security.Claims.Claim(ClaimType, ClaimValue));



                //List<ApplicationUser> Users = new List<ApplicationUser>();
                //Users.Add(thisUser);

                //LoginRegisterViewModel m = new LoginRegisterViewModel();

                //m.Users = Users;
                //return View(m);

                //ApplicationUser user = model.Users[0];
                context.Entry(thisUser).State = System.Data.Entity.EntityState.Modified;
                context.SaveChanges();

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }



    }
}
