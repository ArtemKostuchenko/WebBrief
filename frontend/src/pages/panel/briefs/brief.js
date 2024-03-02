import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getBrief } from "../../../utils/functions";
import { useAuth } from "../../../hooks/auth";
import { AppContext } from "../../../contexts/app";


const Brief = () => {
    const { id } = useParams();
    const [brief, setBrief] = useState(null);
    const { isAuth } = useAuth();
    const { loading, setOpenBackDrop } = useContext(AppContext);
    const navigate = useNavigate();
    const [loadData, setLoadData] = useState(true);

    useEffect(() => {
        if (loading && !isAuth) {
            navigate('/');
        }
    }, [loading, isAuth, navigate]);

    const getData = useCallback(async id => {
        setOpenBackDrop(true);
        const data = await getBrief(id);
        if (data) {
            setBrief(data);
        }
        setOpenBackDrop(false);
        setLoadData(false);
    }, []);

    useEffect(() => {
        getData(id);
    }, [id, getData]);

    return (
        <>
            {!loadData && brief &&
                <>
                    <div className="container mt-5">
                        <div className="row justify-content-center">
                            <div className="col-md-12 text-light pb-5">
                                <h1 className="p-5">Бриф на розробку веб-сайту</h1>
                                <div className="border border-2 rounded p-5 mb-5">
                                    <h4 className="h4 mb-3">Контакні дані</h4>
                                    <div className="mb-3">
                                        <label htmlFor="lastName" className="form-label"><span
                                            className="text-danger pe-1">*</span>Прізвище</label>
                                        <p className="text-warning">{brief.lastName}</p>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="firstName" className="form-label"><span
                                            className="text-danger pe-1">*</span>Ім'я</label>
                                        <p className="text-warning">{brief.firstName}</p>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="cellphone" className="form-label"><span className="text-danger pe-1">*</span>Номер телефону</label>
                                        <p className="text-warning">{brief.cellphone}</p>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="supportInfo" className="form-label">Пошта або месенджер (Telegram, Viber і
                                            т.д) для підтримки зв'язку</label>
                                        <p className="text-warning">{brief.supportInfo}</p>
                                    </div>
                                </div>
                                <div className="border border-2 rounded p-5 mb-5">
                                    <h4 className="h4 mb-3">2. Короткий опис проєкту</h4>
                                    <div className="mb-3">
                                        <label htmlFor="projectDescription" className="form-label"><span
                                            className="text-danger pe-1">*</span>Назва проекту</label>
                                        <p className="text-warning">{brief.projectName}</p>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="projectDescription" className="form-label"><span
                                            className="text-danger pe-1">*</span>Опишіть ваш проєкт та його цілі</label>
                                        <p className="text-warning">{brief.projectDescription}</p>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="problems" className="form-label"><span className="text-danger pe-1">*</span>Які проблеми
                                            ви хочете вирішити за допомогою веб-сайту? </label>
                                        <p className="text-warning">{brief.problems}</p>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="expectation" className="form-label"><span className="text-danger pe-1">*</span>Які ваші
                                            очікування від веб-сайту?</label>
                                        <p className="text-warning">{brief.expectation}</p>
                                    </div>
                                </div>
                                <div className="border border-2 rounded p-5 mb-5">
                                    <h4 className="h4 mb-3">3. Цільова аудиторія</h4>
                                    <div className="mb-3">
                                        <label htmlFor="audience" className="form-label">Опишіть свою цільову аудиторію</label>
                                        <p className="text-warning">{brief.audience}</p>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="audienceInterests" className="form-label">Які їхні інтереси та потреби повинні бути
                                            до веб-сайту?</label>
                                        <p className="text-warning">{brief.audienceInterests}</p>
                                    </div>
                                </div>
                                <div className="border border-2 rounded p-5 mb-5">
                                    <h4 className="h4 mb-3">4. Ключові повідомлення</h4>
                                    <div className="mb-3">
                                        <label htmlFor="audience" className="form-label">Які ключові повідомлення ви хочете донести до
                                            цільової аудиторії?</label>
                                        <p className="text-warning">{brief.keyMessages}</p>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="callToAction" className="form-label">Який основний заклик до дії (CTA) ви хочете
                                            використовувати?</label>
                                        <p className="text-warning">{brief.callToAction}</p>
                                    </div>
                                </div>
                                <div className="border border-2 rounded p-5 mb-5">
                                    <h4 className="h4 mb-3">5. Конкуренти</h4>
                                    <div className="mb-3">
                                        <label htmlFor="competitors" className="form-label">Перерахуйте своїх основних конкурентів, яких ви
                                            знаєте</label>
                                        <p className="text-warning">{brief.competitors}</p>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="likeWebSites" className="form-label">Що вам подобається в їхніх веб-сайтах?</label>
                                        <p className="text-warning">{brief.likeWebSites}</p>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="dislikeWebSites" className="form-label">Що вам не подобається в їхніх
                                            веб-сайтах?</label>
                                        <p className="text-warning">{brief.dislikeWebSites}</p>
                                    </div>
                                </div>
                                <div className="border border-2 rounded p-5 mb-5">
                                    <h4 className="h4 mb-3">6. Дизайн та функціональність</h4>
                                    <div className="mb-3">
                                        <label htmlFor="designStyle" className="form-label">Який стиль дизайну ви хочете використовувати?
                                        </label>
                                        <p className="text-warning">{brief.designStyle}</p>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="featuresWebSite" className="form-label">Чи є у вас фірмовий логотип чи
                                            стиль?</label>
                                        <p className="text-warning">{brief.brand}</p>
                                        {brief.brandInfo &&
                                            <p className="text-warning">{brief.brandInfo}</p>
                                        }
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="featuresWebSite" className="form-label">Який стиль ви бажаєте для зовнішьного
                                            вигляду вашого майбутнього веб-сайту?</label>
                                        <p className="text-warning">{brief.style}</p>
                                        {brief.stylePage &&
                                            <p className="text-warning">{brief.stylePage}</p>
                                        }
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="likeSites" className="form-label">Наведіть приклади веб-сайтів, які вам
                                            подобаються</label>
                                        <p className="text-warning">{brief.likeSites}</p>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="featuresWebSite" className="form-label">Які функції вам потрібні на
                                            веб-сайті?</label>
                                        <p className="text-warning">{brief.featuresWebSite}</p>
                                    </div>
                                </div>
                                <div className="border border-2 rounded p-5 mb-5">
                                    <h4 className="h4 mb-3">7. Структура веб-сайту</h4>
                                    <div className="mb-3">
                                        <label className="form-label">Яку структуру ви хочете мати на веб-сайті? </label>
                                        {brief.structure.map((struct, index) => {
                                            return <p key={index} className="text-warning">{struct}</p>
                                        })}
                                        {brief.structureInfo &&
                                            <p className="text-warning">{brief.structureInfo}</p>
                                        }
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="chaptersSite" className="form-label">Які основні розділи будуть на вашому
                                            веб-сайті?</label>
                                        <p className="text-warning">{brief.chaptersSite}</p>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="contentPages" className="form-label">Який контент буде на кожній сторінці?</label>
                                        <p className="text-warning">{brief.contentPages}</p>
                                    </div>
                                </div>
                                <div className="border border-2 rounded p-5 mb-5">
                                    <h4 className="h4 mb-3">8. Технічні вимоги</h4>
                                    <div className="mb-3">
                                        <label htmlFor="designStyle" className="form-label">Вам потрібна мобільна версія веб-сайту? </label>
                                        <p className="text-warning">{brief.adaptive}</p>
                                        {brief.adaptiveInfo &&
                                            <p className="text-warning">{brief.adaptiveInfo}</p>
                                        }
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="designStyle" className="form-label">Вам потрібна система онлайн-платежів?</label>
                                        <p className="text-warning">{brief.paymentSystem}</p>
                                        {brief.paymentSystemInfo &&
                                            <p className="text-warning">{brief.paymentSystemInfo}</p>
                                        }
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="featuresWebSite" className="form-label">Які інші технічні вимоги ви маєте?</label>
                                        <p className="text-warning">{brief.featuresWebSite}</p>
                                    </div>
                                </div>
                                <div className="border border-2 rounded p-5 mb-5">
                                    <h4 className="h4 mb-3">9. Терміни та бюджет</h4>
                                    <div className="mb-3">
                                        <label htmlFor="deadline" className="form-label"><span className="text-danger pe-1">*</span>Вкажіть
                                            бажані терміни здачі розробленого веб-сайту</label>
                                        <p className="text-warning">{brief.deadline}</p>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="budget" className="form-label"><span className="text-danger pe-1">*</span>Який ваш
                                            бюджет на розробку веб-сайту? ($)</label>
                                        <p className="text-warning">{brief.budget}</p>
                                    </div>
                                </div>
                                <div className="border border-2 rounded p-5 mb-5">
                                    <h4 className="h4 mb-3">10. Очікувані результати</h4>
                                    <div className="mb-3">
                                        <label htmlFor="expectedResutls" className="form-label">Яких результатів ви очікуєте від
                                            веб-сайту?</label>
                                        <p className="text-warning">{brief.expectedResults}</p>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="successSite" className="form-label">Як ви будете вимірювати успіх веб-сайту?
                                            (cкільки людей відвідують ваш сайт щодня, щомісяця, щороку, скільки часу вони проводять
                                            на сайті і т.д)</label>
                                        <p className="text-warning">{brief.successSite}</p>
                                    </div>
                                </div>
                                <div className="border border-2 rounded p-5 mb-5">
                                    <h4 className="h4 mb-3">11. Додаткові питання</h4>
                                    <div className="mb-3">
                                        <label htmlFor="designStyle" className="form-label"><span className="text-danger pe-1">*</span>Чи є у
                                            вас особа, яка буде відповідальна за управління веб-сайтом, зокрема, його вмістом і
                                            т.д.?</label>
                                        <p className="text-warning">{brief.managerSite}</p>
                                        {brief.managerSiteInfo &&
                                            <p className="text-warning">{brief.managerSiteInfo}</p>
                                        }
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="designStyle" className="form-label"><span className="text-danger pe-1">*</span>Чи
                                            потрібно нам забезпечити наповнення веб-сайту контентом після розробки?</label>
                                        <p className="text-warning">{brief.contentUs}</p>
                                        {brief.contentUsInfo &&
                                            <p className="text-warning">{brief.contentUsInfo}</p>
                                        }
                                    </div>
                                </div>
                                <div className="border border-2 rounded p-5 mb-5">
                                    <h4 className="h4 mb-3">12. Додаткова інформація</h4>
                                    <div className="mb-3">
                                        <label htmlFor="additionalInfo" className="form-label">Надайте будь-яку додаткову інформацію
                                            (побажання), яка може бути корисною для нас</label>
                                        <p className="text-warning">{brief.additionalInfo}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </>
            }
            {!loadData && !brief &&
                <>
                    <div className="text-light d-flex justify-content-center align-items-center w-100 vh-100 ps-5">
                        <h1 className="mt-4">Бриф не знайдено</h1>
                    </div>
                </>
            }
        </>
    )
}

export default Brief;