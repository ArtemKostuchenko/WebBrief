import { useForm } from 'react-hook-form';
import Input from '../components/Input';
import { createBrief } from '../utils/functions';
import { AppContext } from '../contexts/app';
import { useContext } from 'react';

const Index = () => {
    const { register, handleSubmit, reset} = useForm();

    const { showAlertMessage } = useContext(AppContext);

    const onSubmit = async (data) => {
        const result = await createBrief(data);

        if(result){
            reset();
            showAlertMessage('Бриф успішно збережено');
        }else{
            showAlertMessage('Помилка збереження брифу', 'error');
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-12 text-light pb-5">
                    <h1 className="p-5">Бриф на розробку веб-сайту</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="border border-2 rounded p-5 mb-5">
                            <h4 className="h4 mb-3">1. Контакні дані</h4>
                            <div className="mb-3">
                                <label htmlFor="lastName" className="form-label"><span
                                    className="text-danger pe-1">*</span>Прізвище</label>
                                <Input register={register} options={{
                                    required: true,
                                    maxLength: 50,
                                }} name="lastName" placeholder="Ваша відповідь" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="firstName" className="form-label"><span
                                    className="text-danger pe-1">*</span>Ім'я</label>
                                <Input register={register} options={{
                                    required: true,
                                    maxLength: 50,
                                }} name="firstName" placeholder="Ваша відповідь" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="cellphone" className="form-label"><span className="text-danger pe-1">*</span>Номер телефону</label>
                                <Input register={register} options={{
                                    required: true,
                                    pattern: /^(\+?38)?(0\d{2}|380\d{2})\d{7}$/
                                }} name="cellphone" placeholder="Приклад 380688502075" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="supportInfo" className="form-label">Пошта або месенджер (Telegram, Viber і
                                    т.д) для підтримки зв'язку</label>
                                <Input register={register} options={{
                                    required: true,
                                    maxLength: 100,
                                }} name="supportInfo" placeholder="Ваша відповідь" />
                            </div>
                        </div>
                        <div className="border border-2 rounded p-5 mb-5">
                            <h4 className="h4 mb-3">2. Короткий опис проєкту</h4>
                            <div className="mb-3">
                                <label htmlFor="projectDescription" className="form-label"><span
                                    className="text-danger pe-1">*</span>Назва проекту</label>
                                <Input register={register} options={{
                                    required: true,
                                }} name="projectName" placeholder="Ваша відповідь" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="projectDescription" className="form-label"><span
                                    className="text-danger pe-1">*</span>Опишіть ваш проєкт та його цілі</label>
                                <Input register={register} options={{
                                    required: true,
                                }} name="projectDescription" placeholder="Ваша відповідь" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="problems" className="form-label"><span className="text-danger pe-1">*</span>Які проблеми
                                    ви хочете вирішити за допомогою веб-сайту? </label>
                                <Input register={register} options={{
                                    required: true,
                                }} name="problems" placeholder="Ваша відповідь" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="expectation" className="form-label"><span className="text-danger pe-1">*</span>Які ваші
                                    очікування від веб-сайту?</label>
                                <Input register={register} options={{
                                    required: true,
                                }} name="expectation" placeholder="Ваша відповідь" />
                            </div>
                        </div>
                        <div className="border border-2 rounded p-5 mb-5">
                            <h4 className="h4 mb-3">3. Цільова аудиторія</h4>
                            <div className="mb-3">
                                <label htmlFor="audience" className="form-label">Опишіть свою цільову аудиторію</label>
                                <Input register={register} options={{}} name="audience" placeholder="Ваша відповідь" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="audienceInterests" className="form-label">Які їхні інтереси та потреби повинні бути
                                    до веб-сайту?</label>
                                <Input register={register} options={{}} name="audienceInterests" placeholder="Ваша відповідь" />
                            </div>
                        </div>
                        <div className="border border-2 rounded p-5 mb-5">
                            <h4 className="h4 mb-3">4. Ключові повідомлення</h4>
                            <div className="mb-3">
                                <label htmlFor="audience" className="form-label">Які ключові повідомлення ви хочете донести до
                                    цільової аудиторії?</label>
                                <Input register={register} options={{}} name="keyMessages" placeholder="Ваша відповідь" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="callToAction" className="form-label">Який основний заклик до дії (CTA) ви хочете
                                    використовувати?</label>
                                <Input register={register} options={{}} name="callToAction" placeholder="Ваша відповідь" />
                            </div>
                        </div>
                        <div className="border border-2 rounded p-5 mb-5">
                            <h4 className="h4 mb-3">5. Конкуренти</h4>
                            <div className="mb-3">
                                <label htmlFor="competitors" className="form-label">Перерахуйте своїх основних конкурентів, яких ви
                                    знаєте</label>
                                <Input register={register} options={{}} name="competitors" placeholder="Ваша відповідь" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="likeWebSites" className="form-label">Що вам подобається в їхніх веб-сайтах?</label>
                                <Input register={register} options={{}} name="likeWebSites" placeholder="Ваша відповідь" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="dislikeWebSites" className="form-label">Що вам не подобається в їхніх
                                    веб-сайтах?</label>
                                <Input register={register} options={{}} name="dislikeWebSites" placeholder="Ваша відповідь" />
                            </div>
                        </div>
                        <div className="border border-2 rounded p-5 mb-5">
                            <h4 className="h4 mb-3">6. Дизайн та функціональність</h4>
                            <div className="mb-3">
                                <label htmlFor="designStyle" className="form-label">Який стиль дизайну ви хочете використовувати?
                                </label>
                                <Input register={register} options={{}} name="designStyle" placeholder="Ваша відповідь" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="featuresWebSite" className="form-label">Чи є у вас фірмовий логотип чи
                                    стиль?</label>
                                <div className="form-check">
                                    <Input className="form-check-input" type="radio" register={register} options={{}} name="brand" id="brand-1" value="Так" placeholder="Ваша відповідь" />
                                    <label className="form-check-label" htmlFor="brand-1">
                                        Так
                                    </label>
                                </div>
                                <div className="form-check">
                                    <Input className="form-check-input" type="radio" register={register} options={{}} name="brand" id="brand-0" value="Ні" placeholder="Ваша відповідь" />
                                    <label className="form-check-label" htmlFor="brand-0">
                                        Ні
                                    </label>
                                </div>
                                <div className="form-check">
                                    <Input className="form-check-input" type="radio" register={register} options={{}} name="brand" id="brand-other" value="Інше" placeholder="Ваша відповідь" />
                                    <label className="form-check-label" htmlFor="brand-other">
                                        Інше
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <Input register={register} options={{}} name="brandInfo" placeholder="Ваша відповідь" />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="featuresWebSite" className="form-label">Який стиль ви бажаєте для зовнішьного
                                    вигляду вашого майбутнього веб-сайту?</label>
                                <div className="form-check">
                                    <Input className="form-check-input" type="radio" register={register} options={{}} name="style" id="style-1" value="Мінімалістичний" placeholder="Ваша відповідь" />
                                    <label className="form-check-label" htmlFor="style-1">
                                        Мінімалістичний
                                    </label>
                                </div>
                                <div className="form-check">
                                    <Input className="form-check-input" type="radio" register={register} options={{}} name="style" id="style-2" value="Корпоративний" placeholder="Ваша відповідь" />
                                    <label className="form-check-label" htmlFor="style-2">
                                        Корпоративний
                                    </label>
                                </div>
                                <div className="form-check">
                                    <Input className="form-check-input" type="radio" register={register} options={{}} name="style" id="style-3" value="Креативний" placeholder="Ваша відповідь" />
                                    <label className="form-check-label" htmlFor="style-3">
                                        Креативний
                                    </label>
                                </div>
                                <div className="form-check">
                                    <Input className="form-check-input" type="radio" register={register} options={{}} name="style" id="style-other" value="Інше" placeholder="Ваша відповідь" />
                                    <label className="form-check-label" htmlFor="style-other">
                                        Інше
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <Input register={register} options={{}} name="stylePage" placeholder="Ваша відповідь" />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="likeSites" className="form-label">Наведіть приклади веб-сайтів, які вам
                                    подобаються</label>
                                <Input register={register} options={{}} name="likeSites" placeholder="Ваша відповідь" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="featuresWebSite" className="form-label">Які функції вам потрібні на
                                    веб-сайті?</label>
                                <Input register={register} options={{}} name="featuresWebSite" placeholder="Ваша відповідь" />
                            </div>
                        </div>
                        <div className="border border-2 rounded p-5 mb-5">
                            <h4 className="h4 mb-3">7. Структура веб-сайту</h4>
                            <div className="mb-3">
                                <label className="form-label">Яку структуру ви хочете мати на вашому
                                    майбутньому веб-сайті? </label>
                                <div className="form-check">
                                    <Input className="form-check-input" type="checkbox" register={register} options={{}} name="structure[]" id="structure-0" value="Головна" placeholder="Ваша відповідь" />
                                    <label className="form-check-label" htmlFor="structure-0">
                                        Головна
                                    </label>
                                </div>
                                <div className="form-check">
                                    <Input className="form-check-input" type="checkbox" register={register} options={{}} name="structure[]" id="structure-1" value="Про компанію" placeholder="Ваша відповідь" />
                                    <label className="form-check-label" htmlFor="structure-1">
                                        Про компанію
                                    </label>
                                </div>
                                <div className="form-check">
                                    <Input className="form-check-input" type="checkbox" register={register} options={{}} name="structure[]" id="structure-2" value="Продукти" placeholder="Ваша відповідь" />
                                    <label className="form-check-label" htmlFor="structure-2">
                                        Продукти
                                    </label>
                                </div>
                                <div className="form-check">
                                    <Input className="form-check-input" type="checkbox" register={register} options={{}} name="structure[]" id="structure-3" value="Послуги" placeholder="Ваша відповідь" />
                                    <label className="form-check-label" htmlFor="structure-3">
                                        Послуги
                                    </label>
                                </div>
                                <div className="form-check">
                                    <Input className="form-check-input" type="checkbox" register={register} options={{}} name="structure[]" id="structure-4" value="Блог" placeholder="Ваша відповідь" />
                                    <label className="form-check-label" htmlFor="structure-4">
                                        Блог
                                    </label>
                                </div>
                                <div className="form-check">
                                    <Input className="form-check-input" type="checkbox" register={register} options={{}} name="structure[]" id="structure-5" value="Інше" placeholder="Ваша відповідь" />
                                    <label className="form-check-label" htmlFor="structure-5">
                                        Інше
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <Input register={register} options={{}} name="structureInfo" placeholder="Ваша відповідь" />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="chaptersSite" className="form-label">Які основні розділи будуть на вашому
                                    веб-сайті?</label>
                                <Input register={register} options={{}} name="chaptersSite" placeholder="Ваша відповідь" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="contentPages" className="form-label">Який контент буде на кожній сторінці?</label>
                                <Input register={register} options={{}} name="contentPages" placeholder="Ваша відповідь" />
                            </div>
                        </div>
                        <div className="border border-2 rounded p-5 mb-5">
                            <h4 className="h4 mb-3">8. Технічні вимоги</h4>
                            <div className="mb-3">
                                <label htmlFor="designStyle" className="form-label">Вам потрібна мобільна версія веб-сайту? </label>
                                <div className="form-check">
                                    <Input className="form-check-input" type="radio" register={register} options={{}} name="adaptive" id="adaptive-1" value="Так" placeholder="Ваша відповідь" />
                                    <label className="form-check-label" htmlFor="adaptive-1">
                                        Так
                                    </label>
                                </div>
                                <div className="form-check">
                                    <Input className="form-check-input" type="radio" register={register} options={{}} name="adaptive" id="adaptive-0" value="Ні" placeholder="Ваша відповідь" />
                                    <label className="form-check-label" htmlFor="adaptive-0">
                                        Ні
                                    </label>
                                </div>
                                <div className="form-check">
                                    <Input className="form-check-input" type="radio" register={register} options={{}} name="adaptive" id="adaptive-other" value="Інше" placeholder="Ваша відповідь" />
                                    <label className="form-check-label" htmlFor="adaptive-other">
                                        Інше
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <Input register={register} options={{}} name="adaptiveInfo" placeholder="Ваша відповідь" />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="designStyle" className="form-label">Вам потрібна система онлайн-платежів?</label>
                                <div className="form-check">
                                    <Input className="form-check-input" type="radio" register={register} options={{}} name="paymentSystem" id="paymentSystem-1" value="Так" placeholder="Ваша відповідь" />
                                    <label className="form-check-label" htmlFor="paymentSystem-1">
                                        Так
                                    </label>
                                </div>
                                <div className="form-check">
                                    <Input className="form-check-input" type="radio" register={register} options={{}} name="paymentSystem" id="paymentSystem-0" value="Ні" placeholder="Ваша відповідь" />
                                    <label className="form-check-label" htmlFor="paymentSystem-0">
                                        Ні
                                    </label>
                                </div>
                                <div className="form-check">
                                    <Input className="form-check-input" type="radio" register={register} options={{}} name="paymentSystem" id="paymentSystem-other" value="Інше" placeholder="Ваша відповідь" />
                                    <label className="form-check-label" htmlFor="paymentSystem-other">
                                        Інше
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <Input register={register} options={{}} name="paymentSystemInfo" placeholder="Ваша відповідь" />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="featuresWebSite" className="form-label">Які інші технічні вимоги ви маєте?</label>
                                <Input register={register} options={{}} name="featuresWebSite" placeholder="Ваша відповідь" />
                            </div>
                        </div>
                        <div className="border border-2 rounded p-5 mb-5">
                            <h4 className="h4 mb-3">9. Терміни та бюджет</h4>
                            <div className="mb-3">
                                <label htmlFor="deadline" className="form-label"><span className="text-danger pe-1">*</span>Вкажіть
                                    бажані терміни здачі розробленого веб-сайту</label>
                                <Input register={register} options={{ required: true }} name="deadline" placeholder="Ваша відповідь" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="budget" className="form-label"><span className="text-danger pe-1">*</span>Який ваш
                                    бюджет на розробку веб-сайту? ($)</label>
                                <Input register={register} options={{ required: true }} name="budget" placeholder="Ваша відповідь" />
                            </div>
                        </div>
                        <div className="border border-2 rounded p-5 mb-5">
                            <h4 className="h4 mb-3">10. Очікувані результати</h4>
                            <div className="mb-3">
                                <label htmlFor="expectedResutls" className="form-label">Яких результатів ви очікуєте від
                                    веб-сайту?</label>
                                <Input register={register} options={{}} name="expectedResults" placeholder="Ваша відповідь" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="successSite" className="form-label">Як ви будете вимірювати успіх веб-сайту?
                                    (cкільки людей відвідують ваш сайт щодня, щомісяця, щороку, скільки часу вони проводять
                                    на сайті і т.д)</label>
                                <Input register={register} options={{}} name="successSite" placeholder="Ваша відповідь" />
                            </div>
                        </div>
                        <div className="border border-2 rounded p-5 mb-5">
                            <h4 className="h4 mb-3">11. Додаткові питання</h4>
                            <div className="mb-3">
                                <label htmlFor="designStyle" className="form-label"><span className="text-danger pe-1">*</span>Чи є у
                                    вас особа, яка буде відповідальна за управління веб-сайтом, зокрема, його вмістом і
                                    т.д.?</label>
                                <div className="form-check">
                                    <Input className="form-check-input" type="radio" register={register} options={{ required: true }} name="managerSite" id="managerSite-1" value="Так" />
                                    <label className="form-check-label" htmlFor="managerSite-1">
                                        Так
                                    </label>
                                </div>
                                <div className="form-check">
                                    <Input className="form-check-input" type="radio" register={register} options={{ required: true }} name="managerSite" id="managerSite-0" value="Ні" />
                                    <label className="form-check-label" htmlFor="managerSite-0">
                                        Ні
                                    </label>
                                </div>
                                <div className="form-check">
                                    <Input className="form-check-input" type="radio" register={register} options={{ required: true }} name="managerSite" id="managerSite-other" value="Інше" />
                                    <label className="form-check-label" htmlFor="managerSite-other">
                                        Інше
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <Input register={register} options={{}} name="managerSiteInfo" placeholder="Ваша відповідь" />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="designStyle" className="form-label"><span className="text-danger pe-1">*</span>Чи
                                    потрібно нам забезпечити наповнення веб-сайту контентом після розробки?</label>
                                <div className="form-check">
                                    <Input className="form-check-input" type="radio" register={register} options={{ required: true }} name="contentUs" id="contentUs-1" value="Так" />
                                    <label className="form-check-label" htmlFor="contentUs-1">
                                        Так
                                    </label>
                                </div>
                                <div className="form-check">
                                    <Input className="form-check-input" type="radio" register={register} options={{ required: true }} name="contentUs" id="contentUs-0" value="Ні" />
                                    <label className="form-check-label" htmlFor="contentUs-0">
                                        Ні
                                    </label>
                                </div>
                                <div className="form-check">
                                    <Input className="form-check-input" type="radio" register={register} options={{ required: true }} name="contentUs" id="contentUs-other" value="Інше" />
                                    <label className="form-check-label" htmlFor="contentUs-other">
                                        Інше
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <Input register={register} options={{}} name="contentUsInfo" placeholder="Ваша відповідь" />
                                </div>
                            </div>
                        </div>
                        <div className="border border-2 rounded p-5 mb-5">
                            <h4 className="h4 mb-3">12. Додаткова інформація</h4>
                            <div className="mb-3">
                                <label htmlFor="additionalInfo" className="form-label">Надайте будь-яку додаткову інформацію
                                    (побажання), яка може бути корисною для нас</label>
                                <Input register={register} options={{}} name="additionalInfo" placeholder="Ваша відповідь" />
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-outline-info">Надіслати</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Index;