'use client'
import React, { useState } from 'react'

const TestForm = () => {

    const [file, setFile] = useState<File>();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) return
        try {
            const data = new FormData()
            data.set('file', file)

            const res = await fetch('http://localhost:3000/api/listing', {
                method: 'POST',
                body: data

            })
        } catch (e: any) {
            console.error(e)
        }
    }
  return (
    <main>
        <form action="" onSubmit={onSubmit}>
            <input 
                type="file" 
                name='file'
                onChange={(e)=> setFile(e.target.files?.[0]) }
            />
            <input type="submit" value="Upload"/>
        </form>
    </main>
  )
}

export default TestForm