import { yupResolver } from '@hookform/resolvers/yup'
import CreateUpdateUserForm from 'components/user/CreateUpdateUserForm'
import { observer } from 'mobx-react'
import { UserType } from 'models/auth'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { useCreateUpdateRole } from './useCreateUpdateRole'

export interface CreateUserFields {
  first_name?: string
  last_name?: string
  email: string
  password: string
  confirm_password: string
  role_id: string
}

export interface UpdateUserFields {
  first_name?: string
  last_name?: string
  email: string
  password?: string
  confirm_password?: string
  role_id: string
}

interface Props {
  defaultValues?: UserType
}

export const useCreateUpdateUser = ({ defaultValues }: Props) => {
  const CreateUserSchema = Yup.object().shape({
    first_name: Yup.string().notRequired(),
    last_name: Yup.string().notRequired(),
    email: Yup.string().email().required('Please enter a valid email'),
    password: Yup.string()
      .matches(
        /^(?=.*\d)[A-Za-z.\s_-]+[\w~@#$%^&*+='{};!?:".?()\[\]-]{6,}$/,
        'Password must have at least one number, lower or uppercase letter and be longer than 5 characters',
      )
      .required(),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Please confirm your password'),
    role_id: Yup.string().required('Role field is required'),
  })

  const UpdateUserSchema = Yup.object().shape({
    first_name: Yup.string().notRequired(),
    last_name: Yup.string().notRequired(),
    email: Yup.string().email().required('Please enter a valid email'),
    password: Yup.string().notRequired(),
    confirm_password: Yup.string().when('password', {
      is: (val: string) => val && val.length > 0,
      then: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Please confirm your password'),
      otherwise: Yup.string().notRequired(),
    }),
    role_id: Yup.string().notRequired(),
  })

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<CreateUserFields | UpdateUserFields>({
    defaultValues: {
      first_name: defaultValues?.first_name ?? '',
      last_name: defaultValues?.last_name ?? '',
      email: defaultValues?.email ?? '',
      password: '',
      confirm_password: '',
      role_id: defaultValues?.role?.id ?? '',
    },
    mode: 'onSubmit',
    resolver: defaultValues
      ? yupResolver(UpdateUserSchema)
      : yupResolver(CreateUserSchema),
  })

  return { handleSubmit, errors, reset, control }
}

export type CreateUpdateUserForm = ReturnType<typeof useCreateUpdateUser>
