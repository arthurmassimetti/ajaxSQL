﻿using Framework.Business;
using Framework.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Web.Mvc.Controllers
{
    public class ClienteController : Controller
    {
        ClienteManager clienteManager = new ClienteManager();
        // GET: Cliente
        public ActionResult Lista(ClienteModel model)
        {

            var data = clienteManager.GetCliente(model);


            return View(data);
        }
        public ActionResult ListaAjax(ClienteModel model)
        {

            return View();
        }

        public ActionResult EditCliente(int clienteId)
        {
            // Lógica para obter os dados do cliente pelo clienteId e exibir o formulário de edição
            return View();
        }

        public ActionResult DeleteCliente(int clienteId)
        {
            // Lógica para obter os dados do cliente pelo clienteId e exibir a confirmação de exclusão
            return View();
        }

        public ActionResult UsuariosCliente(int clienteId)
        {
            // Lógica para obter os usuários relacionados a este cliente pelo clienteId e exibi-los
            return View();
        }
        [HttpPost]
        public JsonResult JsGetCliente(ClienteModel model)
        {
            var data = clienteManager.GetCliente(model);

            return Json(new { data = data, recordsTotal = model.PageSize, recordsFiltered = data?.FirstOrDefault()?.RegCount }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public JsonResult JsSetCliente(ClienteModel model)
        {
            //model.Nome = "teste1";
            //model.Email = "teste@teste.com.br";
            //model.Celular = "1212312121";
            //model.Idade = 10;
            var data = clienteManager.SetCliente(model);

            return Json(new { mensagem = clienteManager.retorno }, JsonRequestBehavior.AllowGet);
            
        
        }
    }
}

