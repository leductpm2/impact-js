ig.module(
    'templates.common.misc'
).requires(
).defines(function () {
    ig.misc = {
        /**
         * Generate number array with length
         * @param {*} length 
         */
        generateNumberArray: function (length) {
            return Array.from(Array(length).keys());
        },
        removeItem: function (array, item) {
            var index = array.indexOf(item);
            if (index > -1) {
                array.splice(index, 1);
            }
            return array;
        },

        /**
         * Limit number inside from and to
         * @param {*} number 
         * @param {*} from 
         * @param {*} to 
         */
        limitNumber: function (number, from, to) {
            if (number <= from) return from;
            else if (number >= to) return to;
            return number;
        },
    };
});


