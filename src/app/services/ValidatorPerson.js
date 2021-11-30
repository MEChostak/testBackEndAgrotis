import Helper from '../services/Helper'

module.exports = {

    async person(obj) {
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
        if (!obj.description || obj.description.trim().length < 8 || obj.description.trim().length > 255) {
            error++;
            let detail = {
                field: "description",
                message: "Must a string between 8 and 255 characters."
            }
            details.push(detail);
        }
        if (!obj.birthDate || obj.birthDate.trim().length < 8 || obj.birthDate.trim().length > 255) {
            error++;
            let detail = {
                field: "birthDate",
                message: "Must a string between 8 and 255 characters."
            }
            details.push(detail);
        }
        if (!obj.phone || obj.phone.trim().length < 8 || obj.phone.trim().length > 255) {
            error++;
            let detail = {
                field: "phone",
                message: "Must a string between 8 and 255 characters."
            }
            details.push(detail);
        }
        if (!obj.mail || obj.mail.trim().length < 8 || obj.mail.trim().length > 255) {
            error++;
            let detail = {
                field: "mail",
                message: "Must a string between 8 and 255 characters."
            }
            details.push(detail);
        }
        if (error > 0) return details;

        return 0;
    },


}