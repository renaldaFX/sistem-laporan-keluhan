import {
  Form as VeeForm, Field as VeeField, defineRule, ErrorMessage, configure
} from 'vee-validate';
import {
  required, min, max, alpha_spaces as alphaSpaces, email,
  min_value as minVal, max_value as maxVal, confirmed, not_one_of as excluded, numeric
} from '@vee-validate/rules';

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);

    defineRule('required', required);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('alpha_spaces', alphaSpaces);
    defineRule('email', email);
    defineRule('min_value', minVal);
    defineRule('max_value', maxVal);
    defineRule('password_mismatch', confirmed);
    defineRule('excluded', excluded);
    defineRule('numeric', numeric);

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `The field ${ctx.field} is required!`,
          numeric: `The field ${ctx.field} must be number!`,
          min: `The field ${ctx.field} is too short!`,
          max: `The field ${ctx.field} is too much!`,
          alpha_spaces: `The field ${ctx.field} may only contain alphabetical charachters and spaces!`,
          email: `The field ${ctx.field} must be valid email!`,
          exluded: `You are not allowed to use this value for the field ${ctx.field}`,
          password_mismatch: `The password don't match`
        }

        const message = messages[ctx.rule.name] ? messages[ctx.rule.name] : `The field ${contex.field} is invalid`

        return message
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true
    })
  },
};
