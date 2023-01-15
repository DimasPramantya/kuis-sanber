import axios from "axios"
import { Button, Checkbox, Label, Table, TextInput } from "flowbite-react";
import React, { useContext, useEffect } from "react"
import { useParams } from "react-router-dom";
import { GlobalContext } from "../context/globalContext"

function ManageData() {
    let i = 1;
    const { data, changeData, fetchStatus, setFetchStatus, handleRupiah, handleDescTable, handleEdit, handleDelete, input, setInput, handleInput, handleSubmit } = useContext(GlobalContext)
    let { id } = useParams();
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
        }if (id !== undefined) {
            axios.get(`https://backendexample.sanbercloud.com/api/mobile-apps/${id}`)
                .then((res) => {
                    let dataPut = res.data;
                    setInput({
                        name: dataPut.name,
                        description: dataPut.description,
                        category: dataPut.category,
                        release_year: dataPut.release_year,
                        size: dataPut.size,
                        price: dataPut.price,
                        rating: dataPut.rating,
                        image_url: dataPut.image_url,
                        is_android_app: dataPut.is_android_app,
                        is_ios_app: dataPut.is_ios_app,
                    })
                })
        }
    }, [fetchStatus, setFetchStatus])
    return (
        <>
            <h1 className="font-bold text-3xl mt-2 mb-7 ml-10">Manage Data</h1>
            <Table className="">
                <Table.Head class="bg-violet-700">
                    <Table.HeadCell className="text-white">
                        NO
                    </Table.HeadCell>
                    <Table.HeadCell className="text-white">
                        NAMA
                    </Table.HeadCell>
                    <Table.HeadCell className="text-white">
                        KATEGORI
                    </Table.HeadCell>
                    <Table.HeadCell className="text-white">
                        DESCRIPTION
                    </Table.HeadCell>
                    <Table.HeadCell className="text-white">
                        PRICE
                    </Table.HeadCell>
                    <Table.HeadCell className="text-white">
                        RATING
                    </Table.HeadCell>
                    <Table.HeadCell className="text-white">
                        RELEASE YEAR
                    </Table.HeadCell>
                    <Table.HeadCell className="text-white">
                        SIZE
                    </Table.HeadCell>
                    <Table.HeadCell className="text-white">
                        IS_ANDROID_APP
                    </Table.HeadCell>
                    <Table.HeadCell className="text-white">
                        IS_IOS_APP
                    </Table.HeadCell>
                    <Table.HeadCell className="text-white">
                        ACTION
                    </Table.HeadCell>
                </Table.Head>
                {data !== null && data.map((res) => {
                    return (
                        <Table.Body className="divide-y">
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {i++}
                                </Table.Cell>
                                <Table.Cell>
                                    {res.name}
                                </Table.Cell>
                                <Table.Cell>
                                    {res.category !== null ? res.category : " "}
                                </Table.Cell>
                                <Table.Cell>
                                    {res.description !== null ? handleDescTable(res.description) : " "}
                                </Table.Cell>
                                <Table.Cell>
                                    {res.price !== null ? handleRupiah(res.price) : "Free"}
                                </Table.Cell>
                                <Table.Cell>
                                    {res.rating}
                                </Table.Cell>
                                <Table.Cell>
                                    {res.release_year}
                                </Table.Cell>
                                <Table.Cell>
                                    {res.size}
                                </Table.Cell>
                                <Table.Cell>
                                    {res.is_android_app}
                                </Table.Cell>
                                <Table.Cell>
                                    {res.is_ios_app}
                                </Table.Cell>
                                <Table.Cell>
                                    <div className="flex flex-wrap gap-2">
                                        <button type="button" className="text-sm rounded-md p-2  font-medium w-fit bg-yellow-400 hover:bg-yellow-500 text-white" onClick={handleEdit} value={res.id} >Edit</button>
                                        <button type="button" className="text-sm rounded-md p-2 font-medium w-fit bg-red-700 hover:bg-red-800 text-white" onClick={handleDelete} value={res.id} >Delete</button>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    )
                })}
            </Table>
            <form onSubmit={handleSubmit} className="flex flex-col gap-8 mt-8 mx-10">
                <div className="border-b-2">Gambar data Game</div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            value="Image Url"
                        />
                    </div>
                    <TextInput
                        type="text"
                        name="image_url"
                        onChange={handleInput}
                        value={input.image_url}
                    />
                </div>
                <div className="border-b-2">Data Game</div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            value="Nama"
                        />
                    </div>
                    <TextInput
                        type="text"
                        name="name"
                        onChange={handleInput}
                        value={input.name}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            value="Category"
                        />
                    </div>
                    <TextInput
                        type="text"
                        name="category"
                        onChange={handleInput}
                        value={input.category}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            value="Description"
                        />
                    </div>
                    <TextInput
                        type="text"
                        name="description"
                        onChange={handleInput}
                        value={input.description}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            value="Price"
                        />
                    </div>
                    <TextInput
                        type="number"
                        name="price"
                        onChange={handleInput}
                        value={input.price}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            value="Rating"
                        />
                    </div>
                    <TextInput
                        type="number"
                        name="rating"
                        onChange={handleInput}
                        value={input.rating}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            value="Release Year"
                        />
                    </div>
                    <TextInput
                        type="number"
                        name="release_year"
                        min={2007}
                        max={2021}
                        defaultValue={2007}
                        onChange={handleInput}
                        value={input.release_year}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            value="Size"
                        />
                    </div>
                    <TextInput
                        type="number"
                        name="size"
                        onChange={handleInput}
                        value={input.size}
                    />
                </div>
                <div className="border-b-2">Jenis Perangkat</div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            value="Android"
                        />
                    </div>
                    <TextInput
                        type="number"
                        name="is_android_app"
                        onChange={handleInput}
                        value={input.is_android_app}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            value="Ios"
                        />
                    </div>
                    <TextInput
                        type="number"
                        name="is_ios_app"
                        onChange={handleInput}
                        value={input.is_ios_app}
                    />
                </div>
                <Button type="submit" className="w-fit">
                    Submit
                </Button>
            </form>
        </>
    );
}

export default ManageData;