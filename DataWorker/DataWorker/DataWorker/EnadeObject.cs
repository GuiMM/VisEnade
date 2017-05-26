using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FileHelpers;

namespace DataWorker
{
    [DelimitedRecord(";")]
    public class EnadeObject
    {
        public string codigoCurso;
        public string tipoDeOrganizacao;
        public string codigoMunicipio;
        public string codigoUF;
        public string codigoRegiao;
        public string idadeAluno;
        public string sexo;
        public string anoFimSegundoGrau;
        public string inicioGrad;
        public string semestreDeGrad;
        public string statusDoAluno; //Regular ou irregular
        public string tipoDeInscricao; // Ingressante ou concluinte
        public string tipoDePresenca;
        public string notaConhecimentosGerais;
        public string notaConhecimentosEspecificos;
        [FieldConverter(ConverterKind.Double)]
        public double? notaGeral;
        public string faixaDeRenda;

    }
}
