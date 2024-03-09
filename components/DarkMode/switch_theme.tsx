// app/components/ThemeSwitcher.tsx
"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@nextui-org/react";
import {useTheme} from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null

  return (
    <div>
      {/* <button onClick={() => setTheme('light')}>Light Mode</button>
      <button onClick={() => setTheme('dark')}>Dark Mode</button> */}
        <Button 
            isIconOnly 
            radius="full" 
            variant="light"
            onClick={() => {
                setTheme(theme === "light" ? "dark" : "light")
            }}
        >
            <Icon className="text-default-500" icon={theme === 'light' ? 'solar:moon-linear' : 'solar:sun-linear'} width={24} />
        </Button>
    </div>
  )
};