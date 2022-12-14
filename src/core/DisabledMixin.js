import { dedupeMixin } from "@open-wc/dedupe-mixin";

/**
 * @type {DisabledMixin}
 * @param superclass
 */
const DisabledMixinImplementation = (superclass) =>
    /**
     * @type {DisabledMixin}
     */
    class DisabledMixin extends superclass {
        static get properties() {
            return {
                disabled: {
                    type: Boolean,
                    reflect: true,
                },
            };
        }

        constructor() {
            super();
            /** @protected */
            this._requestedToBeDisabled = false;
            /** @private */
            this.__isUserSettingDisabled = true;
            /** @private */
            this.__restoreDisabledTo = false;
            this.disabled = false;
        }

        makeRequestToBeDisabled() {
            if (this._requestedToBeDisabled === false) {
                this._requestedToBeDisabled = true;
                this.__restoreDisabledTo = this.disabled;
                this.__internalSetDisabled(true);
            }
        }

        retractRequestToBeDisabled() {
            if (this._requestedToBeDisabled === true) {
                this._requestedToBeDisabled = false;
                this.__internalSetDisabled(this.__restoreDisabledTo);
            }
        }

        /**
         * @param {boolean} value
         * @private
         */
        __internalSetDisabled(value) {
            this.__isUserSettingDisabled = false;
            this.disabled = value;
            this.__isUserSettingDisabled = true;
        }

        /**
         * @param {PropertyKey} name
         * @param {?} oldValue
         */
        requestUpdate(name, oldValue) {
            super.requestUpdate(name, oldValue);
            if (name === "disabled") {
                if (this.__isUserSettingDisabled) {
                    this.__restoreDisabledTo = this.disabled;
                }
                if (this.disabled === false && this._requestedToBeDisabled === true) {
                    this.__internalSetDisabled(true);
                }
            }
        }
    };

export const DisabledMixin = dedupeMixin(DisabledMixinImplementation);
