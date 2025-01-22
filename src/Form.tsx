import { useFieldArray, useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

const Form = () => {

  const form = useForm<FormValues>({
    defaultValues: {
      username: "Batman",
      email: "",
      fullname: {
        firstname: "",
        lastname: ""
      },
      phnNumbers: [{contact:""}]
    }
  })
  const { register, control, handleSubmit, formState } = form
  const { errors } = formState

  const { fields, append, remove } = useFieldArray({
    name: 'phnNumbers',
    control
  })
  
  type FormValues = {
    username: string,
    email: string,
    number: number,
    fullname: {
      firstname: string,
      lastname: string
    }
    phnNumbers: { 
      contact: string
    }[]
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
              <div>
                <label htmlFor="listofno">List of Contacts</label>
                <div>
                  {
                    fields.map((field,index)=>{
                      return (
                        <div className='form-control'key={field.id}>
                          <input type="text" {...register(`phnNumbers.${index}.contact` as const)} />
                          {
                            index > 0 && (
                              <button type='button' onClick={()=>{remove(index)}}>Remove number</button>

                            )
                          }
                        </div>
                      )
                      
                    })
                  }
                  <button type='button' onClick={()=>{append({contact: ""})}}>Add number</button>
                </div>
              </div>
              <button >Submit</button>
          </form>
          <DevTool control={control}/>
    </div>
  )
}

export default Form