using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataWorker.Models
{
    public class CourseIncomeCountObject
    {
        public string course { get; set; }
        public tpRenda3 incomes { get; set; }

        public CourseIncomeCountObject()
        {
            this.incomes = new tpRenda3();
        }
    }
    public class tpRenda3
    {
        public int a { get; set; }
        public int b { get; set; }
        public int c { get; set; }
        public int d { get; set; }
        public int e { get; set; }
        public int f { get; set; }
        public int g { get; set; }
        public int naoInformado { get; set; }

        public tpRenda3()
        {
            this.a = 0;
            this.b = 0;
            this.c = 0;
            this.d = 0;
            this.e = 0;
            this.f = 0;
            this.g = 0;
            this.naoInformado = 0;
        }
    }
}
