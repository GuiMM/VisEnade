using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FileHelpers;

namespace DataWorker
{
    class Program
    {
        static void Main(string[] args)
        {
            Dictionary<string, string> states = new Dictionary<string, string> {
                { "11", "RO" },
                { "12", "AC"},
                { "13", "AM"},
                { "14", "RR"},
                { "15", "PA"},
                { "16", "AP"},
                { "17", "TO"},
                { "21", "MA"},
                { "22", "PI"},
                { "23", "CE"},
                { "24", "RN"},
                { "25", "PB"},
                { "26", "PE"},
                { "27", "AL"},
                { "28", "SE"},
                { "29", "BA"},
                { "31", "MG"},
                { "32", "ES"},
                { "33", "RJ"},
                { "35", "SP"},
                { "41", "PR"},
                { "42", "SC"},
                { "43", "RS"},
                { "50", "MS"},
                { "51", "MT"},
                { "52", "GO"},
                { "53", "DF"} };

            Dictionary<string, List<double?>> stateGrades = new Dictionary<string, List<double?>>();
             
            FileHelperEngine<EnadeObject> engine = new FileHelperEngine<EnadeObject>();
            var records = engine.ReadFile("C:\\Users\\leobr\\Dropbox\\UFF\\Visualização de dados\\microdados_enade_2014\\2.DADOS\\microdados_enade_2014_editado.csv");
            foreach (EnadeObject currentRecord in records)
            {
                if (states.ContainsKey(currentRecord.codigoUF))
                {
                    if (stateGrades.ContainsKey(currentRecord.codigoUF))
                        stateGrades[currentRecord.codigoUF].Add(currentRecord.notaGeral);
                    else
                    {
                        stateGrades.Add(currentRecord.codigoUF, new List<double?> { currentRecord.notaGeral });
                    }
                }
            }
        }
    }
}
