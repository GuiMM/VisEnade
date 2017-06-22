using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FileHelpers;
using System.IO;
using Newtonsoft.Json;

namespace DataWorker
{
    class Program
    {
        static void Main(string[] args)
        {
            #region Codes to names dictionaries
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

            Dictionary<string, string> courses = new Dictionary<string, string> {
                {"21",  "ARQUITETURA E URBANISMO"},
                {"72",  "TECNOLOGIA EM ANÁLISE E DESENVOLVIMENTO DE SISTEMAS"},
                {"73",  "TECNOLOGIA EM AUTOMAÇÃO INDUSTRIAL"},
                {"76",  "TECNOLOGIA EM GESTÃO DA PRODUÇÃO INDUSTRIAL"},
                {"79",  "TECNOLOGIA EM REDES DE COMPUTADORES"},
                {"701", "MATEMÁTICA(BACHARELADO)"},
                {"702", "MATEMÁTICA(LICENCIATURA)"},
                {"903", "LETRAS - PORTUGUÊS(BACHARELADO)"},
                {"904", "LETRAS - PORTUGUÊS(LICENCIATURA)"},
                {"905", "LETRAS - PORTUGUÊS E INGLÊS(LICENCIATURA)"},
                {"906", "LETRAS - PORTUGUÊS E ESPANHOL(LICENCIATURA)"},
                {"1401", "FÍSICA(BACHARELADO)"},
                {"1402", "FÍSICA(LICENCIATURA)"},
                {"1501", "QUÍMICA(BACHARELADO)"},
                {"1502", "QUÍMICA(LICENCIATURA)"},
                {"1601", "CIÊNCIAS BIOLÓGICAS(BACHARELADO)"},
                {"1602", "CIÊNCIAS BIOLÓGICAS(LICENCIATURA)"},
                {"2001", "PEDAGOGIA(LICENCIATURA)"},
                {"2401", "HISTÓRIA(BACHARELADO)"},
                {"2402", "HISTÓRIA(LICENCIATURA)"},
                {"2501", "ARTES VISUAIS(LICENCIATURA)"},
                {"3001", "GEOGRAFIA(BACHARELADO)"},
                {"3002", "GEOGRAFIA(LICENCIATURA)"},
                {"3201", "FILOSOFIA(BACHARELADO)"},
                {"3202", "FILOSOFIA(LICENCIATURA)"},
                {"3502", "EDUCAÇÃO FÍSICA(LICENCIATURA)"},
                {"4004", "CIÊNCIA DA COMPUTAÇÃO(BACHARELADO)"},
                {"4005", "CIÊNCIA DA COMPUTAÇÃO(LICENCIATURA)"},
                {"4006", "SISTEMAS DE INFORMAÇÃO"},
                {"4301", "MÚSICA(LICENCIATURA)"},
                {"5401", "CIÊNCIAS SOCIAIS(BACHARELADO)"},
                {"5402", "CIÊNCIAS SOCIAIS(LICENCIATURA)"},
                {"5710", "ENGENHARIA CIVIL"},
                {"5806", "ENGENHARIA ELÉTRICA"},
                {"5809", "ENGENHARIA DE COMPUTAÇÃO"},
                {"5814", "ENGENHARIA DE CONTROLE E AUTOMAÇÃO"},
                {"5902", "ENGENHARIA MECÂNICA"},
                {"6008", "ENGENHARIA QUÍMICA"},
                {"6009", "ENGENHARIA DE ALIMENTOS"},
                {"6208", "ENGENHARIA DE PRODUÇÃO"},
                {"6306", "ENGENHARIA"},
                {"6307", "ENGENHARIA AMBIENTAL"},
                {"6405", "ENGENHARIA FLORESTAL"}
            };

            Dictionary<string, string> incomes = new Dictionary<string, string> {
                {"a", "Até 1,5 salário mínimo" },
                {"b", "De 1,5 a 3 salários mínimos" },
                {"c", "De 3 a 4,5 salários mínimos" },
                {"d", "De 4,5 a 6 salários mínimos" },
                {"e", "De 6 a 10 salários mínimos" },
                {"f", "De 10 a 30 salários mínimos" },
                {"g", "Acima de 30 salários mínimos" },
                {"",  "Não Informado" }
            };
            #endregion

            Dictionary<string, List<double>> stateGrades                            = new Dictionary<string, List<double>>();
            Dictionary<string, Dictionary<string, List<double>>> courseIncomeGrades = new Dictionary<string, Dictionary<string, List<double>>>();
            Dictionary<string, Dictionary<string, Dictionary<string,List<double>>>> courseStateIncomeGrades = new Dictionary<string, Dictionary<string, Dictionary<string,List<double>>>>();

            FileHelperEngine<EnadeObject> readEngine = new FileHelperEngine<EnadeObject>();
            int count = 1;
            Console.WriteLine("Reading file and coverting to object");

            var records = readEngine.ReadFile("C:\\Users\\leobr\\Dropbox\\UFF\\Visualização de dados\\microdados_enade_2014\\2.DADOS\\microdados_enade_2014_editado.csv");
            foreach (EnadeObject currentRecord in records)
            {
                Console.WriteLine("Getting record " + count + " from " + records.Length);
                
                // Filling state/grades dictionary
                if (stateGrades.ContainsKey(currentRecord.codigoUF))
                {
                    if (!String.IsNullOrWhiteSpace(currentRecord.notaGeral))
                        stateGrades[currentRecord.codigoUF].Add(Double.Parse(currentRecord.notaGeral) / 10);
                }
                else
                {
                    if (!String.IsNullOrWhiteSpace(currentRecord.notaGeral))
                        stateGrades.Add(currentRecord.codigoUF, new List<double> { Double.Parse(currentRecord.notaGeral) / 10 });
                    else
                        stateGrades.Add(currentRecord.codigoUF, new List<double>());
                }
                    

                //Filling course/income/grades dictionary
                if (courseIncomeGrades.ContainsKey(currentRecord.codigoCurso))
                {
                    if (courseIncomeGrades[currentRecord.codigoCurso].ContainsKey(currentRecord.faixaDeRenda))
                    {
                        if (!String.IsNullOrWhiteSpace(currentRecord.notaGeral))
                            courseIncomeGrades[currentRecord.codigoCurso][currentRecord.faixaDeRenda].Add(Double.Parse(currentRecord.notaGeral) / 10);
                    }
                    else
                    {
                        if (!String.IsNullOrWhiteSpace(currentRecord.notaGeral))
                            courseIncomeGrades[currentRecord.codigoCurso].Add(currentRecord.faixaDeRenda, new List<double> { Double.Parse(currentRecord.notaGeral) / 10 });
                        else
                            courseIncomeGrades[currentRecord.codigoCurso].Add(currentRecord.faixaDeRenda, new List<double>());
                    }
                }
                else
                {
                    courseIncomeGrades.Add(currentRecord.codigoCurso, new Dictionary<string, List<double>>());
                    if (!String.IsNullOrWhiteSpace(currentRecord.notaGeral))
                        courseIncomeGrades[currentRecord.codigoCurso].Add(currentRecord.faixaDeRenda, new List<double> { Double.Parse(currentRecord.notaGeral) / 10 });
                    else
                        courseIncomeGrades[currentRecord.codigoCurso].Add(currentRecord.faixaDeRenda, new List<double>());
                }

                //Filling course/state/gender/income/grades dictionary
                if (courseStateIncomeGrades.ContainsKey(currentRecord.codigoCurso))
                {
                    
                    if (courseStateIncomeGrades[currentRecord.codigoCurso].ContainsKey(currentRecord.codigoUF))
                    {
                        //If have all keys insert grade
                        if (courseStateIncomeGrades[currentRecord.codigoCurso][currentRecord.codigoUF].ContainsKey(currentRecord.faixaDeRenda))
                        {
                            if (!String.IsNullOrWhiteSpace(currentRecord.notaGeral))
                                courseStateIncomeGrades[currentRecord.codigoCurso][currentRecord.codigoUF][currentRecord.faixaDeRenda].Add(Double.Parse(currentRecord.notaGeral) / 10);
                        }
                        else
                        {
                            if (!String.IsNullOrWhiteSpace(currentRecord.notaGeral))
                                courseStateIncomeGrades[currentRecord.codigoCurso][currentRecord.codigoUF].Add(currentRecord.faixaDeRenda, new List<double> { Double.Parse(currentRecord.notaGeral) / 10 });
                            else
                                courseStateIncomeGrades[currentRecord.codigoCurso][currentRecord.codigoUF].Add(currentRecord.faixaDeRenda, new List<double> ());
                        }
                    }
                    else
                    {
                        // If don't have codigo uf key
                        courseStateIncomeGrades[currentRecord.codigoCurso].Add(currentRecord.codigoUF, new Dictionary<string, List<double>>());

                        if (!String.IsNullOrWhiteSpace(currentRecord.notaGeral))
                            courseStateIncomeGrades[currentRecord.codigoCurso][currentRecord.codigoUF].Add(currentRecord.faixaDeRenda, new List<double> { Double.Parse(currentRecord.notaGeral) / 10 });
                        else
                            courseStateIncomeGrades[currentRecord.codigoCurso][currentRecord.codigoUF].Add(currentRecord.faixaDeRenda, new List<double>());
                    }
                }
                else
                {
                    // If don't have any key
                    courseStateIncomeGrades.Add(currentRecord.codigoCurso, new Dictionary<string, Dictionary<string, List<double>>>());
                    courseStateIncomeGrades[currentRecord.codigoCurso].Add(currentRecord.codigoUF, new Dictionary<string, List<double>>());

                    if (!String.IsNullOrWhiteSpace(currentRecord.notaGeral))
                        courseStateIncomeGrades[currentRecord.codigoCurso][currentRecord.codigoUF].Add(currentRecord.faixaDeRenda, new List<double> { Double.Parse(currentRecord.notaGeral) / 10 });
                    else
                        courseStateIncomeGrades[currentRecord.codigoCurso][currentRecord.codigoUF].Add(currentRecord.faixaDeRenda, new List<double>());
                }

                count++;
            }

            Console.WriteLine("Writing files");
            //#region CSV FILES

            ////Writing Files
            //List<WriteFileObject> stateGradesRecords        = new List<WriteFileObject>();
            //List<WriteFileObject> courseIncomeGradesRecords = new List<WriteFileObject>();
            //WriteFileObject record;
            //double gradesSum = 0;

            //FileHelperEngine<WriteFileObject> writeEngine = new FileHelperEngine<WriteFileObject>();

            //// States/grades file
            //foreach (string currentState in stateGrades.Keys)
            //{
            //    record = new WriteFileObject();
            //    gradesSum = 0;

            //    // Changing states codes to names, to write the file
            //    if (states.ContainsKey(currentState))
            //    {
            //        record.state = states[currentState];
            //    }
            //    else
            //    {
            //        Console.WriteLine("Estado não encontrado na lista");
            //        continue;
            //    }

            //    // Calculating average grade
            //    foreach (double currentGrade in stateGrades[currentState])
            //    {
            //        gradesSum += currentGrade; 
            //    }
            //    record.average = Math.Round((gradesSum / stateGrades[currentState].Count), 2);
                
            //    stateGradesRecords.Add(record);
            //}

            //writeEngine.WriteFile("C:\\Projetos\\UFF\\VisEnade\\DataWorker\\DataWorker\\DataWorker\\Output\\StatesGrades.csv", stateGradesRecords);

            //// Course/Income/Grades file
            //foreach(string currentCourse in courseIncomeGrades.Keys)
            //{
            //    foreach(string currentIncome in courseIncomeGrades[currentCourse].Keys)
            //    {
            //        record = new WriteFileObject();
            //        gradesSum = 0;

            //        // Changing courses and incomes codes to names, to write the file
            //        if (courses.ContainsKey(currentCourse))
            //        {
            //             record.course = courses[currentCourse];
            //        }
            //        else
            //        {
            //            Console.WriteLine("Curso não encontrado na lista");
            //            continue;
            //        }

            //        if (incomes.ContainsKey(currentIncome))
            //        {
            //            record.income = incomes[currentIncome]; 
            //        }
            //        else
            //        {
            //            Console.WriteLine("Faixa de renda não encontrada na lista");
            //            continue;
            //        }

            //        // Calculating average grade
            //        foreach(double currentGrade in courseIncomeGrades[currentCourse][currentIncome])
            //        {
            //            gradesSum += currentGrade;
            //        }
            //        record.average = Math.Round((gradesSum / courseIncomeGrades[currentCourse][currentIncome].Count),2);

            //        courseIncomeGradesRecords.Add(record);
            //    }
            //}

            //writeEngine.WriteFile("C:\\Projetos\\UFF\\VisEnade\\DataWorker\\DataWorker\\DataWorker\\Output\\CourseIncomeGrades.csv", courseIncomeGradesRecords);
            //#endregion

            #region JSON FILES

            CourseIncomeObject ciObj;

            //StreamWriter sw = new StreamWriter("C:\\Projetos\\UFF\\VisEnade\\DataWorker\\DataWorker\\DataWorker\\Output\\courseIncomeGrade.json");
            //// Course/Income/Grades file
            //foreach (string currentCourse in courseIncomeGrades.Keys)
            //{
            //    ciObj = new CourseIncomeObject();
            //
            //    foreach (string currentIncome in courseIncomeGrades[currentCourse].Keys)
            //    {
            //        gradesSum = 0;
            //
            //        // Changing courses codes to names, to write the file
            //        if (courses.ContainsKey(currentCourse))
            //        {
            //            ciObj.course = courses[currentCourse];
            //        }
            //        else
            //        {
            //            Console.WriteLine("Curso não encontrado na lista");
            //            continue;
            //        }
            //
            //        switch (currentIncome)
            //        {
            //            case "a":
            //                ciObj.incomes.a = CalculateAvgGrade(courseIncomeGrades, currentCourse, currentIncome);
            //                break;
            //            case "b":
            //                ciObj.incomes.b = CalculateAvgGrade(courseIncomeGrades, currentCourse, currentIncome);
            //                break;
            //            case "c":
            //                ciObj.incomes.c = CalculateAvgGrade(courseIncomeGrades, currentCourse, currentIncome);
            //                break;
            //            case "d":
            //                ciObj.incomes.d = CalculateAvgGrade(courseIncomeGrades, currentCourse, currentIncome);
            //                break;
            //            case "e":
            //                ciObj.incomes.e = CalculateAvgGrade(courseIncomeGrades, currentCourse, currentIncome);
            //                break;
            //            case "f":
            //                ciObj.incomes.f = CalculateAvgGrade(courseIncomeGrades, currentCourse, currentIncome);
            //                break;
            //            case "g":
            //                ciObj.incomes.g = CalculateAvgGrade(courseIncomeGrades, currentCourse, currentIncome);
            //                break;
            //            default:
            //                ciObj.incomes.naoInformado = CalculateAvgGrade(courseIncomeGrades, currentCourse, currentIncome);
            //                break;
            //        }
            //    }
            //
            //    //Writting on file
            //    sw.WriteLine(JsonConvert.SerializeObject(ciObj));
            //    sw.Flush();
            //}
            //
            //sw.Close();

            CourseStateIncomeObject csiObj;

            StreamWriter sw2 = new StreamWriter("C:\\Projetos\\UFF\\VisEnade\\DataWorker\\DataWorker\\DataWorker\\Output\\courseStateIncomeGrade.json");
            
            // Course/Income/Grades file
            foreach (string currentCourse in courseStateIncomeGrades.Keys)
            {
                foreach (string currentState in courseStateIncomeGrades[currentCourse].Keys)
                {
                    csiObj = new CourseStateIncomeObject();
                    foreach (string currentIncome in courseStateIncomeGrades[currentCourse][currentState].Keys)
                    {
                        
                        // Changing courses codes to names, to write the file
                        if (courses.ContainsKey(currentCourse))
                        {
                            csiObj.course = courses[currentCourse];
                        }
                        else
                        {
                            Console.WriteLine("Curso não encontrado na lista");
                            continue;
                        }

                        if (states.ContainsKey(currentState))
                        {
                            csiObj.state = states[currentState];
                        }
                        else
                        {
                            Console.WriteLine("Estado não encontrado na lista");
                            continue;
                        }

                        switch (currentIncome)
                        {
                            case "a":
                                csiObj.incomes.a = CalculateCourseStateAvgGrade(courseStateIncomeGrades, currentCourse, currentState, currentIncome);
                                break;
                            case "b":
                                csiObj.incomes.b = CalculateCourseStateAvgGrade(courseStateIncomeGrades, currentCourse, currentState, currentIncome);
                                break;
                            case "c":
                                csiObj.incomes.c = CalculateCourseStateAvgGrade(courseStateIncomeGrades, currentCourse, currentState, currentIncome);
                                break;
                            case "d":
                                csiObj.incomes.d = CalculateCourseStateAvgGrade(courseStateIncomeGrades, currentCourse, currentState, currentIncome);
                                break;
                            case "e":
                                csiObj.incomes.e = CalculateCourseStateAvgGrade(courseStateIncomeGrades, currentCourse, currentState, currentIncome);
                                break;
                            case "f":
                                csiObj.incomes.f = CalculateCourseStateAvgGrade(courseStateIncomeGrades, currentCourse, currentState, currentIncome);
                                break;
                            case "g":
                                csiObj.incomes.g = CalculateCourseStateAvgGrade(courseStateIncomeGrades, currentCourse, currentState, currentIncome);
                                break;
                            default:
                                csiObj.incomes.naoInformado = CalculateCourseStateAvgGrade(courseStateIncomeGrades, currentCourse, currentState, currentIncome);
                                break;
                        }
                    }
                    //Writting on file
                    sw2.WriteLine(JsonConvert.SerializeObject(csiObj));
                    sw2.Flush();
                }
            }

            sw2.Close();
            #endregion

            Console.WriteLine("Arquivos finalizados");
        }

        public static double CalculateAvgGrade(Dictionary<string, Dictionary<string, List<double>>> courseIncomeGrades, string currentCourse, string currentIncome)
        {
            double gradesSum = 0;
            
            // Calculating average grade
            foreach (double currentGrade in courseIncomeGrades[currentCourse][currentIncome])
            {
                gradesSum += currentGrade;
            }

            return Math.Round((gradesSum / courseIncomeGrades[currentCourse][currentIncome].Count), 2);
        }

        public static double CalculateCourseStateAvgGrade(Dictionary<string, Dictionary<string, Dictionary<string, List<double>>>> courseStateIncomeGrades, string currentCourse, string currentState, string currentIncome)
        {
            double gradesSum = 0;

            // Calculating average grade
            foreach (double currentGrade in courseStateIncomeGrades[currentCourse][currentState][currentIncome])
            {
                gradesSum += currentGrade;
            }

            return Math.Round((gradesSum / courseStateIncomeGrades[currentCourse][currentState][currentIncome].Count), 2);
        }
    }
}
