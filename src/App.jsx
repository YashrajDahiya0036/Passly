import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { useState, useRef, useEffect, use } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Lottie from "lottie-react";
// import copy from './public/icons/copy.json?url'
import copy from './icons/copy.json'
import edit from './icons/edit.json'
import delete_lottie from './icons/delete_lottie.json'
import { ToastContainer, toast } from 'react-toastify';

function App() {

    const passwordVisibilityRef = useRef()
    const passInpRef = useRef()
    const [password, setPassword] = useState({ website: "", username: "", pass: "", id: "" })

    const fetchPasswords = async () => {
        const res = await fetch('http://localhost:3000')
        let pass = await res.json()
        if (pass) {
            setPasswords(pass)
        }
    }
    // const initialPasswords = JSON.parse(localStorage.getItem("passwords")) || [];
    // console.log(fetchPasswords())
    // const initialPasswords = fetchPasswords() || [];
    const [passwords, setPasswords] = useState([])
    const [isEditable, setisEditable] = useState(false)
    const [visiblePassword, setVisiblePassword] = useState(passwords.reduce((acc, item) => {
        acc[item.id] = false;
        return acc;
    }, {})
    );
    const indexRef = useRef(null)

    useEffect(() => {
        fetchPasswords()
    }, [])


    useEffect(() => {
        localStorage.setItem("passwords", JSON.stringify(passwords))
        const visibilityObj = passwords.reduce((acc, item) => {
            acc[item.id] = false;
            return acc;
        }, {});

        setVisiblePassword(visibilityObj);
    }, [passwords])

    const notify = (text, field) => {
        toast(`${field} copied to clipboard! `, {
            progressStyle: { background: "red" },
        })
        console.log(text)
        navigator.clipboard.writeText(text)
    };

    function showPassword() {
        if (passwordVisibilityRef.current.src.includes("visible.svg")) {
            passInpRef.current.type = "text"
            passwordVisibilityRef.current.src = "icons/hidden.svg"
        }
        else {
            passInpRef.current.type = "password"
            passwordVisibilityRef.current.src = "icons/visible.svg"
        }
    }

    function toggleVisibility(id) {
        console.log(visiblePassword)
        console.log(id)
        let newVisiblePassword = { ...visiblePassword }
        newVisiblePassword[id] = !newVisiblePassword[id]
        // = !newVisiblePasswords[index].id
        setVisiblePassword(newVisiblePassword)
        console.log(visiblePassword)
    }

    async function addPassword() {
        if (password.website.trim() !== "" && password.pass.trim() !== "") {
            const newPassword = {
                ...password,
                username: password.username.trim() === "" ? password.website : password.username, id: uuidv4()
            }
            setPasswords([...passwords, newPassword])
            let res = await fetch('http://localhost:3000', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newPassword) })
            // let obj = {[newPassword.id]:false}
            // setVisiblePassword([...visiblePassword, obj])
            setPassword({ website: "", username: "", pass: "" })
            toast('Added Successfully!')
        }
    }


    function handleEdit(id) {
        setisEditable(true)
        let index = passwords.findIndex(item => {
            return item.id === id
        })
        let tempPasswords = [...passwords]
        indexRef.current = index
        setPassword({ website: tempPasswords[index].website, username: tempPasswords[index].username, pass: tempPasswords[index].pass })
        passInpRef.current.type = "password"
        passwordVisibilityRef.current.src = "icons/visible.svg"
    }

    async function handleUpdate() {
        let tempPasswords = [...passwords]
        let updatedPassword = {
            ...tempPasswords[indexRef.current],
            website: password.website,
            username: password.username,
            pass: password.pass
        };
        let res = await fetch(`http://localhost:3000/${updatedPassword.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedPassword),
        });
        if (res.ok) {
            // Update frontend state
            tempPasswords[indexRef.current] = updatedPassword;
            setPasswords(tempPasswords);

            // Reset input state
            setPassword({ website: "", username: "", pass: "" });
            setisEditable(false);
            toast('Update Successful!');
        } else {
            toast('Update failed!');
        }
    }

    async function handleDelete(id) {
        let res = await fetch(`http://localhost:3000/${id}`, {
            method: 'DELETE',
        });

        if (res.ok) {
            setPasswords(passwords.filter((element) => element.id !== id));
            toast('Delete Successful!');
        }
    }


    return (
        <>
            <Navbar></Navbar>
            <div className="m-auto md:w-[90vw] lg:w-max-[80vw]">
                <div className="flex flex-col w-full m-auto items-center mt-5 md:w-[90vw]">
                    <div className="font-bold text-4xl">Passly</div>
                    <div>Your password manager</div>
                </div>
                <div className="flex relative items-center flex-col gap-5 mt-5">
                    <input className="inp-format" value={password.website} onChange={(e) => setPassword({ ...password, website: e.target.value })} placeholder="Enter website Url" type="text" name="website" id="website" />
                    <div className="flex items-center flex-col gap-5 w-full md:flex-row md:justify-between md:gap-0 md:w-[90%]">
                        <input className="inp-format md:w-[50%] " value={password.username} onChange={(e) => setPassword({ ...password, username: e.target.value })} placeholder="Enter username" type="text" name="username" id="username" />
                        <div className="relative w-[90%] md:w-[47%]">
                            <input ref={passInpRef} value={password.pass} onChange={(e) => setPassword({ ...password, pass: e.target.value })} className="bg-white w-full rounded-xl border border-green-600 px-3 py-2" placeholder="Password" type="password" name="pass" id="pass" />
                            <span onClick={showPassword} className="absolute right-[3%] top-2"><img ref={passwordVisibilityRef} src="icons/visible.svg" alt="hidden" /></span>
                        </div>
                    </div>
                    <div>{isEditable ? <button onClick={handleUpdate} className="border rounded-xl p-2 px-3 border-black flex items-center justify-center font-bold text-white text-2xl bg-green-500 gap-2 active:bg-green-600">
                        <lord-icon
                            src="https://cdn.lordicon.com/fikcyfpp.json"
                            trigger="hover"
                            colors="primary:#121331,secondary:#121331"
                        >
                        </lord-icon>Update</button> : <button onClick={addPassword} className="border rounded-xl p-2 px-3 border-black flex items-center justify-center font-bold text-white text-2xl bg-green-500 gap-2 active:bg-green-600">
                        <lord-icon
                            src="https://cdn.lordicon.com/vjgknpfx.json"
                            trigger="hover"
                            colors="primary:#121331,secondary:#121331"
                            className="group-hover:scale-110 "
                        >
                        </lord-icon>Save</button>}</div>
                </div>
                <div className="password-display h-[40vh] mt-5 p-5 overflow-auto">
                    <p className="font-bold text-2xl">Saved Passwords</p>
                    {passwords.length == 0 ? <div>There are no passwords</div> :
                        <table className="table-auto w-full rounded-sm overflow-hidden">
                            <thead className="bg-green-800 text-xl sm:text-2xl">
                                <tr>
                                    <th className="text-white">Website</th>
                                    <th className="text-white">Username</th>
                                    <th className="text-white">Password</th>
                                    <th className="text-white">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {passwords.map((element) => {
                                    return <tr key={element.id} className="bg-green-200 text-xl px-1 ">
                                        <td className="px-1 border border-white py-1 lg:w-[30%]">
                                            <div className="flex justify-between">
                                                <div className="break-all w-[80%]">
                                                    <a href={element.website} className="break-all">{element.website}</a>
                                                </div>
                                                <div >
                                                    <Lottie onClick={() => notify(element.website, "Website")} animationData={copy} loop={false} autoplay={false} style={{ height: 25, width: 25 }} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-1 border border-white py-1 lg:w-[30%]">
                                            <div className="flex justify-between">
                                                <div className="break-all w-[80%]">
                                                    {element.username}
                                                </div>
                                                <Lottie onClick={() => notify(element.username, "Username")} animationData={copy} loop={false} autoplay={false} style={{ height: 25, width: 25 }} />
                                            </div>

                                        </td>
                                        <td className="px-1 w-[30%] border border-white py-1 lg:w-[30%]">
                                            <div className=" flex items-center justify-between">
                                                {visiblePassword[element.id] ? <div className="break-all w-[40%]">{element.pass}</div> : <div className="break-all">---</div>}
                                                <span className="flex gap-2">
                                                    <img onClick={() => toggleVisibility(element.id)} src={visiblePassword[element.id] ? "icons/hidden.svg" : "icons/visible.svg"} alt="hidden" />
                                                    <Lottie onClick={() => notify(element.pass, "Password")} animationData={copy} loop={false} autoplay={false} style={{ height: 25, width: 25 }} />
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-1 border border-white py-1">
                                            <div className="flex items-center justify-center">
                                                <Lottie onClick={() => handleEdit(element.id)} animationData={edit} loop={false} autoplay={false} style={{ height: 25, width: 25 }} />
                                                <Lottie onClick={() => handleDelete(element.id)} animationData={delete_lottie} loop={false} autoplay={false} style={{ height: 25, width: 25 }} />
                                            </div>
                                        </td>
                                    </tr>
                                    // return <div key={element.id}>Website:{element.website} username:{element.username} Pass:{element.pass}</div>
                                })}
                            </tbody>
                        </table>
                    }
                    <ToastContainer />
                </div>
            </div>

            <Footer></Footer>
        </>
    )
}

export default App
