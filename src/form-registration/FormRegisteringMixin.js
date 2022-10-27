import { dedupeMixin } from "@open-wc/dedupe-mixin";
/**
 * #FormRegisteringMixin:
 *
 * This Mixin registers a form element to a Registrar
 *
 * @type {FormRegisteringMixin}
 * @param superclass
 */
const FormRegisteringMixinImplementation = (superclass) =>
    /**
     * @type {FormRegisteringMixin}
     */
    class FormRegisteringMixin extends superclass {
        constructor() {
            super();
            /**
             * The registrar this FormControl registers to, Usually a descendant of FormGroup or
             * ChoiceGroup
             * @type {FormRegistrarHost | undefined}
             */
            this._parentFormGroup = undefined;
        }

        connectedCallback() {
            super.connectedCallback();
            this.dispatchEvent(
                new CustomEvent("form-element-register", {
                    detail: { element: this },
                    bubbles: true,
                })
            );
        }

        disconnectedCallback() {
            super.disconnectedCallback();
            this.__unregisterFormElement();
        }

        /**
         * Putting this in a separate method makes testing easier
         * @private
         */
        __unregisterFormElement() {
            if (this._parentFormGroup) {
                this._parentFormGroup.removeFormElement(
                    /** @type {* & FormRegisteringHost} */ (this)
                );
            }
        }
    };

export const FormRegisteringMixin = dedupeMixin(FormRegisteringMixinImplementation);
