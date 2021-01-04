using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CRMall_GabrielArcasa.Models
{
    [Table("clientes")]
    public class Clientes
    {[Key]
        public int id_cliente;

        public string nome_cliente { get; set; }
        public DateTime datanasc_cliente { get; set; }
        public int sexo_cliente { get ; set; }
        public string cep_cliente { get ; set; }
        public string endereco_cliente { get; set; }
        public string numero_cliente { get; set; }
        public string bairro_cliente { get; set; }
        public string estado_cliente { get; set; }
        public string cidade_cliente { get; set; }
    }
}