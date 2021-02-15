using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.Models.ViewData;

namespace WebApplication.Models.Utils
{
    public static class Utils {
        // расчет пределов передачи данных для определенной страницы данных
        public static (int from, int to) GetDataRange(int page, int collectionCount) =>
            (page * 10 - 10, page * 10 >= collectionCount ? collectionCount : page * 10);

        public static List<T> GetPageCollection<T>(List<T> basicCollection, int page) {
            // получение диапазона
            (int from, int to) range = GetDataRange(page, basicCollection.Count);

            var responseList = new List<T>();
            for (int i = range.from; i < range.to; i++) responseList.Add(basicCollection[i]);
            return responseList;
        }
    }
}
