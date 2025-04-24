import { yupResolver } from '@hookform/resolvers/yup'
import { ProductType } from 'models/product'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { useCreateUpdateRole } from './useCreateUpdateRole'

export interface CreateUpdateProductFields {
  title: string
  description: string
  price: number
}

interface Props {
  defaultValues?: ProductType
}

export const useCreateUpdateProduct = ({ defaultValues }: Props) => {
  const CreateUpdateProductSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().required('Price is required'),
  })

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      ...defaultValues,
    },
    mode: 'onSubmit',
    resolver: yupResolver(CreateUpdateProductSchema),
  })

  return {
    handleSubmit,
    errors,
    control,
  }
}

export type CreateUpdateProductForm = ReturnType<typeof useCreateUpdateProduct>
//export type CreateUpdateRoleForm = ReturnType<typeof useCreateUpdateRole>
