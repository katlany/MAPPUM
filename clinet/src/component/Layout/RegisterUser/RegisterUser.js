import React from 'react';
import Input from '../TextInput/TextInput';
const registerUser = props => {
  const {
    loading,
    registerUserForm,
    redirect,
    message,
    formSubmit,
    inputChange,
  } = props;
  const {
    firstName = '',
    lastName = '',
    zahot = '',
    phone = '',
    address = '',
    email = '',
  } = registerUserForm;
  return (
    <div className="row justify-content-center">
      <div className="col-lg-12 text-center mt-5">
        <h2 className="logintitle">Register</h2>
        <form className="RegisterForm" onSubmit={e => e.preventDefault()}>
          <div className="row mt-5">
            <div className="col-6">
              <Input
                isValid={firstName ? firstName.isValid : true}
                className="form-control"
                id="firstName"
                name="firstName"
                type="text"
                error={message && message.firstName}
                required
                disabled={loading}
                defaultValue={firstName && firstName.value}
                inputChange={inputChange}
                validation={{
                  isRequired: true,
                  minLength: 2,
                  maxLength: 256,
                }}
              />
            </div>
            <div className="col-6">
              <Input
                isValid={lastName ? lastName.isValid : true}
                className="form-control"
                id="lastName"
                name="lastName"
                type="text"
                error={message && message.lastName}
                required
                disabled={loading}
                defaultValue={lastName && lastName.value}
                inputChange={inputChange}
                validation={{
                  isRequired: true,
                  minLength: 2,
                  maxLength: 256,
                }}
              />
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-6">
              <Input
                isValid={zahot ? zahot.isValid : true}
                className="form-control"
                id="zahot"
                name="zahot"
                type="number"
                error={message && message.zahot}
                required
                disabled={loading}
                defaultValue={zahot && zahot.value}
                inputChange={inputChange}
                validation={{ isRequired: true, isNumeric: true }}
              />
            </div>
            <div className="col-6">
              <Input
                isValid={phone ? phone.isValid : true}
                className="form-control"
                id="phone"
                name="phone"
                type="text"
                error={message && message.phone}
                required
                disabled={loading}
                defaultValue={phone && phone.value}
                inputChange={inputChange}
                validation={{
                  isRequired: true,
                  minLength: 6,
                  maxLength: 256,
                }}
              />
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-6">
              <Input
                isValid={address ? address.isValid : true}
                className="form-control"
                id="address"
                name="address"
                type="text"
                error={message && message.address}
                required
                disabled={loading}
                defaultValue={address && address.value}
                inputChange={inputChange}
                validation={{
                  isRequired: true,
                  minLength: 2,
                  maxLength: 256,
                }}
              />
            </div>
            <div className="col-6">
              <Input
                isValid={email ? email.isValid : true}
                className="form-control"
                id="email"
                name="email"
                type="email"
                error={message && message.email}
                required
                disabled={loading}
                defaultValue={email && email.value}
                inputChange={inputChange}
                validation={{ isRequired: true, isEmail: true }}
              />
            </div>
          </div>
          <div className="row mt-5">
            <div className="col">
              <button
                className="btn btn-success form-control"
                style={{ width: '80%' }}
                onClick={formSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default registerUser;