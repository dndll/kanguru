'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  bond: z.number().min(100, {
    message: "Bond must be at least 100 testnet tokens.",
  }),
})

export default function ProposalForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      bond: 100,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    
    console.log(values)
    toast({
      title: "Proposal Created",
      description: `Your proposal has been successfully created with a bond of ${values.bond} testnet tokens.`,
    })
    router.push('/proposals')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Proposal Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter proposal title" {...field} />
              </FormControl>
              <FormDescription>
                Provide a clear and concise title for your proposal.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Proposal Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your proposal in detail" 
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Provide a detailed description of your proposal, including its goals and potential impact.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bond"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bond Amount (Testnet Tokens)</FormLabel>
              <FormControl>
                <Input type="number" min={100} {...field} onChange={e => field.onChange(+e.target.value)} />
              </FormControl>
              <FormDescription>
                Enter the amount of testnet tokens you want to bond to your proposal. Higher bonds may prioritize your proposal in the queue.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Proposal"}
        </Button>
      </form>
    </Form>
  )
}

