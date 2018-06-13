using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Net;

namespace Sjogrens.Core.Factories
{
    public class EncryptionFactory
    {

        static byte[] key = { };
        static readonly byte[] IV = { 0x12, 0x34, 0x56, 0x78, 0x90, 0xab, 0xcd, 0xef };
        //public static string Encrypt(string stringToEncrypt, string SEncryptionKey)
        //{
        //    try
        //    {
        //        key = Encoding.UTF8.GetBytes(Strings.Left(SEncryptionKey, 8));
        //        DESCryptoServiceProvider des = new DESCryptoServiceProvider();
        //        byte[] inputByteArray = Encoding.UTF8.GetBytes(stringToEncrypt);
        //        MemoryStream ms = new MemoryStream();
        //        CryptoStream cs = new CryptoStream(ms, des.CreateEncryptor(key, IV), CryptoStreamMode.Write);
        //        cs.Write(inputByteArray, 0, inputByteArray.Length);
        //        cs.FlushFinalBlock();
        //        return Convert.ToBase64String(ms.ToArray());
        //    }
        //    catch (Exception e)
        //    {
        //        return "";
        //        //Return e.Message
        //    }
        //}


        public static string UrlEncode(string stringToUrlEncode)
        {
            try
            {
                return HttpContext.Current.Server.UrlEncode(stringToUrlEncode);
            }
            catch (Exception ex)
            {
                Elmah.ErrorSignal.FromCurrentContext().Raise(ex);
                return "";
                //TODO: ELMAH
                //return e.Message;
            }
        }

        public static string UrlDecode(string stringToUrlDecode)
        {
            try
            {
                return HttpContext.Current.Server.UrlDecode(stringToUrlDecode);
            }
            catch (Exception ex)
            {

                Elmah.ErrorSignal.FromCurrentContext().Raise(ex);
                return "";
                //TODO: ELMAH
                //return e.Message;
            }
        }


        public static string Encrypt(string stringToEncrypt, string sEncryptionKey)
        {
            try
            {
                key = Encoding.UTF8.GetBytes(sEncryptionKey.Substring(0, 8));
                DESCryptoServiceProvider des = new DESCryptoServiceProvider();
                byte[] inputByteArray = Encoding.UTF8.GetBytes(stringToEncrypt);
                MemoryStream ms = new MemoryStream();
                CryptoStream cs = new CryptoStream(ms,
                  des.CreateEncryptor(key, IV), CryptoStreamMode.Write);
                cs.Write(inputByteArray, 0, inputByteArray.Length);
                cs.FlushFinalBlock();
                return Convert.ToBase64String(ms.ToArray());

            }
            catch (Exception ex)
            {
                Elmah.ErrorSignal.FromCurrentContext().Raise(ex);
                return "";
                //TODO: ELMAH
                //return e.Message;
            }
        }


        public static string Decrypt(string stringToDecrypt, string sEncryptionKey)
        {
            byte[] inputByteArray = new byte[stringToDecrypt.Length + 1];
            try
            {
                key = Encoding.UTF8.GetBytes(sEncryptionKey.Substring(0, 8));
                DESCryptoServiceProvider des = new DESCryptoServiceProvider();
                inputByteArray = Convert.FromBase64String(stringToDecrypt);
                MemoryStream ms = new MemoryStream();
                CryptoStream cs = new CryptoStream(ms,
                  des.CreateDecryptor(key, IV), CryptoStreamMode.Write);
                cs.Write(inputByteArray, 0, inputByteArray.Length);
                cs.FlushFinalBlock();
                Encoding encoding = Encoding.UTF8;
                return encoding.GetString(ms.ToArray());
            }
            catch (Exception ex)
            {
                Elmah.ErrorSignal.FromCurrentContext().Raise(ex);
                return "";
                //TODO:ELMAH
                // return e.Message;
            }
        }



        public static string UrlEncodedEncrypt(string stringToEncrypt, string sEncryptionKey)
        {
            try
            {
                return UrlEncode(Encrypt(stringToEncrypt, sEncryptionKey));
            }
            catch (Exception ex)
            {
                Elmah.ErrorSignal.FromCurrentContext().Raise(ex);
                return "";
                //TODO: ELMAH
                //return e.Message;
            }
        }

