import { ObjectShape, OptionalObjectSchema } from 'yup/lib/object';

export async function validation(data: Object, schema: OptionalObjectSchema<ObjectShape>) {
  await schema.validate(data);
}
