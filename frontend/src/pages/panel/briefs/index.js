import { useCallback, useContext, useEffect, useState } from "react";
import { deleteBrief, formatDate, getBriefs, truncateText } from "../../../utils/functions";
import AlertDialog from "../../../components/AlertDialog";
import { AppContext } from "../../../contexts/app";
import { Link } from "react-router-dom";

const Index = () => {
    const [briefs, setBriefs] = useState([]);
    const [loadData, setLoadData] = useState(true);
    const [open, setOpen] = useState(false);
    const [briefId, setBriefId] = useState(null);
    const { showAlertMessage, setOpenBackDrop } = useContext(AppContext);
    const [sort, setSort] = useState('new');
    const [input, setInput] = useState('');
    const [searchBy, setSearchBy] = useState('projectName');

    const getData = useCallback(async () => {
        setOpenBackDrop(true);
        const data = await getBriefs(sort, input, searchBy);
        if (data) {
            setBriefs(data);
        }
        setOpenBackDrop(false);
        setLoadData(false);
    }, [sort, input, searchBy]);

    const handleDeleteBrief = async () => {
        setOpenBackDrop(true);
        const success = await deleteBrief(briefId);
        if (success) {
            showAlertMessage('Бриф видалено');
            setBriefId(null);
            getData();
        } else {
            showAlertMessage('Помилка видалення брифу', 'error');
        }
    }

    const handleDelete = async (briefId) => {
        setBriefId(briefId);
        setOpen(true);
    }

    const handleSort = async (e) => {
        setSort(e.target.value);
    }

    const handleSearchBy = async (e) => {
        setSearchBy(e.target.value);
    }

    const handleInput = async (e) => {
        setInput(e.target.value)
    }

    useEffect(() => {
        getData();
    }, [sort, input, searchBy, getData]);

    return (
        <>
            <AlertDialog open={open} setOpen={setOpen} callback={handleDeleteBrief} title="Видалення брифу" message="Ви дійсно бажаєте видалити цей бриф?" />
            <div className="text-light d-flex flex-column w-100 p-5 vh-100">
                <div className="text-light d-flex justify-content-between py-4">
                    <div>
                        <select className="form-select" aria-label="Default select example" onChange={handleSort} defaultValue="new">
                            <option value="new">Нові</option>
                            <option value="old">Старі</option>
                            <option value="asc">А-Я</option>
                            <option value="desc">Я-А</option>
                        </select>
                    </div>
                    <div className="text-light d-flex gap-2">
                        <input type="text" className="form-control" placeholder="Пошук по" value={input} onChange={handleInput} />
                        <select className="form-select" aria-label="Default select example" onChange={handleSearchBy} defaultValue="projectName">
                            <option value="projectName">Проекту</option>
                            <option value="lastName">Прізвищу</option>
                            <option value="firstName">Імені</option>
                            <option value="cellphone">Телефону</option>
                        </select>
                    </div>
                </div>
                <div>
                    <div className="d-flex justify-content-between w-100" style={{ height: "50px", backgroundColor: "#363636" }}>
                        <div className=" w-100 d-flex justify-content-center align-items-center">ID</div>
                        <div className="w-100 d-flex justify-content-center align-items-center">Назва проекту</div>
                        <div className="w-100 d-flex justify-content-center  align-items-center">Прізвище</div>
                        <div className="w-100 d-flex justify-content-center align-items-center">Імя</div>
                        <div className="w-100 d-flex justify-content-center align-items-center">Дата створення</div>
                        <div className="w-100 d-flex justify-content-center align-items-center">Завантажити</div>
                        <div className="w-100 d-flex justify-content-center align-items-center">Дії</div>
                    </div>
                    {!loadData && Boolean(briefs.length) &&
                        <>
                            {briefs.map((brief) => {
                                return (
                                    <div key={brief._id} className="text-light d-flex justify-content-between w-100 rounded mt-2" style={{ height: "50px", backgroundColor: "#363636" }}>
                                        <div className=" w-100 d-flex justify-content-center align-items-center">{truncateText(brief._id, 8)}</div>
                                        <Link to={`/panel/briefs/${brief._id}`} className="text-info w-100 d-flex justify-content-center  align-items-center" style={{ textDecoration: "none" }}>
                                            <div >{truncateText(brief.projectName, 20)}</div>
                                        </Link>
                                        <div className="w-100 d-flex justify-content-center  align-items-center">{brief.lastName}</div>
                                        <div className="w-100 d-flex justify-content-center align-items-center">{brief.firstName}</div>
                                        <div className="w-100 d-flex justify-content-center align-items-center">{formatDate(brief.createdAt)}</div>
                                        <div className="w-100 d-flex justify-content-center align-items-center"><a href={`http://localhost:5000/api/v1/brief/${brief._id}/pdf`} className="btn btn-warning" >PDF</a></div>
                                        <div className="w-100 d-flex justify-content-center align-items-center gap-2">
                                            <Link to={`/panel/briefs/${brief._id}/edit`} className="btn btn-primary">
                                                Редагувати
                                            </Link>
                                            <button type="button" className="btn btn-danger" onClick={(e) => { handleDelete(brief._id) }}>Видалити</button>
                                        </div>
                                    </div>
                                )
                            })}
                        </>
                    }
                </div>
                {!loadData && !Boolean(briefs.length) &&
                    <>
                        <div className="text-light d-flex justify-content-center align-items-center w-100 vh-100 ps-5">
                            <h1 className="mt-4">Поки немає жодного брифу!</h1>
                        </div>
                    </>
                }
            </div>
        </>
    );
}

export default Index;