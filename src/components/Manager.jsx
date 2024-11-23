"use client"
import { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const eye = useRef()
    const pass = useRef()
    const [form, setForm] = useState({ website: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem('passwords')
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])

    const showPassword = () => {
        if (eye.current.src.includes('icons/eyecross.png')) {
            eye.current.src = 'icons/eye.png'
            pass.current.type = 'text'
        }
        else {
            eye.current.src = 'icons/eyecross.png'
            pass.current.type = 'password'
        }
    }
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        // console.log(form);
    }
    const addPassword = () => {
        if(form.website.length > 3 && form.username.length > 3 && form.password.length > 3){
            setPasswordArray([...passwordArray, {...form, id: uuidv4()}])
            localStorage.setItem('passwords', JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
            // console.log([...passwordArray, {...form, id: uuidv4()}]);
            setForm({ website: "", username: "", password: "" })
            toast('Password saved', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
        }
        else {
            toast('Error: Password not saved', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
        }
    }

    const deletePassword = (id) => {
        setPasswordArray(passwordArray.filter(i => i.id !== id))
        localStorage.setItem('passwords', JSON.stringify(passwordArray.filter(i => i.id !== id)))
        // console.log([...passwordArray, {...form, id: uuidv4()}]);
        toast('Password deleted', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
        });
    }

    const editPassword = (id) => {
        setForm(passwordArray.filter(i => i.id === id)[0])
        setPasswordArray(passwordArray.filter(i => i.id !== id))
    }

    const copyText = (text) => {
        toast('Copid to Clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
        });
        navigator.clipboard.writeText(text)
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-white opacity-20 blur-[100px]"></div>
            </div>
            <div className="py-2 px-0 md:py-12 md:max-w-6xl md:mycontainer">
                <h1 className='font-bold text-3xl text-center'>
                    <span className='text-green-500'>&lt;</span>
                    <span>Pass</span>
                    <span className='text-green-500'>OP/&gt;</span>
                </h1>
                <p className='text-green-700 text-center mt-1 mb-2'>Your own password manager</p>
                <div className="flex flex-col p-4 items-center">
                    <input id='website' name='website' onChange={handleChange} value={form.website} placeholder='Enter website URL' className='text-sm md:text-base px-2 py-2 w-full rounded-full md:px-5 md:py-1 border border-green-500 focus:border-[2px] focus:border-green-800 outline-none' type="text" />

                    <div className="flex flex-col md:flex-row gap-5 md:gap-8 justify-between mt-5 w-full">
                        <input id='username' name='username' onChange={handleChange} value={form.username} placeholder='Enter your username' className='text-sm md:text-base px-2 py-2 w-full rounded-full md:px-5 md:py-1 border border-green-500 focus:border-green-800 focus:border-[2px] outline-none' type="text" />
                        <div className="relative w-full">
                            <input id='password' ref={pass} name='password' onChange={handleChange} value={form.password} placeholder='Enter your password' className='w-full rounded-full text-sm md:text-base px-2 py-2 md:px-5 md:py-1 border border-green-500 focus:border-green-800 focus:border-[2px] outline-none' type="password" />
                            <span onClick={showPassword} className="absolute right-1 top-[9px] md:right-2 md:top-[5px] cursor-pointer">
                                <img className='w-[20px] md:w-[25px]' ref={eye} src="icons/eyecross.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={addPassword} className='hover:bg-green-300 gap-2 flex justify-center items-center mt-6 bg-green-400 px-4 py-2 rounded-full w-fit'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                        >
                        </lord-icon>Save
                    </button>
                </div>
                <h2 className='py-2 text-lg md:text-xl font-bold'>Your Passwords</h2>
                {passwordArray.length === 0 && <div> No passwords to show</div>}
                {passwordArray.length !== 0 && <table className="table-auto w-full mx-auto overflow-hidden rounded-md">
                    <thead className='bg-green-600 py-2 text-white'>
                        <tr className='text-xs md:text-base'>
                            <th>Website</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='bg-green-100'>
                        {passwordArray.map((item, index) => {
                            return (
                                <tr className='text-xs md:text-base' key={index}>
                                    <td className='md:w-28 py-2 border border-zinc-400'>
                                        <div className='flex gap-1 justify-center items-center'>
                                            <a href={item.website} target='_blank'>{item.website}</a>
                                            <span onClick={() => { copyText(item.website) }} className='cursor-pointer'><i className="fa-regular fa-copy"></i></span>
                                        </div>
                                    </td>
                                    <td className='md:w-28 text-center py-2 border border-zinc-400'>
                                        <div className='flex gap-3 justify-center items-center'>
                                            <span>{item.username}</span>
                                            <span onClick={() => { copyText(item.username) }} className='cursor-pointer'><i className="fa-regular fa-copy cursor-pointer"></i></span>
                                        </div>
                                    </td>
                                    <td className='md:w-28 text-center py-2 border border-zinc-400'>
                                        <div className='flex gap-3 justify-center items-center'>
                                            <span>{"*".repeat(item.password.length)}</span>
                                            <span onClick={() => { copyText(item.password) }} className='cursor-pointer'><i className="fa-regular fa-copy cursor-pointer"></i></span>
                                        </div>
                                    </td>
                                    <td className='md:w-28 py-2 border border-zinc-400'>
                                        <div className='flex items-center justify-center gap-2 md:gap-4'>
                                            <button onClick={() => {deletePassword(item.id)}} className='underline flex items-center'>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    colors="primary:#e83a30"
                                                    style={{"width": "20px", "height": "22px"}}>
                                                </lord-icon>
                                            </button>
                                            <button onClick={() => {editPassword(item.id)}} className='underline text-blue-600 flex items-center text-base'><span><i className="fa-solid fa-pen-to-square"></i></span></button>
                                        </div>
                                    </td>
                                </tr>)
                        })}
                    </tbody>
                </table>
                }
            </div>
        </>
    )
}

export default Manager
