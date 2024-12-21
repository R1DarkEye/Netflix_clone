import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ChevronRightIcon } from 'lucide-react'

const AuthScreen = () => {
    const [email, setEmail] = useState('')
    const navigate=useNavigate()
    const handleFormSubmit=(e)=>{
        e.preventDefault()
        navigate('/signup?email='+email)
    }
  return (
    <div className='hero-bg relative'>
    {/*navbar*/}
       <header className='flex justify-between items-center p-4 pb-10 mx-auto max-w-6xl'>
        <img src="/netflix-logo.png" className='w-32 md:w-52' alt="Netflix logo" />
        <Link to={'/login'} className='text-white bg-red-600 py-1 px-2 rounded'>
        Sign In
        </Link>
       </header>
    {/*hero section*/}
    <div className='flex flex-col items-center justify-center text-center text-white py-40 max-w-6xl mx-auto'>
        <h1 className='text-4xl md:text-6xl font-bold mb-4'>Unlimited movies, Tv shows, and more</h1>
        <p className='text-lg mb-4'>Watch anywhere, Cancel anytime.</p>
        <p className='mb-4'>Ready to watch? Enter your email to create or restart your membership.</p>
        <form className='flex flex-col md:flex-row gap-4 w-1/2' onSubmit={handleFormSubmit}>
        <input type="email" placeholder='Email address' className='p-2 rounded flex-1 bg-black/80 border-gray-700' value={email} onChange={(e)=>{setEmail(e.target.value)}} />
        <button className='flex justify-center items-center bg-red-600 rounded text-xl lg:test-2xl px-2 lg:px-6 py-1 md:py-2'>
            Get Started
        </button>
        <chevronRight className='size-8 md:size-10' />
        </form>
    </div>
    {/*seprator*/}
    <div className='h-2 w-full bg-[#232323]' aria-hidden='true'/>

    {/*section 1*/}

    <div className='py-10 bg-black text-white'>
        <div className='flex max-w-6xl items-center justify-center mx-auto md:flex-row flex-col px-4 md:px-2'>
        {/*left*/}
            <div className='flex-1 text-center md:text-left'>
                <h2 className='text-4xl md:text-5xl font-extrabold mb-4'>Enjoy on your TV</h2>
                <p className='text-lg md:text-xl'>Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.</p>
            </div>
        {/*right*/}    
            <div className='flex-1 relative'>
                <img src="/tv.png" alt="Tv image" className='mt-4 z-20 relative' />
                <video className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10' autoPlay={true} playsInline muted loop>
                    <source src="/hero-vid.m4v" type="video/mp4" />
                </video>

            </div>
        </div>
    </div>
    
    {/*seprator*/}
    <div className='h-2 w-full bg-[#232323]' aria-hidden='true'/>

    {/*section 2*/}
    <div className='py-10 bg-black text-white'>
        <div className='flex max-w-6xl items-center justify-center mx-auto md:flex-row flex-col-reverse px-4 md:px-2'>
        {/*left*/}
        <div className='flex-1'>
            <div className='relative'>
                <img src="/stranger-things-lg.png" alt="Stranger Things Img" className='mt-4' />
                <div className='flex items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 bg-black w-3/4 lg:w-1/2 h-24 border-slate-500 rounded-md px-2'>
                    <img src="stranger-things-sm.png" alt="image" className='h-full' />
                    <div className='flex justify-between items-center w-full'>
                        <div className='flex flex-col gap-0'>
                            <span className='text-md lg:text-lg font-bold'>Stranger Things</span>
                            <span className='text-sm text-blue-500'>Downloading...</span>
                        </div>
                        <img src="download-icon.gif" alt=""  className='h-12'/>
                    </div>
                </div>
            </div>
        </div>
        {/*right*/}    
        <div className='flex-1 md:text-left text-center'>
            <h2 className='text-4xl md:text-5xl font-extrabold mb-4 text-balance'>Download your shows to watch offline.</h2>
            <p className='text-lg md:text-xl'>Save your favorites easily and always have something to watch.</p>
        </div>
        </div>
    </div>
    {/*seprator*/}
    <div className='h-2 w-full bg-[#232323]' aria-hidden='true'/>
    {/*section 3*/}
    <div className='py-10 bg-black text-white'>
        <div className='flex max-w-6xl items-center justify-center mx-auto md:flex-row flex-col px-4 md:px-2'>
        {/*left*/}
            <div className='flex-1 text-center md:text-left'>
                <h2 className='text-4xl md:text-5xl font-extrabold mb-4'>Watch everywhere</h2>
                <p className='text-lg md:text-xl'>Stream unlimited movies and TV shows on your mobile, tablet, laptop, and TV.</p>
            </div>
        {/*right*/}    
            <div className='flex-1 relative overflow-hidden'>
                <img src="/device-pile.png" alt="Device image" className='mt-4 z-20 relative' />
                <video className='absolute top-2 left-1/2 -translate-x-1/2  h-4/6 z-10 max-w-[64%]' autoPlay={true} playsInline muted loop>
                    <source src="/video-devices.m4v" type="video/mp4" />
                </video>

            </div>
        </div>
    </div>
    {/*seprator*/}
    <div className='h-2 w-full bg-[#232323]' aria-hidden='true'/>
    {/*section 4*/}
    <div className='py-10 text-white bg-black'>
        <div className='flex max-w-6xl items-center justify-center mx-auto md:flex-row flex-col-reverse px-4 md:px-2'>
            {/*left*/}
            <div className='flex-1 relative'>
                <img src="/kids.png" alt="Enjoy on your TV" className='mt-4' />
            </div>
            {/*right*/}    
            <div className='flex-1 md:text-left text-center'>
                <h2 className='text-4xl md:text-5xl font-extrabold mb-4'>Create profiles for kids</h2>
                <p className='text-lg md:text-xl'>Send kids on adventures with their favrite characters in a space made just for them-free with your membership.</p>
            </div>
        </div>
    </div>
    {/*seprator*/}
    <div className='h-2 w-full bg-[#232323]' aria-hidden='true'/>
    </div>
  )
}

export default AuthScreen