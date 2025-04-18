import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

export interface RegisterUserFields {
  first_name?: string
  last_name?: string
  email: string
  password: string
  confirm_password: string
}

export const useRegisterForm = () => {
  const RegisterSchema = Yup.object().shape({
    first_name: Yup.string().notRequired(),
    last_name: Yup.string().notRequired(),
    email: Yup.string().email().required('Please enter a valid email'),
    password: Yup.string()
      .matches(
        /^(?=.*\d)[A-Za-z.\s_-]+[\w~@#$%^&*+='{};!?:".?()\[\]-]{6,}$/,
        'Password must have at least one number, lower or uppercase letter and it has to be longer than 5 characters',
      )
      .required(),
    confrim_password: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password do not match')
      .required('Password do not match'),
  })

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: '',
    },
    mode: 'onSubmit',
    resolver: yupResolver(RegisterSchema),
  })

  return {
    handleSubmit,
    errors,
    reset,
    control,
  }
}

export type RegisterForm = ReturnType<typeof useRegisterForm>
