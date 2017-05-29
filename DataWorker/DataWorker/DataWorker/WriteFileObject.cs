using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FileHelpers;

namespace DataWorker
{
    [DelimitedRecord(";")]
    public class WriteFileObject
    {
        public string state;
        public double average;
        public string course;
        public string income;
    }
}
