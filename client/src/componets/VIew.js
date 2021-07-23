import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Modal from 'react-modal';
import axios from 'axios';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { updateStatus, getSingleTodo, deleteTodo } from '../action';
var _ = require('lodash');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        width: "50%",
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};



export default function VIew() {
    const [Data, setData] = useState({})
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [Details, setDetails] = useState(null);

    Modal.setAppElement(document.getElementById('model'));

    function openModal() {
        setIsOpen(true);
    }


    function closeModal() {
        setIsOpen(false);
    }

    const getData = async (Data) => {
        try {
            const { data } = await axios.get('http://localhost:5000/todo', Data);
            setData({ ...data.todos })
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    useEffect(() => {
        getData()
    }, [Data]);

    const maintaineStatus = (e) => {
        if (e.destination) {
            const id = e.draggableId;
            const statusto = e.destination.droppableId;
            const statusfrom = e.source.droppableId;
            if (statusto !== statusfrom) {
                if (updateStatus(id, statusto)) {
                    getData();
                }
            }
        }
    }

    const deleteMain = async (id) => {
        await deleteTodo(id);
        getData();
    }

    const shoWDetails = async (key, id) => {
        const data = await await getSingleTodo(id);
        setDetails(data)
        openModal()
    }

    const openModalOwn = () => {
        return (
            <>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <h5>Title -- {Details && Details.title}</h5><br />
                    <h5>Description -- {Details && Details.description}</h5><br />
                    <h5>Time -- {Details && Details.createdAt}</h5><br />

                </Modal>
            </>
        );
    }

    return (
        <div className="mainview">
            <ToastContainer />
            <DragDropContext onDragEnd={e => maintaineStatus(e)}>
                {
                    _.map(Data, (data, key) => {
                        return (
                            <div key={key} className={"column"}>
                                <h3 className="mainheading">{key}</h3>
                                <Droppable droppableId={key}>
                                    {
                                        (provided) => {
                                            return (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.droppableProps}
                                                    className={"droppable-col"}
                                                >
                                                    {
                                                        data.map((ele, index) => {
                                                            return (
                                                                <Draggable key={ele._id} index={index} draggableId={ele._id}>
                                                                    {
                                                                        (provided) => {
                                                                            return (
                                                                                <div className="mainItem">
                                                                                    <div
                                                                                        className={"item"}
                                                                                        ref={provided.innerRef}
                                                                                        {...provided.draggableProps}
                                                                                        {...provided.dragHandleProps}
                                                                                        onClick={() => shoWDetails(key, ele._id)}
                                                                                    >
                                                                                        <h5>{ele.title}</h5>
                                                                                    </div>
                                                                                    <p onClick={(e) => deleteMain(ele._id)}>Delete</p>
                                                                                </div>
                                                                            )
                                                                        }
                                                                    }
                                                                </Draggable>
                                                            )

                                                        })
                                                    }
                                                    {provided.placeholder}
                                                </div>
                                            )
                                        }
                                    }
                                </Droppable>
                            </div>
                        )
                    })
                }
               
            </DragDropContext>

            {/* <DragDropContext onDragEnd={e => console.log(e)}>
                <div className="deleteBox">
                    Drag hare for delete
                    <Droppable droppableId="delete">
                        {
                            (provided) => {

                            }
                        }
                    </Droppable>
                </div>
            </DragDropContext> */}

            <div model="model" id="model">
                {openModalOwn()}
            </div>
        </div>
    )
}
