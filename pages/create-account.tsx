import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import useMutation from "../lib/client/useMutation";

interface EnterForm {
  name: string;
  email: string;
}

const CreateAccount: NextPage = () => {
  const [enter, { loading, data, error }] = useMutation("/api/users/enter");
  const { register, handleSubmit } = useForm<EnterForm>();
  const onValid = (validForm: EnterForm) => {
    // alert("Account created! Please log in!");
    enter(validForm);
  };
  console.log(loading, data, error);
  return (
    <div>
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit(onValid)}>
        <div>
          Name: <input {...register("name")} type="text" required />
        </div>
        <div>
          Email: <input {...register("email")} type="email" required />
        </div>
        <input type="submit" value="Create Account" />
      </form>
    </div>
  );
};

export default CreateAccount;
