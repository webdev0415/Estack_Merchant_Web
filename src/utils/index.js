import _ from 'lodash';
import moment from 'moment';

export const childOrDefault = (child, defaultValue = '-') => {
  const val = child[1];

  return _.isNil(val) ? defaultValue : val;
};

export const getDOB = (value) => {
  const dob = _.toNumber(value);

  if (!dob) {
    return '-';
  }
  return moment().diff(moment.unix(dob), 'years');
};

export const posStatusEnum = {
  PENDING: 'pending',
  INVITE_CANCELLED: 'invite cancelled',
  ACTIVE: 'active',
  REVOKED: 'revoked',
  DELETED: 'deleted',
};


export const regExp = {
  float: /^(?:[1-9]\d*|0)?(?:\.[\d+]{0,2})?$/,
  floatPositive: /^(?=.+)(?:[1-9]\d*|0)?(?:\.[\d+]{0,2})?$/,
  number: /^(?:[1-9]\d*|0)$/,
  numberPositive: /^(?=.+)(?:[1-9]\d*|0)$/,
};

export const numberValidator = (
  {
    isPositive = true, isFloat = false, min = -Infinity, max = +Infinity,
  } = {
    isPositive: true,
    isFloat: false,
    min: -Infinity,
    max: +Infinity,
  },
) => (rule, value, callback) => {
  const num = _.toNumber(value);
  if (_.isNaN(num)) {
    return callback('Invalid value');
  }

  if (!isPositive && isFloat) {
    return _.gte(num, min) && _.lte(num, max) ? callback() : callback('Invalid value');
  }

  if (!isPositive && !isFloat) {
    return _.isInteger(num) && _.gte(num, min) && _.lte(num, max) ? callback() : callback('Invalid value');
  }

  if (isPositive && isFloat) {
    return _.gt(num, 0) && _.gte(num, min) && _.lte(num, max) ? callback() : callback('Invalid value');
  }

  if (isPositive && !isFloat) {
    return _.isInteger(num) && _.gt(num, 0) && _.gte(num, min) && _.lte(num, max) ? callback() : callback('Invalid value');
  }

  return callback('?');
};
