
const Input = ({register, name, options, ...props}) => {
    return <input className="form-control" {...register(name, options)} {...props} />
}

export default Input;