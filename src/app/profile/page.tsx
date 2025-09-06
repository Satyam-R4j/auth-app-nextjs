"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

export default function profilePage() {
    const router = useRouter();
    const [data, setData] = React.useState("");
    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout successful");
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
            router.push("/login ");
        }
    };

    const getUserDetails = async () => {
        const res = await axios.get("/api/user/me");
        console.log(res.data);
        setData(res.data.data._id);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="">Profile</h1>
            <hr />
            <p>Profile page</p>
            <hr />
            <button
                onClick={logout}
                className="bg-orange-500 hover:bg-orange-400 text-black font-bold py-2 px-4 rounded"
            >
                Logout
            </button>
        </div>
    );
}
