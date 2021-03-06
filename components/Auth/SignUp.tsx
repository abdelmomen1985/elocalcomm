import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NEW_USER } from "../../query/user";

export default function SignUp(props: any) {
  const { register, handleSubmit, getValues, errors } = useForm();
  const [newUserData, setNewUserData] = useState<any>({});
  const [addUser] = useMutation(NEW_USER);
  const onRegister = async (data: any) => {
    console.log(data);
    console.log(data.firstName + " " + data.lastName);
    setNewUserData(data);
    console.log(newUserData);
    props.setLoginModal(false);
    await addUser({
      variables: {
        name: {
          first: data.firstName,
          last: data.lastName,
        },
        username: data.email,
        password: data.password,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onRegister)}>
      <style jsx>
        {`
          .form-group label {
            font-size: 14px;
            padding: 5px;
          }
          .form-group input {
            border-radius: 5px;
            padding: 5px;
            width: 100%;
          }
        `}
      </style>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label className="block my-2" htmlFor="firstName">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            ref={register({
              required: "First Name is Required",
              minLength: {
                value: 3,
                message: "First Name can't be shorter than 3 Characters",
              },
            })}
          />
          {errors.firstName && (
            <p className="text-sm text-bold text-red-400 px-1 py-2">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div className="form-group">
          <label className="block my-2" htmlFor="lastName">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            ref={register({
              required: "Last Name is Required",
              minLength: {
                value: 3,
                message: "Last Name can't be shorter than 3 Characters",
              },
            })}
          />
          {errors.lastName && (
            <p className="text-sm text-bold text-red-400 px-1 py-2">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label className="block my-2" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            ref={register({
              required: "Email is Required",
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Please Enter A valid Email Address",
              },
            })}
          />
          {errors.email && (
            <p className="text-sm text-bold text-red-400 px-1 py-2">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="form-group">
          <label className="block my-2" htmlFor="phone">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            ref={register({
              required: "Phone Number is Required",
              minLength: {
                value: 11,
                message: "Phone Number can't be less than 11 Characters",
              },
              //   validate: {
              //     phoneNumbersOnly: (value) => {
              //       switch (value) {
              //         case value.match(/^[0-9]+$/):
              //           return true || 'only numbers allowed';
              //         case value.match(
              //           /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,9}$/im
              //         ):
              //           return (
              //             true ||
              //             "Phone numbers can't be less than 11 or more than 15 digits"
              //           );
              //       }
              //     },
              //   },
              pattern: {
                value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,9}$/im,
                message: "Please Enter A valid Phone Number",
              },
            })}
          />
          {errors.phone && (
            <p className="text-sm text-bold text-red-400 px-1 py-2">
              {errors.phone.message}
            </p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label className="block my-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            ref={register({
              required: "Password is Required",
              minLength: {
                value: 8,
                message: "password can't be shorter than 8 Characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-sm text-bold text-red-400 px-1 py-2">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="form-group">
          <label className="block my-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            ref={register({
              required: "Password is Required",
              minLength: {
                value: 8,
                message: "password can't be shorter than 8 Characters",
              },
              validate: {
                matchesPreviousPassword: (value) => {
                  const { password } = getValues();
                  return password === value || "Passwords don't match!";
                },
              },
            })}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-bold text-red-400 px-1 py-2">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="my-5 mx-auto block bg-blue-900 text-white text-center py-3 px-8 w-full rounded-md"
      >
        Sign In
      </button>
    </form>
  );
}
