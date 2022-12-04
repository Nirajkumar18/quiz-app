import React, { useContext, useState } from 'react'
import Form from '../../components/Form/Form'
import QuizArea from '../QuizArea/QuizArea'
import quizContext from '../../context/quizContext'
import { HashLoader } from 'react-spinners';


const Home = () => {
    const context = useContext(quizContext)
    const { setUrl, url, fetchQuestions, setLoading, loading } = context
    const [formData, setFormData] = useState({ number: '', category: '', difficulty: '', type: '' })

    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault();
        const { number, category, difficulty, type } = formData
        setUrl(`https://opentdb.com/api.php?amount=${number}&category=${category}&difficulty=${difficulty}&type=${type}`, fetchQuestions(url))
    }

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="d-flex justify-content-center align-items-center mt-5">
                <HashLoader
                    color={'#3585c1'}
                    loading={loading}
                    size={100}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>

            {
                url === '' ? <Form handleSubmit={handleSubmit} onChange={onChange} /> : <QuizArea />
            }
        </>
    )
}

export default Home