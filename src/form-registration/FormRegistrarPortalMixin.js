import { dedupeMixin } from "@open-wc/dedupe-mixin";

/**
 * This allows to register fields within a form even though they are not within the same dom tree.
 * It does that by redispatching the event on the registration target.
 * Neither form or field need to know about the portal. It acts as if the field is part of the dom tree.
 *
 * @example
 * <my-form></my-form>
 * <my-portal .registrationTarget=${document.querySelector('my-form')}>
 *   <my-field></my-field>
 * </my-portal>
 * // my-field will be registered within my-form
 * @type {FormRegistrarPortalMixin}
 * @param superclass
 */
const FormRegistrarPortalMixinImplementation = (superclass) =>
    /**
     * @type {FormRegistrarPortalMixin}
     */
    class FormRegistrarPortal extends superclass {
        constructor() {
            super();

            /**
             * Registration target: an element, usually in the body of the dom, that captures events
             * and redispatches them on host
             * @type {(FormRegistrarPortalHost & HTMLElement) | undefined}
             */
            this.registrationTarget = undefined;
            this.__redispatchEventForFormRegistrarPortalMixin =
                this.__redispatchEventForFormRegistrarPortalMixin.bind(this);
            this.addEventListener(
                "form-element-register",
                this.__redispatchEventForFormRegistrarPortalMixin
            );
        }

        /**
         * @param {CustomEvent} ev
         * @private
         */
        __redispatchEventForFormRegistrarPortalMixin(ev) {
            ev.stopPropagation();
            if (!this.registrationTarget) {
                throw new Error("A FormRegistrarPortal element requires a .registrationTarget");
            }
            this.registrationTarget.dispatchEvent(
                new CustomEvent("form-element-register", {
                    detail: { element: ev.detail.element },
                    bubbles: true,
                })
            );
        }
    };

export const FormRegistrarPortalMixin = dedupeMixin(FormRegistrarPortalMixinImplementation);
