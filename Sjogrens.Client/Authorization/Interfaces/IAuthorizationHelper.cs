using System.Threading.Tasks;

namespace Sjogrens.Client.Authorization.Interfaces
{
    public interface IAuthorizationHelper
    {
        string GetUserName();
        string GetUserRole();
        string GetUserOrganisationCode();
        string GetUserOrganisationDescription();
        int GetUserCdeaId();
        bool GetUserAuthorized();
        bool GetUserActive();
        bool IsAdministrator();
        bool IsUpdate();
        bool IsRead();
    }
}