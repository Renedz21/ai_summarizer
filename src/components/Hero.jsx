import { logo } from '../assets'

const Hero = () => {
    return (
        <header className='w-full flex justify-center items-center flex-col'>
            <nav className='flex items-center justify-between w-full mb-10 pt-3'>
                <img src={logo} alt='sumz_logo' className='w-28 object-contain' />

                <button type='button' onClick={() => window.open('https://github.com/Renedz21')}
                    className='black_btn'>GitHub</button>
            </nav>
            <h1 className='head_text'>
                Resume Articulos con el poder de <br className='max-md:hidden' />
                <span className='orange_gradient'>OpenAI GPT-4</span>
            </h1>
            <h2 className='desc'>
                Simplifica tu lectura con Sumz, un proyecto open-source que utiliza la API de OpenAI para resumir artículos de cualquier tema.
            </h2>
        </header>
    )
}

export default Hero