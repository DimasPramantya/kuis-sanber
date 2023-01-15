import axios from "axios"
import React, { useContext, useEffect } from "react"
import { GlobalContext } from "../context/globalContext"

function Home() {
    const { data, changeData, fetchStatus, setFetchStatus, handleSize, handleRupiah, handleDesc, handleDevicesType } = useContext(GlobalContext)
    useEffect(() => {
        if (fetchStatus === true) {
            axios.get('https://backendexample.sanbercloud.com/api/mobile-apps')
                .then((res) => {
                    changeData([...res.data])
                })
                .catch((err) => {
                    console.log(err.message);
                })
            setFetchStatus(false);
        }
    }, [fetchStatus, setFetchStatus])
    return (
        <>
            <section className="bg-gray-200 py-5 px-10">
                <div className="container mx-auto mt-10">
                    <h1 className="text-xl font-bold ">Find your data that you need!</h1>
                </div>
                <div className="container mx-auto flex-wrap flex gap-10 items-center justify-start">
                    {/* Batas awal Card section */}
                    {data !== null && data.map((res) => {
                        return (
                            <div className="mt-10 h-72 flex max-w-xl bg-white shadow-lg rounded-lg overflow-hidden">
                                <img src={res.image_url} className="w-1/3 bg-cover bg-center bg-landscape" alt="gambar" />
                                <div className="w-2/3 p-4">
                                    <h1 className="text-gray-900 font-bold text-2xl">
                                        {res.name}
                                    </h1>
                                    <small>{res.release_year}</small>
                                    <p className="mt-2 text-gray-600 text-sm">
                                        {res.description!==null? handleDesc(res.description): res.description}
                                    </p>
                                    <div className=" item-center mt-2 text-gray-500">
                                        <span>{`${res.category} `}</span>
                                        <span>{handleSize(res.size)}</span>
                                        <span>{handleDevicesType(res.is_android_app, res.is_ios_app)}</span>
                                    </div>
                                    <div className="flex item-center justify-between mt-3">
                                        <h1 className="text-gray-700 font-bold text-xl">
                                            {res.price!==null? handleRupiah(res.price): 'FREE'}
                                        </h1>
                                        <button className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded">
                                            {`${res.rating} ratings`}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>
        </>
    );
}

export default Home;
