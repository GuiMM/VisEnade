using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataWorker.Models
{
    public class StateCourseGradeObject
    {
        public string state { get; set; }
        public string course { get; set; }
        public double grade { get; set; }

        public StateCourseGradeObject()
        {
            this.grade = 0;
        }
    }
}
