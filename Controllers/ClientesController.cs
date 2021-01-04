using MySqlConnector;
using System;
using System.Configuration;
using System.Data;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CRMall_GabrielArcasa.Controllers
{
    public class ClientesController : ApiController
    {
        public int LastId { get { return 1; } }
        private static MySqlConnection conn = null;
        public static MySqlConnection Conn()
        {
            string conn_string = "server=localhost;port=3306;database=crmall_test;uid=Gabriel;password=250388;";

            if (conn != null)
                conn = new MySqlConnection(conn_string);

            return conn;
        }

        public HttpResponseMessage Get()
        {
            string query = @"SELECT * FROM crmall_test.cliente;";
            DataTable table = new DataTable();
            using (var con = new MySqlConnection(ConfigurationManager.ConnectionStrings["crmall_test"].ConnectionString))
            using (var cmd = new MySqlCommand(query, con))
            using (var da = new MySqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, table);
        }


        public string Post(Models.Clientes cli)
        {
            try
            {
                string query = String.Format(@"INSERT INTO `crmall_test`.`cliente`
                                                (
                                                nome_cliente,
                                                datanasc_cliente,
                                                sexo_cliente,
                                                cep_cliente,
                                                endereco_cliente,
                                                numero_cliente,
                                                bairro_cliente,
                                                estado_cliente,
                                                cidade_cliente)
                                                VALUES
                                                ('{0}','{1}',{2},'{3}','{4}','{5}','{6}','{7}','{8}'
                                                );" ,cli.nome_cliente, cli.datanasc_cliente.ToString("yyyy/MM/dd"), cli.sexo_cliente, cli.cep_cliente ?? string.Empty, cli.endereco_cliente ?? string.Empty, cli.numero_cliente ?? string.Empty, cli.bairro_cliente ?? string.Empty, cli.estado_cliente ?? string.Empty, cli.cidade_cliente ?? string.Empty);

                DataTable table = new DataTable();
                using (var con = new MySqlConnection(ConfigurationManager.ConnectionStrings["crmall_test"].ConnectionString))
                using (var cmd = new MySqlCommand(query, con))
                using (var da = new MySqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                return "Added Successfully";
            }
            catch (Exception e)
            {
                return "Falha em Adicionar : " + e.Message;
            }
        }
        public string Put(Models.Clientes cli)
        {
            try
            {
                string query = String.Format(@"UPDATE `crmall_test`.`cliente`
                                                SET
                                                nome_cliente = '{1}',
                                                datanasc_cliente = '{2}' ,
                                                sexo_cliente = {3},
                                                cep_cliente = '{4}',
                                                endereco_cliente = '{5}',
                                                numero_cliente = '{6}',
                                                bairro_cliente = '{7}',
                                                estado_cliente = '{8}',
                                                cidade_cliente = '{9}'
                                                Where id_cliente = {0}",
                                                cli.id_cliente,
                                                cli.nome_cliente,
                                                cli.datanasc_cliente,
                                                cli.sexo_cliente,
                                                cli.cep_cliente,
                                                cli.endereco_cliente,
                                                cli.numero_cliente,
                                                cli.bairro_cliente,
                                                cli.estado_cliente,
                                                cli.cidade_cliente);

                DataTable table = new DataTable();
                using (var con = new MySqlConnection(ConfigurationManager.ConnectionStrings["crmall_test"].ConnectionString))
                using (var cmd = new MySqlCommand(query, con))
                using (var da = new MySqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                return "Alterado com Sucesso";
            }
            catch (Exception e)
            {
                return "Falha em Alterar : " + e.Message;
            }
        }
        public string Delete(int id)
        {
            try
            {
                string query = String.Format(@"Delete from `crmall_test`.`cliente`
                                                Where id_cliente = {0}", id);

                DataTable table = new DataTable();
                using (var con = new MySqlConnection(ConfigurationManager.ConnectionStrings["crmall_test"].ConnectionString))
                using (var cmd = new MySqlCommand(query, con))
                using (var da = new MySqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                return "Deletado com sucesso Successo";
            }
            catch (Exception e)
            {
                return "Falha em Deletar  : " + e.Message;
            }
        }
    }
}
