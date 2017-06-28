using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataWorker.Models
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
            this.a            = 0;
            this.b            = 0;
            this.c            = 0;
            this.d            = 0;
            this.e            = 0;
            this.f            = 0;
            this.g            = 0;
            this.naoInformado = 0;
        }
    }
}
