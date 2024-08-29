import { useEffect, useState } from "react";
import bgImg from "../img/Svg.svg";
import axios from "axios";

const URL = 'http://localhost:8080';

const Home = () => {

    let [Todo, SetTudo] = useState({ TodoText: "", WorkStatus: false });
    let [todoList, setTodoList] = useState([]);
    let [showEditShow, setShowEditShow] = useState(false);
    let [currentSelectedId, setCurrentSelectedId] = useState(0);
    const [version, setVersion] = useState(0);


    const fetchData = async () => {
        try {
            const response = await axios.get(`${URL}/v1/task`);
            setTodoList(response?.data || []);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const addData = async () => {
        if (Todo.TodoText.trim() === "") {
            alert("conn't add empty value");
            return null;
        }

        const data = {
            id: todoList.length > 0 ? todoList.length + 1 : 1,
            task: Todo?.TodoText,
            completed: Todo?.WorkStatus
        }
        const res = await axios.post(`${URL}/v1/task`, data);
        SetTudo({ TodoText: '', WorkStatus: false });
        setVersion(version + 1);
        return res;
    }

    const deleteData = async (id) => {
        await axios.delete(`${URL}/v1/task/${id}`);
        setVersion(version + 1);
    }

    const updateData = async (data) => {
        console.log({ data });
        await axios.put(`${URL}/v1/task`, data);
        SetTudo({ TodoText: '', WorkStatus: false });
        setVersion(version + 1);
        setShowEditShow(false);
    }

    useEffect(() => {
        fetchData();
    }, [Todo?.TodoText, Todo?.WorkStatus, version]);

    let ListTodo = () => {
        addData();
    }

    let SetData = (e) => {
        SetTudo({ TodoText: e.target.value, WorkStatus: false })
    }

    // ** Editing Area ** 
    let EditTodo = (id) => {
        setShowEditShow(true);
        setCurrentSelectedId(id);
        const data = todoList.filter(e => e?.id === id)[0];
        SetTudo({ TodoText: data?.task, WorkStatus: data?.completed });
    }

    let SaveEditTodo = () => {
        const data = {
            id: currentSelectedId,
            task: Todo?.TodoText,
            completed: Todo?.WorkStatus
        }

        updateData(data);
    }

    //**  Delet Area **
    let DeletTodo = (id) => {
        deleteData(id);
    }

    // ** CheckBoxArea
    let CheckBoxLogic = (id) => {
        const cTask = todoList.filter(e => e?.id === id)[0];
        const data = {
            id,
            task: cTask?.task,
            completed: !cTask?.completed
        }
        updateData(data);
    }


    return (
        <main className='main'>
            <div className='master-div'>
                <div className="from">
                    <span className="span-1 span"></span>
                    <span className="span-2 span"></span>
                    <span className="span-3 span"></span>
                    <input type="text" placeholder="Make Your Day ..." className="input-txt"
                        value={Todo.TodoText} onChange={SetData}
                    />
                    {showEditShow ? <button className="select" onClick={SaveEditTodo} >Save Edit</button>
                        : <button className="select" onClick={ListTodo}>Select</button>}
                </div>
                <div className="lists">

                    {/* Background Image */}
                    {todoList.length <= 0 ? <div className="InTro-Img" id="bg-imgs">
                        <img src={bgImg} className="" alt="resume svg" width="30%" />
                    </div> : ""}

                    {/* Mapping List */}
                    {todoList.sort((a, b) => (a?.id - b?.id)).map((val, index) => {
                        return <div className="time-list" id="something" key={index}>
                            <h2 style={{ textDecoration: val.completed ? "line-through" : "none" }} > {val.task}</h2>
                            <div className="tools">
                                <i className="fa-sharp fa-solid fa-pen-to-square edit" onClick={() => { EditTodo(val?.id) }}></i>
                                <i className="fa-solid fa-trash delet" onClick={() => { DeletTodo(val?.id) }}></i>
                                <input type="checkbox" checked={val.completed} onChange={() => { CheckBoxLogic(val?.id) }} />
                            </div>
                        </div>
                    })}
                </div >
            </div>
        </main >
    )
}

export default Home;
