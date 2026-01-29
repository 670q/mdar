'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'

export async function login(prevState: any, formData: FormData) {
    const supabase = await createClient()
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { data: authData, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return { error: error.message }
    }

    // Fetch user profile to know the role for redirection
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authData.user.id)
        .single()

    revalidatePath('/', 'layout')

    if (profile?.role === 'publisher') {
        redirect('/dashboard')
    } else if (profile?.role === 'bookstore') {
        redirect('/dashboard/bookstore')
    } else if (profile?.role === 'author') {
        redirect('/dashboard/author')
    } else {
        redirect('/')
    }
}

export async function signup(prevState: any, formData: FormData) {
    const supabase = await createClient()
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const fullName = formData.get('fullName') as string
    const role = formData.get('role') as string

    // 1. Sign Up
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
                role: role,
            },
        },
    })

    if (error) {
        return { error: error.message }
    }

    if (data.user) {
        const { error: profileError } = await supabase.from('profiles').insert({
            id: data.user.id,
            full_name: fullName,
            role: role,
            avatar_url: '',
        })

        if (profileError) {
            console.error("Profile creation failed", profileError)
        }
    }

    revalidatePath('/', 'layout')

    // Role-based redirection after signup
    if (role === 'publisher') {
        redirect('/dashboard')
    } else if (role === 'bookstore') {
        redirect('/dashboard/bookstore')
    } else if (role === 'author') {
        redirect('/dashboard/author')
    } else {
        redirect('/')
    }
}

export async function signOut() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
    redirect('/')
}