        public static string UrlDecodedDecrypt(string stringToEncrypt, string sEncryptionKey)
        {
            try
            {
                return Decrypt(UrlDecode(stringToEncrypt), sEncryptionKey);
            }
            catch (Exception ex)
            {
                
                Elmah.ErrorSignal.FromCurrentContext().Raise(ex);

                return "";
                //TODO: ELMAH
                //return e.Message;
            }
        }



        public static Dictionary<string, string> SplitUnencryptedString(string stringToSplit)
        {
            //Declare variables to find
            string pid = null;
            string pasId = null;
            string sVisitId = null;
            bool completed = false;
            bool initialVisit = false;
            bool newVisit = false;
            bool advancedSearch = false;
            string organisationCode = null;
            string ClientMachineName = null;
            string CdeaId = null;

            //Split Unencrypted String to Retrieve PasId and VisitId
            string[] arrMsgs = stringToSplit.Split('&');
            string[] arrIndMsg = null;
            arrIndMsg = arrMsgs[0].Split('=');
            //Get the pid
            pid = arrIndMsg[1].ToString().Trim();
            arrIndMsg = arrMsgs[1].Split('=');
            //Get the PasId
            pasId = arrIndMsg[1].ToString().Trim();



           if (arrMsgs.Length == 4)
            {


                //TrustCode is 3rd item in query string
                arrIndMsg = arrMsgs[2].Split('=');
                //Get the Trustcode
                organisationCode = arrIndMsg[1].ToString().Trim();

                //CdeaId is 4th item in query string
                arrIndMsg = arrMsgs[3].Split('=');
                //Get the Trustcode
                CdeaId = arrIndMsg[1].ToString().Trim();

            }
            else if (arrMsgs.Length > 4)
            {
                arrIndMsg = arrMsgs[2].Split('=');
                //Get the VisitId
                sVisitId = arrIndMsg[1].ToString().Trim();
                arrIndMsg = arrMsgs[3].Split('=');
                //Get the Completed Status
                bool.TryParse(arrIndMsg[1].ToString().Trim(), out completed);

                arrIndMsg = arrMsgs[4].Split('=');
                //Check if it is the Patient's First Visit
                 bool.TryParse(arrIndMsg[1].ToString().Trim(), out initialVisit);
                arrIndMsg = arrMsgs[5].Split('=');
                //Check if it is a new visit
                // arrIndMsg[1].ToString().Trim();
                bool.TryParse(arrIndMsg[1].ToString().Trim(), out newVisit);
                arrIndMsg = arrMsgs[6].Split('=');
                //Check if it is an advanced search
                advancedSearch = bool.TryParse(arrIndMsg[1].ToString().Trim(), out advancedSearch);
                arrIndMsg = arrMsgs[7].Split('=');
                //Get the patient's trust code
                organisationCode = arrIndMsg[1].ToString().Trim();

                //CdeaId is 4th item in query string
                arrIndMsg = arrMsgs[8].Split('=');
                //Get the Trustcode
                CdeaId = arrIndMsg[1].ToString().Trim();
            }




            //string[] computer_name = null;

            //computer_name = System.Net.Dns.GetHostEntry(Request.ServerVariables("remote_host")).HostName.Split(".") 'this line works from Web Page
            //computer_name = System.Net.Dns.GetHostEntry(HttpContext.Current.Request.ServerVariables["remote_host"]).HostName.Split(Convert.ToChar("."));
            //ClientMachineName = computer_name[0].ToString();
           // System.Environment.MachineName.
            ClientMachineName = "";
            Dictionary<string, string> splitDictionary = new Dictionary<string, string>();
            splitDictionary.Add("Pid", pid);
            splitDictionary.Add("PasId", pasId);
            splitDictionary.Add("VisitId", sVisitId);
            splitDictionary.Add("Completed", completed.ToString());
            splitDictionary.Add("InitialVisit", initialVisit.ToString());
            splitDictionary.Add("NewVisit", newVisit.ToString());
            splitDictionary.Add("AdvancedSearch", advancedSearch.ToString());
            splitDictionary.Add("OrganisationCode", organisationCode);
            splitDictionary.Add("ClientMachineName", ClientMachineName);
            splitDictionary.Add("CdeaId", CdeaId);

            return splitDictionary;
        }
    }
}
