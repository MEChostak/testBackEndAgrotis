import Organization from '../models/Organization';
import Helper from '../services/Helper'

module.exports = {

    async Organization(obj) {
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
        if (!obj.paymentStatus) {
            error++;
            let detail = {
                field: "paymentStatus",
                message: "This field cannot be blank."
            }
            details.push(detail);
        }
        // if (!obj.userTest) {
        //     error++;
        //     let detail = {
        //         field: "userTest",
        //         message: "This field cannot be blank."
        //     }
        //     details.push(detail);
        // }
        // if (!obj.planId) {
        //     error++;
        //     let detail = {
        //         field: "planId",
        //         message: "This field cannot be blank."
        //     }
        //     details.push(detail);
        // }


        if (error > 0) return details;

        return 0;
    },

}