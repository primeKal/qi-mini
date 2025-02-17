"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  name: string;
  label: string;
  placeholder: string;
}

export default function PasswordInput({ name, label, placeholder }: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <div className="relative">
        <Input
          type={isVisible ? "text" : "password"}
          name={name}
          placeholder={placeholder}
          minLength={6}
          required
        />
        <button
          type="button"
          onClick={() => setIsVisible(!isVisible)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        >
          {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>
  );
}
