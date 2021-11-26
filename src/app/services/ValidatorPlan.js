import Plan from '../models/Plan';
import Helper from '../services/Helper'

module.exports = {

    async Plan(obj) {

        let error = 0;
        let details = Array();

        if (!obj.name || obj.name.trim().length < 2 || obj.name.trim().length > 255) {
            error++;
            let detail = {
                field: "name",
                message: "Must a string between 2 and 255 characters."
            }
            details.push(detail);
        }

        if (!obj.description || obj.description.trim().length < 2 || obj.description.trim().length > 255) {
            error++;
            let detail = {
                field: "description",
                message: "Must a string between 2 and 255 characters."
            }
            details.push(detail);
        }

        if (!obj.price || obj.price.length < 1 || obj.price.length > 255) {
            error++;
            let detail = {
                field: "price",
                message: "Must a string between 2 and 255 characters."
            }
            details.push(detail);
        }

        if (error > 0) return details;

        return 0;
    }
}
