using Framework.DataAcess;
using Framework.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Framework.Business
{
    public class ClienteManager
    {
        public int retornoId { get; set; }
        public string retorno { get; set; }
        public List<ClienteModel> GetCliente(ClienteModel model)
        {
            return GenericDA.Get<List<ClienteModel>>(model, "GetCliente");
        }

        public int SetCliente(ClienteModel model)
        {
            try
            {
                if (!ExisteEmail(model))
                {
                    retornoId = GenericDA.Set<int>(model, "SetCliente");
                    retorno = "Dados salvos com sucesso!";
                    return retornoId;
                }
                else
                {
                    retorno = "E-mail já existe!";
                    return 0;
                }
            }
            catch (Exception ex)
            {
                retorno = ex.Message;
                return 0;
            }
        }

        private bool ExisteEmail(ClienteModel model)
        {
            model.DescricaoFiltro = model.Email;
            var data = GetCliente(model);
            if (data.Count > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public int DeleteCliente(ClienteModel model)
        {
            try
            {
                retornoId = GenericDA.Set<int>(model, "DeleteCliente");
                retorno = "Dados excluído com sucesso!";
                return retornoId;
            }
            catch (Exception ex)
            {
                retorno = ex.Message;
                return 0;
            }
        }
    }
}
