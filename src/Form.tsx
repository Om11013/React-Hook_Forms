import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

const Form = () => {

  const form = useForm<FormValues>()
  const { register, control, handleSubmit, formState } = form
  const { errors } = formState
  
    type FormValues = {
        username: string,
        email: string,
        number: number
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
                <input type='text' id='email' {...register("email", {pattern: {value:/.*?@?[^@]*\.+.*/,message:"Invalid format"}})} />
                <p>{errors.email?.message}</p>
              </div>
              <div>  
                <label htmlFor="number">Number</label>
                <input type='tel' id='number' {...register("number")} />
                <p>{errors.number?.message}</p>
              </div>
              <button >Submit</button>
          </form>
          <DevTool control={control}/>
    </div>
  )
}

export default Form