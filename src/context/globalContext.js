import axios from "axios";
import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
    let navigate = useNavigate();
    const [input, setInput] = useState({
        name: "",
        description: "",
        category: "",
        release_year: 2007,
        size: 0,
        price: 0,
        rating: 0,
        image_url: "",
        is_android_app: 0,
        is_ios_app: 0,
    });
    const [data, changeData] = useState(null);
    const [fetchStatus, setFetchStatus] = useState(true);
    const [currId, setCurrId] = useState(-1);

    const handleSize = (size) => {
        if (size >= 1000) {
            return `${size / 1000.0} GB`;
        }
        return `${size} MB`;
    }

    const handleRupiah = (angka) => {
        angka = angka.toString();
        if (angka === "0") {
            return "FREE"
        }
        let number_string = angka.replace(/[^,\d]/g, '').toString(),
            split = number_string.split(','),
            sisa = split[0].length % 3,
            rupiah = split[0].substr(0, sisa),
            ribuan = split[0].substr(sisa).match(/\d{3}/gi);

        // tambahkan titik jika yang di input sudah menjadi angka ribuan
        if (ribuan) {
            let separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        }
        rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
        return `Rp ${rupiah}`;
    }

    const handleDesc = (desc) => {
        if (desc.length > 150) {
            return `${desc.slice(0, 150)}...`
        }
        return desc;
    }

    const handleDescTable = (desc) => {
        if (desc.length > 15) {
            return `${desc.slice(0, 15)}...`
        }
        return desc;
    }

    const handleDelete = (event) => {
        const id = parseInt(event.target.value);
        axios.delete(`https://backendexample.sanbercloud.com/api/mobile-apps/${id}`)
            .then((res) => {
                setFetchStatus(true);
            }).catch((err) => {
                console.log(err.message);
            })
    }

    const handleInput = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        if (name === "name") {
            setInput({ ...input, name: value })
        } else if (name === "description") {
            setInput({ ...input, description: value })
        } else if (name === "category") {
            setInput({ ...input, category: value })
        } else if (name === "release_year") {
            setInput({ ...input, release_year: value })
        } else if (name === "size") {
            setInput({ ...input, size: value })
        } else if (name === "price") {
            setInput({ ...input, price: value })
        } else if (name === "rating") {
            setInput({ ...input, rating: value })
        } else if (name === "image_url") {
            setInput({ ...input, image_url: value })
        } else if (name === "is_android_app"){
            setInput({...input, is_android_app: value})
        }else if (name === "is_ios_app"){
            setInput({...input, is_ios_app: value})
        }

    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const { name, description, category, release_year, size, price, rating, image_url, is_android_app, is_ios_app } = input;
        if (currId === -1) {
            axios.post(`https://backendexample.sanbercloud.com/api/mobile-apps`, { name, description, category, release_year, size, price, rating, image_url, is_android_app, is_ios_app })
                .then((res) => {
                    setFetchStatus(true);
                }).catch((err) => {
                    console.log(err.message);
                })
        }else{
            axios.put(`https://backendexample.sanbercloud.com/api/mobile-apps/${currId}`,{name, description, category, release_year, size, price, rating, image_url, is_android_app, is_ios_app})
            .then((res)=>{
                setFetchStatus(true);
            }).catch((err)=>{
                console.log(err.message);
            })
        }
        setCurrId(-1);
        setInput({
            name: "",
            description: "",
            category: "",
            release_year: 2007,
            size: 0,
            price: 0,
            rating: 0,
            image_url: "",
            is_android_app: 0,
            is_ios_app: 0,
        })
        navigate("/");
    }

    const handleEdit = (event) => {
        let id = event.target.value;
        setCurrId(id);
        setFetchStatus(true);
        navigate(`/manage_data/${id}`)
    }

    const handleDevicesType = (android, ios) => {
        if(android === 1 && ios === 0){
            return ", Android"
        }else if(android ===0 && ios === 1){
            return ", Ios";
        }else if(android===1 && ios ===1){
            return ", Android & Ios"
        }else{
            return ""
        }
    }
    return (
        <GlobalContext.Provider value={
            {
                data, changeData, fetchStatus, setFetchStatus, currId, setCurrId, handleSize,
                handleRupiah, handleDesc, input, setInput, handleDescTable, handleDelete, handleEdit,
                 handleSubmit, handleInput, handleDevicesType
            }
        }>
            {props.children}
        </GlobalContext.Provider>
    )
}