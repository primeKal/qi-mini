"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { toast, Toaster } from "react-hot-toast";
import { Textarea } from "@headlessui/react";

export default function ContactUs() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch user details if authenticated
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setEmail(data.user.email || " ");
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) {
      toast.error("Please fill out all fields.");
      return;
    }

    setLoading(true);

    // Insert message to Supabase
    const { error } = await supabase
      .from("contact_messages")
      .insert([{ email, name, message }]);

    if (error) {
      toast.error("Failed to send message. Try again later.");
      console.error("Error submitting contact form:", error);
      setLoading(false);
      return;
    }

    // Call API to send email
    const response = await fetch("/api/send-contact-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      toast.error("Failed to send email notification.");
      console.error("Email sending error:", data.error);
    } else {
      toast.success("Message sent successfully!");
      setName("");
      setMessage("");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-[80%] w-[50%] mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-gray-900 text-center">
        Contact Us
      </h1>
      <p className="text-gray-600 text-center mb-6">
        Have questions? Fill out the form below.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Email Input */}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={!!email}
          />
        </div>

        {/* Message Input */}
        <div className="flex flex-col space-y-2 gap-3">
          <Label htmlFor="message">Message</Label>
          <Textarea
            className="p-4"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message"
            required
            rows={4}
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white"
        >
          {loading ? "Sending..." : "Send Message"}
        </Button>
      </form>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
