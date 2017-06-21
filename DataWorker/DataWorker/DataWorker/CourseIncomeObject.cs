using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataWorker
{
    public class CourseIncomeObject
    {
        public string course   { get; set; }
        public tpRenda incomes { get; set; }

        public CourseIncomeObject()
        {
            this.incomes = new tpRenda();
        }

    }

    public class tpRenda {
        public double a { get; set; }
        public double b { get; set; }
        public double c { get; set; }
        public double d { get; set; }
        public double e { get; set; }
        public double f { get; set; }
        public double g { get; set; }
        public double naoInformado { get; set; }

        public tpRenda()
        {
            this.a            = -1;
            this.b            = -1;
            this.c            = -1;
            this.d            = -1;
            this.e            = -1;
            this.f            = -1;
            this.g            = -1;
            this.naoInformado = -1;
        }
    }
}
