import Helper from '../services/Helper'

module.exports = {

    async table(obj) {
        let error = 0;
        let details = Array();

        if (!obj.mouth || obj.mouth.trim().length < 2 || obj.mouth.trim().length > 255) {
            error++;
            let detail = {
                field: "mouth",
                message: "Must a string between 2 and 255 characters."
            }
            details.push(detail);
        }
        if (!obj.year || obj.year.trim().length < 4  || obj.year.trim().length > 255) {
            error++;
            let detail = {
                field: "year",
                message: "Must a string between 8 and 255 characters."
            }
            details.push(detail);
        }
        if (!obj.value) {
            error++;
            let detail = {
                field: "value",
                message: "Must be a valid value."
            }
            details.push(detail);
        }

        if (error > 0) return details;

        return 0;
    },

}