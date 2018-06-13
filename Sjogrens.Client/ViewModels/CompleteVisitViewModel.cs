using Sjogrens.Core.Data.Models;
using Sjogrens.Core.Factories;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace Sjogrens.Client.ViewModels
{
    public class CompleteVisitViewModel:CompleteVisit
    {


     //   public string Token => EncryptionFactory.UrlEncodedEncrypt($"Pid={Pid}&PasId={PasId}&VisitId={VisitId}&Completed={Completed}&InitialVisit={InitialVisit}&NewVisit={NewVisit}&AdvancedSearch={AdvancedSearch}&OrganisationCode={OrganisationCode}&CdeaId={CdeaId}", ConfigurationManager.AppSettings["EncryptionKey"].ToString());


        public Visit LastVisit =>  Visits
                                            .Where(item => item.LastUpdatedDateTime.HasValue)
                                            .OrderByDescending(item => item.LastUpdatedDateTime)
                                            //.Select(item => item.LastUpdatedUser) 
                                            .FirstOrDefault();

      //  public DateTime LastDetailUpdatedDateTime => Details.Where(r => r.LastUpdatedDateTime.HasValue).Max(r => r.LastUpdatedDateTime).Value;
        public Detail LastDetail => Details
                                            .Where(item => item.LastUpdatedDateTime.HasValue)
                                            .OrderByDescending(item => item.LastUpdatedDateTime)
                                            //.Select(item => item.LastUpdatedUser)
                                            .FirstOrDefault();


      //  public DateTime VisitCreatedDateTime => Visits.Where(r => r.CreatedDateTime.HasValue).Min(r => r.CreatedDateTime).Value;
        public Visit FirstVisit => Visits
                                            .Where(item => item.CreatedDateTime.HasValue)
                                            .OrderBy(item => item.CreatedDateTime)
                                           // .Select(item => item.CreatedUser)
                                            .FirstOrDefault();

       // public DateTime DetailCreatedDateTime => Details.Where(r => r.CreatedDateTime.HasValue).Min(r => r.CreatedDateTime).Value;
        public Detail FirstDetail => Details
                                            .Where(item => item.CreatedDateTime.HasValue)
                                            .OrderBy(item => item.CreatedDateTime)
                                            //.Select(item => item.CreatedUser)
                                            .FirstOrDefault();

        public DateTime? LastUpdatedDatetime =>  GetLastUpdatedDatetime()  == -1 ? null : GetLastUpdatedDatetime() == 1 ? LastDetail.LastUpdatedDateTime:LastVisit.LastUpdatedDateTime;
        public string LastUpdatedUser => GetLastUpdatedDatetime() == -1 ? null : GetLastUpdatedDatetime() == 1 ? LastDetail.LastUpdatedUser : LastVisit.LastUpdatedUser;
        public DateTime? CreatedDatetime => GetCreatedDatetime() == -1 ? null : GetCreatedDatetime() == 1 ?  FirstDetail.CreatedDateTime : FirstVisit.CreatedDateTime;
        public string CreatedUser => GetCreatedDatetime() == -1 ? null : GetCreatedDatetime() == 1 ? FirstDetail.CreatedUser : FirstVisit.CreatedUser;


        public int GetLastUpdatedDatetime()
        {
           
            int detail = 1;
            int visit = 2;

            if (LastVisit != null && LastDetail != null)
            {
                DateTime lastVisitUpdatedTime;
                DateTime lastDetailUpdatedTime;

                lastVisitUpdatedTime = LastVisit.LastUpdatedDateTime.Value;
                lastDetailUpdatedTime = LastDetail.LastUpdatedDateTime.Value;

                int result = DateTime.Compare(lastVisitUpdatedTime, lastDetailUpdatedTime);

                if (result > 0)
                    return visit;
                else if (result == 0)
                    return visit;
                else if (result == 2)
                    return detail;
            }
            else if (LastVisit != null && LastDetail == null)
            {
                return visit;
            }
            else if (LastVisit == null && LastDetail != null)
            {
                return detail;
            }
           
                return -1;
           
        }

       
        public int GetCreatedDatetime()
        {

            int detail = 1;
            int visit = 2;

            if (FirstDetail != null && FirstVisit != null)
            {
                DateTime visitCreatedDateTime = FirstVisit.CreatedDateTime.Value;
                DateTime detailCreatedDateTime = FirstDetail.CreatedDateTime.Value;

                int result = DateTime.Compare(visitCreatedDateTime, detailCreatedDateTime);

                if (result < 0)
                    return visit;
                else if (result == 0)
                    return visit;
                else
                    return detail;
            }
            else if (FirstVisit != null && FirstDetail == null)
            {
                return visit;
            }
            else if (FirstVisit == null && FirstDetail != null)
            {
                return detail;
            }

            return -1;

        }




    }
}