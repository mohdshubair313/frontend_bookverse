"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { useAuth } from "@/Context/AuthContext"

interface Props {
  mode: "login" | "signup"
}

export function AuthForm({ mode }: Props) {
  const { login, signup } = useAuth()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (mode === "login") {
        await login(formData.email, formData.password)
      } else {
        await signup({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          mobile: formData.mobile,
          role: "seeker", // default, can update later
        })
      }
      // maybe route to dashboard?
    } catch (err) {
      console.error("Auth error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md shadow-xl border-muted p-6">
        <CardHeader>
          <CardTitle className="text-center text-xl">
            {mode === "login" ? "Welcome Back 👋" : "Create an Account"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <>
                <Input
                  name="name"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                />
                <Input
                  name="mobile"
                  placeholder="Mobile Number"
                  onChange={handleChange}
                  required
                />
              </>
            )}
            <Input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Please wait..." : mode === "login" ? "Login" : "Signup"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
