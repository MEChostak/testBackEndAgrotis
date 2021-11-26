import Helper from '../services/Helper'

module.exports = {

    async user(obj) {
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
        if (!obj.password || obj.password.trim().length < 8 || obj.password.trim().length > 255) {
            error++;
            let detail = {
                field: "password",
                message: "Must a string between 8 and 255 characters."
            }
            details.push(detail);
        }
        if (!obj.mail || !Helper.isEmail(obj.mail)) {
            error++;
            let detail = {
                field: "mail",
                message: "Must be a valid e-mail account."
            }
            details.push(detail);
        }

        if (!obj.organizationId) {
            if (!obj.organization.planId) {
                error++;
                let detail = {
                    field: `organization.planId`,
                    message: "This field cannot be blank."
                }
                details.push(detail);
            }
            if (!obj.organization.name) {
                error++;
                let detail = {
                    field: `organization.name`,
                    message: "This field cannot be blank."
                }
                details.push(detail);
            }
            if (!obj.organization.description) {
                error++;
                let detail = {
                    field: `organization.description`,
                    message: "This field cannot be blank."
                }
                details.push(detail);
            }
            if (!obj.organization.paymentStatus) {
                error++;
                let detail = {
                    field: `organization.paymentStatus`,
                    message: "This field cannot be blank."
                }
                details.push(detail);
            }
        }
        
        if (error > 0) return details;

        return 0;
    },

    async userUpdate(obj) {
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

        if (!obj.password || obj.password.trim().length < 8 || obj.password.trim().length > 255) {
            error++;
            let detail = {
                field: "password",
                message: "Must a string between 8 and 255 characters."
            }
            details.push(detail);
        }

        if (!obj.mail || !Helper.isEmail(obj.mail)) {
            error++;
            let detail = {
                field: "mail",
                message: "Must be a valid e-mail account."
            }
            details.push(detail);
        }

        if (!obj.organizationId) {
            error++;
            let detail = {
                field: "organizationId",
                message: "Organization cannot be null."
            }
            details.push(detail);
        }

        if (error > 0) return details;

        return 0;
    },

}