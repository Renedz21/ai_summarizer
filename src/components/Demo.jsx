import { useState, useEffect } from "react"

import { copy, linkIcon, loader, tick } from '../assets'
import { useLazyGetSummaryQuery } from "../redux/article"

const Demo = () => {

    const [article, setArticle] = useState({
        url: '',
        summary: '',
    })

    const [allArticles, setAllArticles] = useState([])

    const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
    const [copied, setCopied] = useState('')

    useEffect(() => {

        const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles')) || [];

        if (articlesFromLocalStorage.length) {
            setAllArticles(articlesFromLocalStorage)
        }

    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()
        const { data } = await getSummary({ articleUrl: article.url })


        if (data?.summary) {
            const newArticle = { ...article, summary: data.summary }
            const updatedAllArticles = [newArticle, ...allArticles]

            console.log(newArticle)

            setArticle(newArticle)
            setAllArticles(updatedAllArticles)

            localStorage.setItem('articles', JSON.stringify(updatedAllArticles))
        }
    }

    const handleCopy = (copyUrl) => {
        setCopied(copyUrl);
        navigator.clipboard.writeText(copyUrl);

        setTimeout(() => {
            setCopied(false)
        }, 2000)
    }

    return (
        <section className="mt-16 w-full max-w-xl">
            {/* Search */}
            <div className="flex flex-col w-full gap-2">
                <form className="relative flex justify-center items-center" onSubmit={handleSubmit}>
                    <img src={linkIcon} alt="link_icon" className="absolute left-0 my-2 ml-3 w-5" />
                    <input type="url" placeholder="Enter an URL"
                        value={article.url}
                        onChange={(e) => setArticle({ ...article, url: e.target.value })}
                        required
                        className="url_input peer"
                    />
                    <button
                        type="submit"
                        className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-corner-down-left"><polyline points="9 10 4 15 9 20"></polyline><path d="M20 4v7a4 4 0 0 1-4 4H4"></path></svg>
                    </button>
                </form>

                {/* Browse Url history */}

                <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
                    {allArticles.map((article, index) => (
                        <div key={`link-${index}`} className="link_card" onClick={() => setArticle(article)}>
                            <div className="copy_btn">
                                <img src={copied === article.url ? tick : copy} alt="copy_icon" className="w-[40%] h-[40%] object-contain" onClick={() => handleCopy(article.url)} />
                            </div>
                            <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">{article.url}</p>
                        </div>
                    ))}
                </div>

            </div>

            {/* Result */}
            <div className="my-10 max-w-full flex justify-center items-center">
                {isFetching ? (
                    <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
                ) : error ? (
                    <p className="font-inter font-bold text-black text-center">
                        Bueno, eso no debio haber pasado...
                        <br />
                        <span className="font-satoshi font-normal text-gray-700">
                            {error?.data?.error}
                        </span>
                    </p>
                ) : (
                    article.summary && (
                        <div className="flex flex-col gap-3">
                            <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                                Resumen {" "}
                                <span className="blue_gradient">del Artículo</span>
                            </h2>
                            <div className="summary_box">
                                <p className="font-inter font-medium text-sm text-gray-700">{article.summary}</p>
                            </div>
                        </div>
                    )
                )}
            </div>
        </section>
    )
}

export default Demo