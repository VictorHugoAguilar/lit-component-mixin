import { Validator } from "../validate/Validator.js";

/**
 * @type {FormElementsHaveNoError}
 */
class FormElementsHaveNoErrorImplatation extends Validator {
    /**
     * @type {FormElementsHaveNoError}
     */
    static get validatorName() {
        return "FormElementsHaveNoError";
    }

    /**
     * @param {unknown} [value]
     * @param {string | undefined} [options]
     * @param {{ node: any }} [config]
     */
    // eslint-disable-next-line class-methods-use-this
    execute(value, options, config) {
        const hasError = config?.node._anyFormElementHasFeedbackFor("error");
        return hasError;
    }

    static async getMessage() {
        return "";
    }
}
export const FormElementsHaveNoError = FormElementsHaveNoErrorImplatation;
