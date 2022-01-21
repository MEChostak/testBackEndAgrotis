module.exports = {

    async product(obj) {

        const Helper = require('../services/Helper')
        let error = 0;
        let details = Array();

        if (!obj.name || obj.name.trim().length < 2 || obj.name.trim().length > 255) {
            error++;
            let detail = {
                field: "name",
                message: "Must be a string between 2 and 255 characters."
            }
            details.push(detail);
        }

        if (!obj.brand || obj.brand.trim().length > 255) {
            error++;
            let detail = {
                field: "brand",
                message: "Must be a string between 2 and 255 characters."
            }
            details.push(detail);
        }

        if (!obj.type || obj.type.trim().length > 255) {
            error++;
            let detail = {
                field: "type",
                message: "Must be a string between 2 and 255 characters."
            }
            details.push(detail);
        }

        if (!obj.size || obj.size.trim().length > 255) {
            error++;
            let detail = {
                field: "size",
                message: "Must be a string between 2 and 255 characters."
            }
            details.push(detail);
        }

        if (!obj.color || obj.color.trim().length > 255) {
            error++;
            let detail = {
                field: "color",
                message: "Must be a string between 2 and 255 characters."
            }
            details.push(detail);
        }

        if (!obj.description || obj.description.trim().length > 255) {
            error++;
            let detail = {
                field: "description",
                message: "Must be a string between 2 and 255 characters."
            }
            details.push(detail);
        }

        if (!obj.price || obj.price.trim().length < 1 || obj.price.trim().length > 100 || !Helper.isNumeric(obj.price)) {
            error++;
            let detail = {
                field: "price",
                message: "Must be a valid price number."
            }
            details.push(detail);
        }

        if (!obj.quantity || obj.quantity.trim().length < 1 || obj.quantity.trim().length > 100 || !Helper.isNumeric(obj.price)) {
            error++;
            let detail = {
                field: "quantity",
                message: "Must be a valid number."
            }
            details.push(detail);
        }

        if (error > 0) return details;
        return 0;
    }
}