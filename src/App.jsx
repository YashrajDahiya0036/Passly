import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { useState, useRef, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

function App() {

    const passRef = useRef()
    const [password, setPassword] = useState({ website: "", alias: "", pass: "", id: "" })
    const [passwords, setPasswords] = useState(() => JSON.parse(localStorage.getItem("passwords")) || [])

    useEffect(() => {
        localStorage.setItem("passwords", JSON.stringify(passwords))
    }, [passwords])

    function showPassword() {
        console.log(passRef.current.src.includes("visible.svg"))
        if (passRef.current.src.includes("visible.svg")) {
            passRef.current.src = "icons/hidden.svg"
        }
        else {
            passRef.current.src = "icons/visible.svg"
        }
    }

    function addPassword() {
        if (password.website.trim() !== "" && password.pass.trim() !== "") {
            const newPassword = {
                ...password,
                alias: password.alias.trim() === "" ? password.website : password.alias, id: uuidv4()
            }
            setPasswords([...passwords, newPassword])
            setPassword({ website: "", alias: "", pass: "" })
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
                        <input className="inp-format md:w-[50%] " value={password.alias} onChange={(e) => setPassword({ ...password, alias: e.target.value })} placeholder="Enter Alias" type="text" name="alias" id="alias" />
                        <div className="relative w-[90%] md:w-[47%]">
                            <input value={password.pass} onChange={(e) => setPassword({ ...password, pass: e.target.value })} className="bg-white w-full rounded-xl border border-green-600 px-3 py-2" placeholder="Password" type="password" name="pass" id="pass" />
                            <span onClick={showPassword} className="absolute right-[3%] top-2"><img ref={passRef} src="icons/hidden.svg" alt="hidden" /></span>
                        </div>
                    </div>
                    <div><button onClick={addPassword} className="border rounded-xl p-2 px-3 border-black flex items-center justify-center font-bold text-white text-2xl bg-green-500 gap-2 active:bg-green-600">
                        <lord-icon
                            src="https://cdn.lordicon.com/vjgknpfx.json"
                            trigger="hover"
                            colors="primary:#121331,secondary:#121331"
                            className="group-hover:scale-110 "
                        >
                        </lord-icon>Save</button></div>
                </div>
                <div className="password-display mt-5 p-5">
                    <p className="font-bold text-2xl">Saved Passwords</p>
                    {passwords.length == 0 ? <div>There are no passwords</div>:
                    <table className="table-auto w-full rounded-sm overflow-hidden">
                        <thead className="bg-green-800 text-2xl">
                            <tr>
                                <th className="text-white">Website</th>
                                <th className="text-white">Alias</th>
                                <th className="text-white">Password</th>
                            </tr>
                        </thead>
                        <tbody>
                            {passwords.map((element) => {
                                return <tr key={element.id} className="bg-green-200 text-center text-xl">
                                    <td className="border border-white py-1"><a href={element.website}>{element.website}</a></td>
                                    <td className="border border-white py-1">{element.alias}</td>
                                    <td className="border border-white py-1">{element.pass}</td>
                                </tr>
                                // return <div key={element.id}>Website:{element.website} Alias:{element.alias} Pass:{element.pass}</div>
                            })}
                        </tbody>
                    </table>
                    }
                </div>
            </div>

            <Footer></Footer>
        </>
    )
}

export default App
