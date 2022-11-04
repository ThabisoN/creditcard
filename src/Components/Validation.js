import valid from "card-validator";

export default function validation(values) {
  let errors = {};
  let creditCard = valid.number(values.Number);

  creditCard.Expiry = valid.Expiry(values.Expiry);
  creditCard.cvc = valid.cvc(values.cvc);
  creditCard.Name = valid.Name(values.Name);

  errors.show = true;
  errors.variant = "danger";
  errors.message = "An unknown error occured. Please try again later"
  errors.cname = false;
  errors.cnumber = false;
  errors.ctype = false;
  errors.cexp = false;
  errors.ccvc = false;

  if (values.cvc === null || !values.cvc.trim()) {
    errors.message = "Credit card cvc is not complete";
  } else if (creditCard.cvc.isValid) {
    errors.cvc = true;
  } else {
    errors.message = "Credit card cvc is invalid";
  }

  //Card CVV expiration
  if (values.cvc === null || !values.cvc.trim()) {
    errors.message = "Credit card CVC is not complete";
  } else if (creditCard.cvc.isValid) {
    errors.ccvc = true;
  } else {
    errors.message = "Credit card CVC is invalid";
  }

  //Card Expiration Verification
  if (values.Expiry === null || !values.Expiry.trim()) {
    errors.message = "Credit card expiration date is not complete";
  } else if (creditCard.Expiry.isValid) {
    errors.cexp = true;
  } else {
    errors.message = "Credit card expiration date is invalid";
  }

  //Card Type Verification
  if (
    values.cardType === null ||
    !values.cardType.trim() ||
    creditCard.card === null
  ) {
    errors.message = "Credit card type is not complete";
  } else if (
    creditCard.card.type &&
    creditCard.card.type.toUpperCase() === values.cardType.toUpperCase()
  ) {
    errors.ctype = true;
  } else {
    errors.message = "Credit card type is invalid";
  }

  //Card Number Verification
  if (values.Number === null || !values.Number.trim()) {
    errors.message = "Credit card number is not complete";
  } else if (creditCard.isValid) {
    errors.cnumber = true;
  } else {
    errors.message = "Credit card number is invalid";
  }

  //Cardholder Name Verification
  if (values.Name === null || !values.Name.trim()) {
    errors.message = "Cardholder name is not complete";
  } else if (creditCard.Name.isValid) {
    errors.cname = true;
  } else {
    errors.message = "Cardholder name is invalid";
  }

  if (
    errors.ctype &&
    errors.cname &&
    errors.cnumber &&
    errors.cexp &&
    errors.cpostal &&
    errors.ccvv
  ) {
    errors.variant = "success";
    errors.message = "Credit Card is valid";
  }

  return errors;
}