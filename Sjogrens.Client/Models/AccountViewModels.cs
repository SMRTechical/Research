using Microsoft.AspNet.Identity.EntityFramework;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web.Mvc;

namespace Sjogrens.Client.Models
{
    public enum Authorised
    {
        True,
        False
    }
    public class ExternalLoginConfirmationViewModel
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }

    public class ExternalLoginListViewModel
    {
        public string ReturnUrl { get; set; }
    }

    public class SendCodeViewModel
    {
        public string SelectedProvider { get; set; }
        public ICollection<System.Web.Mvc.SelectListItem> Providers { get; set; }
        public string ReturnUrl { get; set; }
        public bool RememberMe { get; set; }
    }

    public class VerifyCodeViewModel
    {
        [Required]
        public string Provider { get; set; }

        [Required]
        [Display(Name = "Code")]
        public string Code { get; set; }
        public string ReturnUrl { get; set; }

        [Display(Name = "Remember this browser?")]
        public bool RememberBrowser { get; set; }

        public bool RememberMe { get; set; }
    }

    public class ForgotViewModel
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }

    public class LoginRegisterViewModel
    {
        public LoginViewModel Login { get; set; }
        public RegisterViewModel Register { get; set; }
        public List<IdentityRole> Roles { get; set; }
        public List<ApplicationUser> Users { get; set; }

        //public IEnumerable<IdentityUserClaim> Claims { get; set; }




    }





    public class LoginViewModel
    {
        [Required]
        [Display(Name = "Username")]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [Display(Name = "Remember me?")]
        public bool RememberMe { get; set; }

        [Display(Name = "Email")]
        [EmailAddress]
        public string Email { get; set; }

    }

    public class RegisterViewModel
    {
        [Required]
        [EmailAddress]
        [Display(Name = " NHS Email")]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [System.ComponentModel.DataAnnotations.Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        //stored in Claims
        //public string OrganisationCode { get; set; }
        //public string OrganisationName { get; set; }
        //public bool ActiveInactive { get; set; }
        //public bool Authorised { get; set; }
    }

    public class ResetPasswordViewModel
    {
        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [System.Web.Mvc.Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        public string Code { get; set; }
    }

    public class ForgotPasswordViewModel
    {
        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }



    public class EditUserViewModel
    {
        public EditUserViewModel() { }

        // Allow Initialization with an instance of ApplicationUser:
        public EditUserViewModel(ApplicationUser user)
        {
            this.UserName = user.UserName;
            this.Email = user.Email;

        }

        [Required]
        [Display(Name = "User Name")]
        public string UserName { get; set; }


        [Required]
        public string Email { get; set; }
    }



    public class SelectUserRolesViewModel
    {
        public SelectUserRolesViewModel()
        {
            this.Roles = new List<SelectRoleEditorViewModel>();
        }


        // Enable initialization with an instance of ApplicationUser:
        public SelectUserRolesViewModel(ApplicationUser user)
        {
            this.UserName = user.UserName;

            this.Roles = new List<SelectRoleEditorViewModel>();
            var Db = new ApplicationDbContext();



            // Add all available roles to the list of EditorViewModels:
            var allRoles = Db.Roles;
            foreach (var role in allRoles)
            {
                // An EditorViewModel will be used by Editor Template:
                var rvm = new SelectRoleEditorViewModel(role);
                this.Roles.Add(rvm);
            }

            // Set the Selected property to true for those roles for 
            // which the current user is a member:
            foreach (var userRole in user.Roles)
            {
                var checkUserRole =
                    this.Roles.Find(r => r.RoleId == userRole.RoleId);
                checkUserRole.Selected = true;
            }
        }

        public string UserName { get; set; }
        public List<SelectRoleEditorViewModel> Roles { get; set; }
    }


    public class SelectRoleEditorViewModel
    {
        public SelectRoleEditorViewModel() { }

        public SelectRoleEditorViewModel(IdentityRole role)
        {
            this.RoleName = role.Name;
            this.RoleId = role.Id;

        }

        public bool Selected { get; set; }

        [Required]
        public string RoleName { get; set; }
        [Required]
        public string RoleId { get; set; }

    }

    public class ApplicationClaim //: Claim
    {
        public ApplicationClaim() //: base()
        { }


        public ApplicationClaim(string type, string value) //: base(type,value )
        {
            this.Type = type;
            this.Value = value;
        }
        public virtual string Type { get; set; }
        [Required]
        public virtual string Value { get; set; }
    }


    public class ApplicationCDEA
    {
        public ApplicationCDEA()
        { }


        public ApplicationCDEA(int id, string name)
        {
            this.CDEAId = id;
            this.CDEAName = name;
        }
        public virtual int CDEAId { get; set; }
        public virtual string CDEAName { get; set; }
    }


    public class SelectUserClaimsViewModel
    {
        public SelectUserClaimsViewModel()
        {
            this.Claims = new List<SelectClaimEditorViewModel>();
            this.CDEAList = new List<SelectListItem>();
        }


        // Enable initialization with an instance of ApplicationUser:
        public SelectUserClaimsViewModel(ApplicationUser user)
            : this()
        {
            this.UserName = user.UserName;
            //this.FirstName = user.FirstName;
            // this.LastName = user.LastName;



            // Add all available roles to the list of EditorViewModels:
            var allClaims = user.Claims.OrderBy(c=>c.ClaimType);

           

            foreach (var claim in allClaims)
            {

                ApplicationClaim _applicationClaim = new ApplicationClaim(claim.ClaimType, claim.ClaimValue);

                // An EditorViewModel will be used by Editor Template:
                var cvm = new SelectClaimEditorViewModel(_applicationClaim);
                this.Claims.Add(cvm);
            }

            //this.CDEAList.Add(new SelectListItem() { Value = "-1", Text = "None" });
            this.CDEAList.Add(new SelectListItem() { Value = "1", Text = "Sjogrens" });

        }

        public string UserName { get; set; }

        public List<SelectClaimEditorViewModel> Claims { get; set; }
        public List<SelectListItem> CDEAList { get; set; }
    }





    public class SelectClaimEditorViewModel
    {
        public SelectClaimEditorViewModel() { }

        // Update this to accept an argument of type ApplicationRole:
        public SelectClaimEditorViewModel(ApplicationClaim claim)
        {
            this.Type = claim.Type;

            // Assign the new Descrption property:
            this.Value = claim.Value;
        }

        //public bool Selected { get; set; }

        [Required]
        public string Type { get; set; }

        // Add the new Description property:
        public string Value { get; set; }
    }


    public class AdminViewModel{

        public SelectUserRolesViewModel SelectUserRolesViewModel { get; set; }

        public SelectUserClaimsViewModel SelectUserClaimsViewModel { get; set; }

        public string Message { get; set; }

        public AdminViewModel()
        {
            this.SelectUserRolesViewModel = new SelectUserRolesViewModel();
            this.SelectUserClaimsViewModel = new SelectUserClaimsViewModel();
        }
        public AdminViewModel(ApplicationUser user)
        {

            this.SelectUserRolesViewModel = new SelectUserRolesViewModel(user);
            this.SelectUserClaimsViewModel = new SelectUserClaimsViewModel(user);
        }
    }
}
