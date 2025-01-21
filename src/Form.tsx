import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

const Form = () => {

  const form = useForm<FormValues>({
    defaultValues: {
      username: "Batman",
      email: "",
      fullname: {
        firstname: "",
        lastname: ""
      }
    }
  })
  const { register, control, handleSubmit, formState } = form
  const { errors } = formState
  
    type FormValues = {
        username: string,
        email: string,
        number: number,
        fullname: {
          firstname: string,
          lastname: string
        }
    }
    const submitMethod = (data:FormValues) => {
        console.log(data)
    }
  return (
      <div>
          <form onSubmit={handleSubmit(submitMethod)}>
              <div>  
                <label htmlFor="username">UserName</label>
                <input type='text' id='username' {...register("username", { required: "Username is required" })} />
                <p>{errors.username?.message}</p>
              </div>
              <div>    
                <label htmlFor="email">Email</label>
              <input type='text' id='email' {...register("email", {
                pattern: { value: /.*?@?[^@]*\.+.*/, message: "Invalid format" },
                validate: (field) => {
                  return (
                    field!="admin@gmail.com"||"Enter a different email"
                  )
                }})} />
                <p>{errors.email?.message}</p>
              </div>
              <div>  
                <label htmlFor="number">Number</label>
                <input type='tel' id='number' {...register("number")} />
                <p>{errors.number?.message}</p>
              </div>
              <div>
                <label htmlFor="firstname">firstname</label>
                <input type='text' id='firstname' {...register("fullname.firstname")} />
              </div>
              <div>
                <label htmlFor="lastname">lastname</label>
                <input type='text' id='lastname' {...register("fullname.lastname")} />
              </div>
              <button >Submit</button>
          </form>
          <DevTool control={control}/>
    </div>
  )
}

export default Form