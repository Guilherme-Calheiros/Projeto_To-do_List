import { useState } from "react"
import Delete from "./Delete"
import Image from "./Image"
import Logo from "../assets/Logo.png"
import SignoutButton from "./SignoutButton"
import Button from "./Button"
import ImageDefault from "../assets/Avatar_default.jpg"
import PocketBase from 'pocketbase';
import { useEffect } from "react"

const pb = new PocketBase('https://to-do.pockethost.io').autoCancellation(false);

const Header = ({ username, userId }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [image, setImage] = useState()
    const [profileImage, setProfileImage] = useState()

    useEffect(() => {
        imageurl()
    }, [])
    

    const imageurl = () => {
        pb.collection('users').getOne(userId).then(record => {
            const firstFilename = record.avatar;
            const url = pb.files.getUrl(record, firstFilename, { 'thumb': '100x250' });
            if (!url) {
                setImage(ImageDefault)
            } else {
                setImage(url)
            }
        });
    }

    const handleFileChange = (event) => {
        const files = event.target.files
        setProfileImage(files[0])
    }

    const handleUpload = async () => {
        try {
            const createdRecord = await pb.collection('users').update(userId , {
                avatar: profileImage
            });
            imageurl()
        } catch (error) {
            console.error('Error uploading:', error);
        }
    };

    return (
        <div className="w-full bg-primary-300 h-20 flex items-center py-3 px-10 justify-between">
            <div className="hidden md:block">
                <Image src={Logo} alt="Imagem da logo To-do" w="230px" />
            </div>
            <div className="md:hidden">
                <Image src={Logo} alt="Imagem da logo To-do" w="150px" />
            </div>
            <div className="space-y-1">
                {!isVisible && (
                    <>
                        <button className="text-white text-xl font-bold hidden md:block" onClick={() => setIsVisible(true)}>{username}</button>
                        <button className="flex flex-col gap-1 md:hidden" onClick={() => setIsVisible(true)} >
                            <div className="w-6 h-1 bg-white"></div>
                            <div className="w-6 h-1 bg-white"></div>
                            <div className="w-6 h-1 bg-white"></div>
                        </button>
                    </>
                )}

                {isVisible && (
                    <ul className="bg-white w-full md:w-1/3 pb-10 absolute md:top-1 md:right-1 top-0 right-0 duration-150 flex flex-col space-y-3 justify-end items-center rounded border-black shadow-lg z-10">
                        <button className="px-10 py-8 relative ml-auto" onClick={() => setIsVisible(false)}>
                            <div className="w-6 h-1 rotate-45 absolute bg-black"></div>
                            <div className="w-6 h-1 -rotate-45 absolute bg-black"></div>
                        </button>
                        <div className="w-full relative flex items-center justify-center flex-col">
                            {!editMode && (
                                <>
                                    <img src={image} alt="Foto de perfil" className="w-24 h-24 rounded-full m-auto" />
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1380f0] hover:opacity-40 p-9 rounded-full opacity-0 transition-opacity" onClick={() => setEditMode(true)}>
                                        <svg height="24px" version="1.1" viewBox="0 0 18 18" width="24px" xmlns="http://www.w3.org/2000/svg" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" xmlns:xlink="http://www.w3.org/1999/xlink"><title /><desc /><defs /><g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1"><g fill="#000000" id="Core" transform="translate(-213.000000, -129.000000)"><g id="create" transform="translate(213.000000, 129.000000)"><path d="M0,14.2 L0,18 L3.8,18 L14.8,6.9 L11,3.1 L0,14.2 L0,14.2 Z M17.7,4 C18.1,3.6 18.1,3 17.7,2.6 L15.4,0.3 C15,-0.1 14.4,-0.1 14,0.3 L12.2,2.1 L16,5.9 L17.7,4 L17.7,4 Z" id="Shape" /></g></g></g></svg>
                                    </div>
                                </>
                            )}
                            {editMode && (
                                <div className="flex flex-col items-center justify-center border-slate-600 border p-2 rounded gap-5">
                                    <button className="ml-auto px-10 py-4" onClick={() => setEditMode(false)}>
                                        <div className="w-6 h-1 rotate-45 absolute bg-black"></div>
                                        <div className="w-6 h-1 -rotate-45 absolute bg-black"></div>
                                    </button>
                                    <input type="file" name="fileinput" id="fileinput" onChange={handleFileChange} />
                                    <Button text="Salvar" h="42px" onClick={() => {handleUpload(); setEditMode(false); imageurl()}} />
                                </div>
                            )}
                        </div>
                        <li className="text-black text-lg font-bold">{username}</li>
                        <SignoutButton />
                        <Delete />
                    </ul>
                )}
            </div>

        </div>
    )
}

export default Header