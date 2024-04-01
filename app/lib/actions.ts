'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { fetchImpactbyName } from './data';

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: 'Please select a customer.',
    }),
    amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0.' }),
    status: z.enum(['pending', 'paid'], {
        invalid_type_error: 'Please select an invoice status.',
    }),
    date: z.string(),
  });
const FormSchemaP = z.object({
  name: z.string()
});
const CreateInvoice = FormSchema.omit({ id: true, date: true });
const CopyPortfolio = FormSchemaP.omit({});
export type State = {
    errors?: {
      customerId?: string[];
      amount?: string[];
      status?: string[];
    };
    message?: string | null;
  };

  export type StateP = {
    errors?: {
      name?: string;
    };
    message?: string | null;
  };
  export async function onSubmit(values: z.infer<typeof FormSchemaP>) {
    console.log("Copied" + values);
  }
  export async function copyPortfolio(prevState: State, formData: FormData){
    // Validate form using Zod
    const validatedFields = CopyPortfolio.safeParse({
      name: formData.get('name'),
    });
   
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Invoice.',
      };
    }
   
    // Prepare data for insertion into the database
    const copy = await fetchImpactbyName(validatedFields.data.name);
    // Insert data into the database
    try {
      await sql`
        INSERT INTO impactportfolios (id, name, np1, np2, np3, w1, w2, w3)
        VALUES (${copy[0].id}, ${"Copy of " + copy[0].name}, ${copy[0].nonprofit1}, ${copy[0].nonprofit2 }, ${copy[0].nonprofit3}, ${copy[0].weight1}, ${copy[0].weight2}, ${copy[0].weight3})
      `;
    } catch (error) {
      // If a database error occurs, return a more specific error.
      return {
        message: 'Database Error: Failed to Create Invoice.',
      };
    }
   
    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/dashboard');
    redirect('/dashboard');
  }
    // ...
  export async function createInvoice(prevState: State, formData: FormData) {
    // Validate form using Zod
    const validatedFields = CreateInvoice.safeParse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });
   
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Invoice.',
      };
    }
   
    // Prepare data for insertion into the database
    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];
   
    // Insert data into the database
    try {
      await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
      `;
    } catch (error) {
      // If a database error occurs, return a more specific error.
      return {
        message: 'Database Error: Failed to Create Invoice.',
      };
    }
   
    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  }

    const UpdateInvoice = FormSchema.omit({ id: true, date: true });
 
    // ...
     
    export async function updateInvoice(id: string, formData: FormData) {
      const { customerId, amount, status } = UpdateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
      });
     
      const amountInCents = amount * 100;
     
      try {
        await sql`
            UPDATE invoices
            SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
            WHERE id = ${id}
          `;
      } catch (error) {
        return { message: 'Database Error: Failed to Update Invoice.' };
      }
     
      revalidatePath('/dashboard/invoices');
      redirect('/dashboard/invoices');
    }

    export async function deleteInvoice(id: string) {       
        try {
          await sql`DELETE FROM invoices WHERE id = ${id}`;
          revalidatePath('/dashboard/invoices');
          return { message: 'Deleted Invoice' };
        } catch (error) {
          return { message: 'Database Error: Failed to Delete Invoice' };
        }
      }