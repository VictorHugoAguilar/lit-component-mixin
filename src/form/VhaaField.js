import { LitElement } from "lit-element";

import { SlotMixin } from "../core/index.js";
import { ValidateMixin } from "../validate/index.js";
import { FocusMixin, FormatMixin, FormControlMixin, InteractionStateMixin } from "./index.js";

/**
 * `VhaaField`: wraps <input>, <textarea>, <select> and other interactable elements.
 * Also it would follow a nice hierarchy: vhaa-form -> vhaa-fieldset -> vhaa-field
 *
 * Note: We don't support placeholders, because we have a helper text and
 * placeholders confuse the user with accessibility needs.
 *
 * Please see the docs for in depth information.
 *
 * @example
 * <vhaa-field name="myName">
 *   <label slot="label">My Input</label>
 *   <input type="text" slot="input">
 * </vhaa-field>
 *
 * @customElement vhaa-field
 */
export class VhaaField extends FormControlMixin(
    InteractionStateMixin(FocusMixin(FormatMixin(ValidateMixin(SlotMixin(LitElement)))))
) {
    /**
     * @param {import('@vhaa/core').PropertyValues } changedProperties
     */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        /** @type {any} */
        this._initialModelValue = this.modelValue;
    }

    connectedCallback() {
        super.connectedCallback();
        this._onChange = this._onChange.bind(this);
        this._inputNode.addEventListener("change", this._onChange);
        this.classList.add("form-field"); // eslint-disable-line
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this._inputNode.removeEventListener("change", this._onChange);
    }

    resetInteractionState() {
        super.resetInteractionState();
        this.submitted = false;
    }

    /**
     * Resets modelValue to initial value.
     * Interaction states are cleared
     */
    reset() {
        this.modelValue = this._initialModelValue;
        this.resetInteractionState();
    }

    /**
     * Clears modelValue.
     * Interaction states are not cleared (use resetInteractionState for this)
     */
    clear() {
        // TODO: [v1] set to undefined
        this.modelValue = "";
    }

    /**
     * Dispatches custom bubble event
     * @protected
     */
    _onChange() {
        /** @protectedEvent user-input-changed */
        this.dispatchEvent(new Event("user-input-changed", { bubbles: true }));
    }

    /**
     * @configure InteractionStateMixin, ValidateMixin
     */
    get _feedbackConditionMeta() {
        return { ...super._feedbackConditionMeta, focused: this.focused };
    }

    /**
     * @configure FocusMixin
     */
    get _focusableNode() {
        return this._inputNode;
    }
}
